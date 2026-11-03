import { Buffer } from 'node:buffer';
import process from 'node:process';

const CONTACT_TO = process.env.CONTACT_TO || '4nhtran@gmail.com';
const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;
const MAX_JSON_BYTES = 4_500_000;

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
};

const json = (statusCode, payload) => ({
  statusCode,
  headers,
  body: JSON.stringify(payload),
});

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const isRealDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const parseBody = (event) => {
  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : String(event.body || '');

  if (Buffer.byteLength(rawBody, 'utf8') > MAX_JSON_BYTES) {
    return { error: 'PAYLOAD_TOO_LARGE' };
  }

  try {
    return { body: rawBody ? JSON.parse(rawBody) : {} };
  } catch {
    return { error: 'INVALID_JSON' };
  }
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      ...json(405, { error: 'METHOD_NOT_ALLOWED' }),
      headers: { ...headers, Allow: 'POST' },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) {
    return json(503, { error: 'EMAIL_SERVICE_NOT_CONFIGURED' });
  }

  try {
    const parsed = parseBody(event);
    if (parsed.error === 'PAYLOAD_TOO_LARGE') {
      return json(413, { error: parsed.error });
    }
    if (parsed.error) {
      return json(400, { error: parsed.error });
    }

    const body = parsed.body && typeof parsed.body === 'object' && !Array.isArray(parsed.body)
      ? parsed.body
      : {};
    const roleLabels = {
      ceo: 'CEO / Founder',
      hr: 'HR / Recruiter',
      collab: 'Collaboration',
    };
    const role = roleLabels[String(body.role || '')];
    const date = String(body.date || '').trim();
    const time = String(body.time || '').trim();
    const company = String(body.company || '').trim();
    const contactName = String(body.contactName || '').trim();
    const phone = String(body.phone || '').trim();
    const message = String(body.message || '').trim();

    if (!role || !isRealDate(date) || !/^(?:0[9]|1[0-8]):(?:00|30)$/.test(time)
      || !company || !contactName || !/^\d{10}$/.test(phone) || !message) {
      return json(400, { error: 'MISSING_OR_INVALID_FIELDS' });
    }
    if (company.length > 180 || contactName.length > 180 || message.length > 4000) {
      return json(400, { error: 'FIELD_TOO_LONG' });
    }

    const appointmentTimestamp = Date.parse(`${date}T${time}:00+07:00`);
    if (!Number.isFinite(appointmentTimestamp) || appointmentTimestamp <= Date.now()) {
      return json(400, { error: 'APPOINTMENT_IN_PAST' });
    }

    const attachments = [];
    if (body.attachment) {
      const name = String(body.attachment.name || 'jd')
        .split(/[\\/]/)
        .pop()
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .slice(0, 140);
      const extension = name.split('.').pop()?.toLowerCase();
      const allowedTypes = {
        pdf: 'application/pdf',
        doc: 'application/msword',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      };
      const encoded = String(body.attachment.contentBase64 || '');
      if (!allowedTypes[extension] || !encoded || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) {
        return json(400, { error: 'INVALID_ATTACHMENT' });
      }

      const content = Buffer.from(encoded, 'base64');
      if (!content.length || content.length > MAX_ATTACHMENT_BYTES || content.toString('base64') !== encoded) {
        return json(400, { error: 'ATTACHMENT_TOO_LARGE' });
      }

      attachments.push({
        filename: name,
        content: encoded,
        content_type: allowedTypes[extension],
      });
    }

    const sentAt = new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date());
    const rows = [
      ['Vai trò', role],
      ['Ngày hẹn (Asia/Ho_Chi_Minh)', `${date} ${time}`],
      ['Công ty', company],
      ['Người liên hệ', contactName],
      ['Số điện thoại', phone],
      ['Nội dung', message],
      ['Nhận lúc', sentAt],
    ];
    const html = `<div style="font-family:Arial,sans-serif;max-width:760px;margin:0 auto;color:#111827"><h2>Appointment request</h2><table style="width:100%;border-collapse:collapse">${rows.map(([label, value]) => `<tr><th style="padding:9px;border:1px solid #ddd;text-align:left;vertical-align:top">${escapeHtml(label)}</th><td style="padding:9px;border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('')}</table></div>`;
    const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_TO],
        subject: `[Portfolio] Appointment request · ${role} · ${contactName}`,
        text,
        html,
        ...(attachments.length ? { attachments } : {}),
      }),
    });

    if (!resendResponse.ok) {
      console.error('Resend appointment email failed:', resendResponse.status, await resendResponse.text());
      return json(502, { error: 'EMAIL_DELIVERY_FAILED' });
    }

    return json(200, { ok: true });
  } catch (error) {
    console.error('Appointment function failed:', error);
    return json(500, { error: 'INTERNAL_ERROR' });
  }
};
