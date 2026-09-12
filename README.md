# InstaPhysique — Megaformer Studio Landing Page

A high-converting fitness landing page built with Next.js 14 (App Router), Tailwind CSS,
Framer Motion, and Lucide React. Recreates the InstaPhysique Roseville "2-week $89 intro"
funnel: navbar → hero → dark lead-capture form → value grid → feature/stats section →
first-class timeline → testimonials → pricing → FAQ accordion → final conversion banner.

## Tech stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — design tokens for the aqua/navy/ice palette live in `tailwind.config.ts`
- **Framer Motion** — hero entrance, FAQ accordion, form success/error states
- **Lucide React** — icon set
- **next/font** — Fraunces (serif display) + Plus Jakarta Sans (body/UI), self-hosted via Google Fonts

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

The backend needs a MongoDB connection to run — see **Backend setup** below before
submitting the form locally.

## Backend setup

### 1. Create a free MongoDB Atlas cluster

1. Sign up at [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) (free, no card required).
2. Create a new **Project**, then **Build a Database** → choose the free **M0** tier → pick any cloud provider/region close to you → Create.
3. **Database Access** (left sidebar) → **Add New Database User** → username/password auth. Save the password somewhere safe.
4. **Network Access** (left sidebar) → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`). Vercel's serverless functions run from a changing pool of IPs, so this is the standard approach — the database user's password is still required to connect.
5. Back on the cluster overview, click **Connect** → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Paste it into `.env.local` (copy `.env.example` first) as `MONGODB_URI`, replacing `<username>`/`<password>` with your real credentials **and** adding a database name before the `?`, e.g.:
   ```
   MONGODB_URI=mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/instaphysique?retryWrites=true&w=majority
   ```
   (Mongoose creates the `instaphysique` database and `leads` collection automatically on first insert — nothing to create manually.)

### 2. Set the admin key (for `GET /api/leads`)

Generate a random secret and add it to `.env.local`:

```bash
openssl rand -hex 32
```

```
ADMIN_API_KEY=<paste the generated value>
```

### 3. (Optional) Confirmation emails via Resend

1. Sign up free at [resend.com](https://resend.com) → **API Keys** → create one.
2. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   LEAD_EMAIL_FROM=InstaPhysique Roseville <hello@yourdomain.com>
   ```
   Resend requires the `from` domain to be verified for production sending; for local testing you can use their sandbox `onboarding@resend.dev` sender. Leaving both variables blank simply skips sending — the lead still saves successfully.

### 4. Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values above
npm run dev
```

Submit the form at `http://localhost:3000` — you should get a 201 response, and the lead
will appear in Atlas under **Browse Collections** → `instaphysique.leads`.

### 5. Deploying to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo at [vercel.com/new](https://vercel.com/new). Either way, before
the first production request hits `/api/lead`, add the same variables from `.env.local` to
**Project Settings → Environment Variables** in the Vercel dashboard (`MONGODB_URI`,
`ADMIN_API_KEY`, and optionally `RESEND_API_KEY`/`LEAD_EMAIL_FROM`), then redeploy.

### Checking recent leads

```bash
curl https://your-domain.vercel.app/api/leads \
  -H "x-admin-key: <your ADMIN_API_KEY>"
```

Returns the 50 most recent leads as JSON (`?limit=` accepts up to 200). Missing or wrong
key returns 401; if `ADMIN_API_KEY` isn't set at all in the environment, the endpoint
returns 503 rather than silently exposing data.

### API contract

**`POST /api/lead`**

```json
{
  "firstName": "string, required",
  "lastName": "string, required",
  "email": "string, required, valid email",
  "phone": "string, required, valid phone",
  "marketingConsent": "boolean, optional (default false)",
  "agreeTerms": "boolean, required, must be true"
}
```

| Status | Meaning |
|---|---|
| `201` | `{ success: true, message: "Intro pass reserved!", leadId }` |
| `400` | Validation failed — `{ success: false, message, fieldErrors }` |
| `409` | Email already claimed the offer |
| `429` | Rate limit exceeded (5 requests/minute/IP) |
| `500` | Unexpected server/database error |

