# Manik Balloons

Production-style e-commerce starter inspired by:

- [donballon.ru](https://www.donballon.ru/)
- [happydays24.ru](https://happydays24.ru/)

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Node.js runtime (Next API route handlers)
- PostgreSQL + Prisma ORM
- Redux Toolkit for catalog filters/state
- Auth with secure HTTP-only cookie + JWT
- Husky + lint-staged + ESLint + Prettier

## Features

- Beautiful storefront UI (hero, categories, product catalog)
- Product filtering/search with Redux
- Admin login page
- Protected dashboard for product CRUD (create/update/delete)
- Secure middleware guard for admin routes
- Prisma seed with default admin and sample products

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start PostgreSQL:

```bash
docker compose up -d
```

3. Configure environment:

```bash
cp .env.example .env
```

4. Run migrations and seed:

```bash
npm run db:migrate
npm run db:seed
```

5. Start dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sign in and sign up

### Option A — seeded admin (after `npm run db:seed`)

- Open [http://localhost:3000/login](http://localhost:3000/login)
- Email: `admin@manik.local`
- Password: `Admin12345`

Change credentials in `prisma/seed.ts` if you want different defaults.

### Option B — create a new account

- Open [http://localhost:3000/register](http://localhost:3000/register)
- Enter name, email, and password (8+ characters). You are logged in and redirected to the dashboard.

Public registration is controlled by `ALLOW_PUBLIC_SIGNUP` in `.env` (default `true`). Set `ALLOW_PUBLIC_SIGNUP=false` on production if you want to disable open signup and rely only on seeded users or manual DB inserts.

### Why things “did not work” before

1. **PostgreSQL must be running** — `docker compose up -d`, then `npm run db:migrate` and `npm run db:seed`.
2. **`JWT_SECRET` must be set** in `.env` (copy from `.env.example`).
3. **Session cookie** is set on the API response — use the updated login/register flow; the app sends `credentials: "include"` on fetches that need the cookie.

## Deploy on free (or low-cost) hosting

**Checklist (any provider):**

1. Push the project to GitHub (or GitLab / Bitbucket).
2. Create a **PostgreSQL** database (e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com), or your host’s Postgres) and copy **`DATABASE_URL`** (use SSL URL if offered).
3. Generate a strong **`JWT_SECRET`** (for example `openssl rand -hex 32`) and keep it private.
4. Create a **Next.js / Node** deployment (e.g. [Vercel](https://vercel.com), [Render](https://render.com), [Railway](https://railway.app)) and connect the repo.
5. In the host’s **environment variables**, set `DATABASE_URL`, `JWT_SECRET`, and optionally `ALLOW_PUBLIC_SIGNUP` (`false` to disable open registration).
6. **Before or right after the first deploy**, run migrations against the production DB: `npx prisma migrate deploy` (from your machine with `DATABASE_URL` pointing at production, or via CI).
7. Optionally run **`npm run db:seed`** once if you want the demo admin and sample products.
8. Redeploy if needed; open the live URL and test login and the storefront.

You need a **Node host** for Next.js and a **PostgreSQL** database (free tiers are usually enough for demos).

### 1. Vercel (app) + Neon (database) — common free combo

1. Push the repo to GitHub.
2. Create a project on [Vercel](https://vercel.com) and import the repo.
3. Create a free Postgres database on [Neon](https://neon.tech) (or [Supabase](https://supabase.com) Postgres). Copy the connection string (SSL).
4. In Vercel → Project → Settings → Environment variables, add:
   - `DATABASE_URL` — Neon connection string
   - `JWT_SECRET` — long random string (e.g. `openssl rand -hex 32`)
   - `ALLOW_PUBLIC_SIGNUP` — `false` if you do not want public registration
5. Set **Build command**: `npm run build` (default). Set **Install command**: `npm install`.
6. Add a **post-deploy migration** step: run `npx prisma migrate deploy` against production (Vercel does not run this automatically). Options:
   - Run locally with production `DATABASE_URL`: `npx prisma migrate deploy && npm run db:seed` (seed only once), or
   - Use Neon’s SQL editor / a one-off CI job.
7. Redeploy after migrations are applied.

### 2. Render (Web Service + Postgres)

1. Create a **PostgreSQL** instance on [Render](https://render.com) (free tier may sleep).
2. Create a **Web Service** from your Git repo; build command `npm install && npm run build`, start command `npm run start`.
3. Add env vars: `DATABASE_URL`, `JWT_SECRET`, `ALLOW_PUBLIC_SIGNUP`.
4. In the shell or a one-off job, run `npx prisma migrate deploy` (and optional seed).

### 3. Railway

1. New project from GitHub; add the **PostgreSQL** plugin so `DATABASE_URL` is injected.
2. Set `JWT_SECRET` and `ALLOW_PUBLIC_SIGNUP` in variables.
3. Use a **release command** or one-off shell: `npx prisma migrate deploy` before relying on the app.

### Notes for any host

- **Build**: `npm run build`
- **Start**: `npm run start`
- **Migrations**: `npx prisma migrate deploy` (production), not `migrate dev`
- **Cookie / HTTPS**: In production, `secure` cookies require HTTPS (Vercel and Render provide HTTPS).

## Quality Tooling

- `npm run lint` for lint checks
- `npm run format` for Prettier format
- Pre-commit hook automatically runs `lint-staged`
