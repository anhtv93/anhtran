# Portfolio (React + Vite)

## Send Hi email backend

`Send Hi` now calls a local backend API (`POST /api/contact`) and sends an HTML email table to `CONTACT_TO` (default `4nhtran@gmail.com`).

### Setup

1. Copy `.env.example` to `.env` and fill SMTP values.
2. For Gmail, `SMTP_PASS` must be a Google App Password (not your normal Gmail password).
3. Start backend: `npm run dev:server` (or `npm run server`).
4. Start frontend: `npm run dev`.

Or run both at once: `npm run dev:full`.

## Appointment form on Netlify and Vercel

The appointment form sends mail through Resend. `api/appointment.js` is the Vercel function; `netlify/functions/appointment.js` is the Netlify version. The `/api/appointment` redirect in `netlify.toml` routes requests to the Netlify function when the site is served by Netlify.

Add these environment variables in the hosting provider serving the domain:

- `RESEND_API_KEY`: API key created in Resend.
- `RESEND_FROM`: sender in the form `Portfolio <appointments@your-verified-domain.com>`. Verify the sender domain in Resend first.
- `CONTACT_TO`: destination email (defaults to `4nhtran@gmail.com`).

Enable the variables for **Production** (and Preview if desired), then redeploy. For `anhtranviet.com`, configure them in Netlify because that domain is currently served by Netlify. The API validates the role, required fields, Vietnam-local appointment time, phone number, and optional PDF/DOC/DOCX attachment (maximum 3 MB) before sending. Keep the Resend API key only in hosting environment variables; do not put it in frontend code or commit it.

For local Vite development, `npm run dev` still proxies `/api/appointment` to the existing SMTP backend on port 8787. Vercel environment variables do not automatically configure that local SMTP backend.
