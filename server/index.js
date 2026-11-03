import http from 'node:http';
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';
import nodemailer from 'nodemailer';
import process from 'node:process';

const loadEnvFile = () => {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const splitIdx = trimmed.indexOf('=');
    if (splitIdx <= 0) continue;
    const key = trimmed.slice(0, splitIdx).trim();
    const value = trimmed.slice(splitIdx + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
};

loadEnvFile();

const PORT = Number(process.env.PORT || 8787);
const CONTACT_TO = process.env.CONTACT_TO || '4nhtran@gmail.com';

const escapeHtml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const readJsonBody = (req, maxBytes = 1_000_000) =>
  new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > maxBytes) {
        reject(new Error('PAYLOAD_TOO_LARGE'));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('INVALID_JSON'));
      }
    });

    req.on('error', reject);
  });

const buildTransport = () => {
  const service = process.env.SMTP_SERVICE;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('SMTP_AUTH_MISSING');
  }

  if (service) {
    return nodemailer.createTransport({
      service,
      auth: { user, pass },
    });
  }

  if (!host) {
    throw new Error('SMTP_HOST_MISSING');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
};

const sendJson = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.end(JSON.stringify(payload));
};

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  const isAppointmentRequest = req.url === '/api/appointment';
  if (!['/api/contact', '/api/appointment'].includes(req.url) || req.method !== 'POST') {
    sendJson(res, 404, { error: 'NOT_FOUND' });
    return;
  }

  try {
    const body = await readJsonBody(req, isAppointmentRequest ? 4_500_000 : 1_000_000);

    if (isAppointmentRequest) {
      const roleLabels = {
        ceo: 'CEO / Founder',
        hr: 'HR / Recruiter',
        collab: 'Collaboration',
      };
      const role = roleLabels[String(body.role || '')];
      const meetingDate = String(body.date || '').trim();
      const meetingTime = String(body.time || '').trim();
      const company = String(body.company || '').trim();
      const contactName = String(body.contactName || '').trim();
      const phone = String(body.phone || '').trim();
      const message = String(body.message || '').trim();
      const appointmentTimestamp = Date.parse(`${meetingDate}T${meetingTime}:00+07:00`);
      const parsedMeetingDate = new Date(`${meetingDate}T00:00:00Z`);
      const isRealDate = /^\d{4}-\d{2}-\d{2}$/.test(meetingDate)
        && Number.isFinite(parsedMeetingDate.getTime())
        && parsedMeetingDate.toISOString().slice(0, 10) === meetingDate;

      if (!role || !isRealDate || !/^(?:0[9]|1[0-8]):(?:00|30)$/.test(meetingTime) || !company || !contactName || !/^\d{10}$/.test(phone) || !message) {
        sendJson(res, 400, { error: 'MISSING_OR_INVALID_FIELDS' });
        return;
      }
      if (!Number.isFinite(appointmentTimestamp) || appointmentTimestamp <= Date.now()) {
        sendJson(res, 400, { error: 'APPOINTMENT_IN_PAST' });
        return;
      }
      if (company.length > 180 || contactName.length > 180 || message.length > 4000) {
        sendJson(res, 400, { error: 'FIELD_TOO_LONG' });
        return;
      }

      const attachments = [];
      if (body.attachment) {
        const name = path.basename(String(body.attachment.name || 'jd'))
          .replace(/[^a-zA-Z0-9._-]/g, '_')
          .slice(0, 140);
        const extension = path.extname(name).toLowerCase();
        const allowedTypes = {
          '.pdf': 'application/pdf',
          '.doc': 'application/msword',
          '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        };
        const encoded = String(body.attachment.contentBase64 || '');
        if (!allowedTypes[extension] || !/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)) {
          sendJson(res, 400, { error: 'INVALID_ATTACHMENT' });
          return;
        }
        const content = Buffer.from(encoded, 'base64');
        if (!content.length || content.length > 3 * 1024 * 1024) {
          sendJson(res, 400, { error: 'ATTACHMENT_TOO_LARGE' });
          return;
        }
        attachments.push({ filename: name, content, contentType: allowedTypes[extension] });
      }

      const transporter = buildTransport();
      const from = process.env.SMTP_FROM || process.env.SMTP_USER;
      const sentAt = new Intl.DateTimeFormat('vi-VN', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Asia/Ho_Chi_Minh',
      }).format(new Date());
      const rows = [
        ['Vai tro', role],
        ['Ngay hen (Asia/Ho_Chi_Minh)', `${meetingDate} ${meetingTime}`],
        ['Cong ty', company],
        ['Nguoi lien he', contactName],
        ['So dien thoai', phone],
        ['Noi dung', message],
        ['Nhan luc', sentAt],
      ];
      const html = `
        <div style="font-family:Arial,sans-serif;max-width:760px;margin:0 auto;color:#111827">
          <h2>Appointment request</h2>
          <table style="width:100%;border-collapse:collapse">
            ${rows.map(([label, value]) => `<tr><th style="padding:9px;border:1px solid #ddd;text-align:left;vertical-align:top">${escapeHtml(label)}</th><td style="padding:9px;border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('')}
          </table>
        </div>`;
      const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

      await transporter.sendMail({
        from,
        to: CONTACT_TO,
        subject: `[Portfolio] Appointment request · ${role} · ${contactName}`,
        text,
        html,
        attachments,
      });
      sendJson(res, 200, { ok: true });
      return;
    }

    const name = String(body.name || '').trim();
    const brand = String(body.brand || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !brand || !email || !message) {
      sendJson(res, 400, { error: 'MISSING_FIELDS' });
      return;
    }

    const transporter = buildTransport();
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    const now = new Date();
    const sentAt = new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(now);

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 760px; margin: 0 auto; color: #111827;">
        <h2 style="margin-bottom: 16px;">Portfolio Contact Submission</h2>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb;">
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: 700; width: 180px;">Thoi gian</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapeHtml(sentAt)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: 700;">Nguoi lien he</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: 700;">Thuong hieu</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapeHtml(brand)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: 700;">Email</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapeHtml(email)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: 700; vertical-align: top;">Noi dung</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${escapeHtml(message)}</td>
          </tr>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from,
      to: CONTACT_TO,
      subject: `[Portfolio] New contact from ${name}`,
      replyTo: email,
      html,
    });

    sendJson(res, 200, { ok: true });
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'UNKNOWN';
    console.error('[contact-api]', error);
    sendJson(res, 500, { error: 'SEND_FAILED', detail });
  }
});

server.listen(PORT, () => {
  console.log(`[contact-api] running at http://localhost:${PORT}`);
});
