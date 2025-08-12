# Job Board (Next.js + Redux Toolkit)
[![CI](https://github.com/mcaleb808/job-board/actions/workflows/ci.yml/badge.svg)](https://github.com/mcaleb808/job-board/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/mcaleb808/job-board/branch/main/graph/badge.svg)](https://codecov.io/gh/mcaleb808/job-board)
[![Maintainability](https://qlty.sh/gh/mcaleb808/projects/job-board/maintainability.svg)](https://qlty.sh/gh/mcaleb808/projects/job-board)

A job board built with **Next.js App Router** and **Redux Toolkit**. Mock APIs use **Route Handlers** with cookie auth. Tests run on **Vitest + RTL**. API docs at **/docs**.

---

## Demo
- **Live**: https://job-board-eight-navy.vercel.app
- **Swagger Docs**: https://job-board-eight-navy.vercel.app/docs

---

## Quick Start
```bash
# 1) Install deps
npm ci

# 2) Dev server
npm run dev
# → http://localhost:3000
```

---

## Stack
- Next.js (App Router)
- Redux Toolkit (slices + thunks)
- Route Handlers (mock API)
- react-hook-form + zod
- Vitest + React Testing Library
- OpenAPI + Swagger UI (CDN)

---

## Features
- Auth (mock): login/register, cookie session (`jb_id`, `jb_user`)
- Jobs list: search, filter, pagination
- Job details + **Apply** form (validation)
- **/applications** (protected) with loading/error/empty states
- API docs at `/docs` (spec at `/api/openapi`)

---

## Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "vitest",
  "test:run": "vitest run",
  "test:watch": "vitest --watch"
}
```

---

## API (mock)
- `GET /api/jobs` — list (q, type, page, pageSize)
- `GET /api/jobs/:id` — details
- `POST /api/applications` — create (auth)
- `GET /api/applications/me` — mine (auth)
- `POST /api/auth/login | /register | /logout`
- `GET /api/openapi` — OpenAPI JSON

---

## Project Layout
```
app/
  api/...            # route handlers
  docs/route.js      # swagger ui
  jobs/, applications/, layout.js, page.js
features/            # redux slices
lib/openapi.js       # spec
store/index.js
```

---

## CI & Coverage
- GitHub Actions at `.github/workflows/ci.yml`
- Coverage (lcov) uploaded to Codecov (optional) and Qlty Cloud (PR gate)

---

## Architecture Notes
- **App shell:** Next.js App Router. `layout.js` wraps pages with `Providers` (Redux store) and `Header`.
- **State:** Redux Toolkit slices — `auth`, `jobs`, `applications`. Async thunks handle API calls; slice state encodes `status` and `error` for clean UI states.
- **Data flow:** Pages/components dispatch thunks on mount/interaction. Route Handlers read/write cookies with `await cookies()`; UI reacts via Redux.
- **Auth:** Mock login/register/logout set `jb_id` + `jb_user`. `Protected` gates pages; `layout` pings `/api/auth/session` once to rehydrate on load.
- **API layer:** Route Handlers only (no external server). OpenAPI in `lib/openapi.js`; Swagger UI at `/docs` (CDN bundle).
- **Testing:** Vitest + RTL with Next mocks (`next/navigation`, `next/headers`). Route handlers tested by invoking exported `GET/POST` with `Request`.

---

## License

MIT
