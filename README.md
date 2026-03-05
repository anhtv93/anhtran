# Portfolio (React + Vite)

## Send Hi email backend

`Send Hi` now calls a local backend API (`POST /api/contact`) and sends an HTML email table to `CONTACT_TO` (default `4nhtran@gmail.com`).

### Setup

1. Copy `.env.example` to `.env` and fill SMTP values.
2. For Gmail, `SMTP_PASS` must be a Google App Password (not your normal Gmail password).
3. Start backend: `npm run dev:server` (or `npm run server`).
4. Start frontend: `npm run dev`.

Or run both at once: `npm run dev:full`.
