import http from 'node:http';
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
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');

const readJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
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

  if (req.url !== '/api/contact' || req.method !== 'POST') {
    sendJson(res, 404, { error: 'NOT_FOUND' });
    return;
  }

  try {
    const body = await readJsonBody(req);

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
