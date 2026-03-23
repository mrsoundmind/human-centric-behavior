# External Integrations

**Analysis Date:** 2026-03-23

## APIs & External Services

**Not Detected:**
- No third-party API integrations identified in codebase
- No SDK imports for external services (Stripe, Auth0, Firebase, etc.)
- No API client libraries detected

## Data Storage

**Databases:**
- Not applicable - Frontend-only application

**File Storage:**
- Local filesystem only (no cloud storage integration detected)

**Caching:**
- TanStack React Query (in-memory client-side caching)
- No external cache service (Redis, etc.)

## Authentication & Identity

**Auth Provider:**
- Not detected - No authentication mechanism in current codebase
- Application appears to be a public, authentication-free interface
- Domain-based routing logic in `src/App.tsx` suggests future multi-tenant capability but no auth implementation yet

## Monitoring & Observability

**Error Tracking:**
- Not detected - No error tracking service integrated

**Logs:**
- Browser console only (no centralized logging)

## CI/CD & Deployment

**Hosting:**
- Vercel platform
- Deployment framework: Vite SPA
- Build command: `npm run build`
- Output directory: `dist/`
- SPA rewrite rule configured in `vercel.json` - all routes redirect to `/index.html`

**CI Pipeline:**
- Vercel CI/CD (automatic builds on push)
- Build configuration in `vercel.json`:
  - Framework: Vite
  - Build command: `npm run build`
  - Output directory: `dist`
  - Route rewriting for single-page app routing

## Environment Configuration

**Required env vars:**
- `VERCEL_OIDC_TOKEN` - Vercel identity token for CI/CD (present in `.env.local`)

**Secrets location:**
- `.env.local` - Development environment variables (not committed to git, listed in `.gitignore`)

**No additional integrations detected:**
- No third-party service credentials
- No API keys
- No database connection strings

## Webhooks & Callbacks

**Incoming:**
- Not applicable - Frontend-only application

**Outgoing:**
- Not detected - No webhook emission to external services

## Browser APIs

**Utilized:**
- Window location APIs - Domain detection for multi-experience routing
  - Used in `src/App.tsx` for subdomain-based experience selection (`window.location.hostname`)
- DOM rendering - React root mounting in index.html

---

## Architecture Pattern

This is a **frontend-only, static SPA** with no backend integrations. The application:
- Runs entirely in the browser
- Uses local state management (React hooks, TanStack React Query for client-side caching)
- Contains no API calls to external services
- Is deployed as static assets to Vercel
- Routes through domain/subdomain detection rather than API calls

**Multi-experience support** is built into routing:
- `client.` subdomain → ClientExperience component
- `/client` path → ClientExperience component
- `/internalteam` path → InternalExperience component
- Root path → Main Index experience

*Integration audit: 2026-03-23*
