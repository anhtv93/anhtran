import nodemailer from 'nodemailer';
import process from 'node:process';

const CONTACT_TO = process.env.CONTACT_TO || '4nhtran@gmail.com';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
};

const json = (statusCode, payload) => ({
  statusCode,
  headers,
  body: JSON.stringify(payload),
});

const escapeHtml = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildTransport = () => {
  const service = process.env.SMTP_SERVICE;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) throw new Error('SMTP_AUTH_MISSING');

  if (service) {
    return nodemailer.createTransport({
      service,
      auth: { user, pass },
    });
  }

  if (!host) throw new Error('SMTP_HOST_MISSING');

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'METHOD_NOT_ALLOWED' });
  }

  try {
    const body = JSON.parse(event.body || '{}');

    const name = String(body.name || '').trim();
    const brand = String(body.brand || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !brand || !email || !message) {
      return json(400, { error: 'MISSING_FIELDS' });
    }

    const transporter = buildTransport();
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    const sentAt = new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date());

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

    return json(200, { ok: true });
  } catch (error) {
    const detail = error instanceof Error ? error.message : 'UNKNOWN';
    console.error('[netlify-contact-function]', error);
    return json(500, { error: 'SEND_FAILED', detail });
  }
};
