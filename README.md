# Civil Engineering Surveyors 
 https://geomatics.co.ke/

**A responsive marketing site and component library built with Vite, React,   JavaScript, and Tailwind CSS.**

---

##  Project overview

- Single-page React app scaffolded with **Vite** and **TypeScript**.
- Uses **Tailwind CSS** and a shadcn-style component set under `src/components/ui` for UI primitives.
- Pages: `Index`, `About`, `Industries`, `Products`, `Support`, `Contact` (see `src/pages`).
- Supabase integration for backend features (see `src/integrations/supabase`).

##  Key features

- Responsive, accessible UI components and layout (`Navbar`, `Footer`, `IndustryCard`, etc.).
- Client for Supabase with environment-driven configuration.
- Routing via `react-router-dom` and client-side state/data fetching with React Query.
- Unit/feature testing with **Vitest** and basic ESLint setup.

##  Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn UI primitives (Radix + custom components)
- Supabase (client in `src/integrations/supabase`)
- Testing: Vitest
- Linting: ESLint

##  Local setup

1. Install dependencies:

```bash
npm install
# or pnpm install / yarn
```

2. Create an environment file (recommended `.env.local`) with the Supabase public variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-public-key
```

3. Run the dev server:

```bash
npm run dev
```

4. Build and preview:

```bash
npm run build
npm run preview
```

5. Lint and test:

```bash
npm run lint
npm run test
```

##  Project structure (high level)

- `src/`  application source
  - `components/`  shared UI + layout components
  - `integrations/supabase/`  Supabase client & types
  - `pages/`  route pages
  - `lib/`  utilities
- `public/`  static assets
- `supabase/`  Supabase project config

##  Environment

- Required: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`

## Geoshop marketing consent

Geoshop registration uses the existing Supabase Auth signup and OTP flow.
Marketing consent is optional and unchecked by default; the choice is saved in
the new user's Auth metadata and recorded by the trigger in
`supabase/marketing-consent.sql`. Run that SQL in the Supabase SQL editor before
deploying the app. Existing accounts are backfilled as unsubscribed.

Only the Supabase service role can read or change marketing preferences and
unsubscribe tokens. Promotional mailers must send only to rows with
`marketing_consent = true` and include the recipient's
`unsubscribe-marketing` link. Deploy that function with:

```bash
supabase functions deploy unsubscribe-marketing
```

## Contributing

- Fork, branch, and open a pull request. Run `npm run lint` and `npm run test` before submitting.

## ℹ Notes

- The project is a work-in-progress; update docs and add tests when adding features.
- Add an appropriate `LICENSE` file if you plan to open-source the repo.

---

**Contact**: see `src/pages/Contact.tsx` for the contact flow integration details.