### Security notes

- **Honeypot**: the form includes a hidden `company` field real users never see. The Zod schema rejects any non-empty value, so bots that auto-fill every input fail validation like a normal bad request — no special "you're a bot" signal is returned.
- **Rate limiting**: a lightweight in-memory limiter (`lib/rate-limit.ts`) caps each IP at 5 submissions/minute per warm serverless instance. This stops naive bots and accidental double-submits but isn't a hard global guarantee across Vercel's instance pool — for that, swap in [`@upstash/ratelimit`](https://github.com/upstash/ratelimit) (free tier, works identically across instances); the call site in `route.ts` is a one-line swap.
- **Duplicate prevention**: checked at the application level (clean 409 message) and enforced at the database level via a unique index on `email`, so concurrent duplicate requests can't both succeed.
- **Admin endpoint fails closed**: if `ADMIN_API_KEY` isn't set in the environment, `/api/leads` returns 503 instead of serving data with no real check.

## Project structure

```
app/
  layout.tsx           Root layout, fonts, metadata
  page.tsx             Assembles all sections in order
  globals.css          Tailwind base + a11y/reduced-motion rules
  api/lead/route.ts    POST: validate → rate-limit → dedupe → save → email
  api/leads/route.ts   GET: admin-key-protected list of recent leads
lib/
  validation.ts        Zod schema for the lead payload + honeypot check
  mongodb.ts           Cached Mongoose connection (serverless-safe)
  rate-limit.ts         In-memory fixed-window rate limiter
  email.ts              Optional Resend confirmation email (no-ops if unconfigured)
models/
  Lead.ts              Mongoose schema/model (unique email index, timestamps)
components/
  Navbar.tsx           Logo, location, phone, CTA pill
  Hero.tsx             Headline, value props, rating, hero image
  LeadForm.tsx         Reusable form: validation, loading spinner, success state
  LeadCapture.tsx       Dark section wrapping LeadForm + package summary
  ValueCards.tsx        "What $89 gets you" 3-card grid
  Features.tsx          "Nobody walks in already good at this" + stats bar
  Timeline.tsx           "Your first class" 4-step process
  Testimonials.tsx      Member review cards + rating badge
  Pricing.tsx            "No pressure" membership pricing + sign-up special
  FAQ.tsx                Accordion FAQ
  Footer.tsx              Final conversion banner + site footer
  PillButton.tsx          Shared CTA button primitive
```

## Design system

| Token | Value | Use |
|---|---|---|
| `aqua` | `#8EE0E5` | Primary accent, CTAs, active states |
| `aqua-dark` | `#6FCBD1` | Hover state, icon accents |
| `aqua-light` | `#D9F5F6` | Soft-tint card backgrounds |
| `navy` | `#22242D` | Dark sections, headline color |
| `ice` | `#F3F8F8` | Light section backgrounds |
| Serif | Fraunces | Headlines (`font-serif`) |
| Sans | Plus Jakarta Sans | Body & UI (`font-sans`, default) |

## Deploying to Vercel

```bash
npm install -g vercel   # if you don't already have the CLI
vercel                  # follow the prompts; it auto-detects Next.js
```

Or connect the GitHub repo directly at [vercel.com/new](https://vercel.com/new) — no
build configuration is needed beyond the defaults Vercel infers for Next.js.

## Notes on images

Hero/feature/pricing images use `next/image` pointed at Unsplash placeholders
(`images.unsplash.com` is already whitelisted in `next.config.mjs`). Swap these for real
studio photography before launch — search terms used: Megaformer/Pilates reformer class,
coach spotting a client, recovery/massage.

## Accessibility & performance

- Visible focus rings on all interactive elements (`globals.css`)
- `prefers-reduced-motion` respected — animations collapse to near-instant
- Form inputs are labeled and announce validation errors inline
- Images use responsive `sizes` and the hero image is marked `priority`
