# Project hub

The root of my domain: a statically generated index of things I've built. Each
project is deployed on its own (subdomain, other host, wherever) and the hub
only links to it, so nothing here depends on any project being up.

```
npm install
npm run dev          # localhost:3000
npm run build        # static site in out/
```

Next.js 16 (App Router, `output: "export"`), TypeScript, Tailwind CSS 4, Geist.
No database, no API routes, no serverless functions.

## Layout

```
content/projects.ts   the registry: one object per project
content/site.ts       wordmark, intro, footer links, domain (from env)
lib/types.ts          Project, Category, Status, LiveTarget, Section
lib/projects.ts       sorting, URL resolution, build-time registry validation
components/           Header, Footer, ProjectExplorer (filters), ProjectCard,
                      ProjectLinks, StatusBadge, TechTags, Thumbnail
app/                  /, /projects/[id]/, /about/, 404, sitemap, robots, icon
public/projects/<id>/ per-project images
```

## Adding a project

1. Append an object to `content/projects.ts`. Required: `id` (slug), `name`,
   `description`, `category`, `technologies`, `status`, `lastUpdated`.
2. Optionally drop a 16:10 image at `public/projects/<id>/thumbnail.(svg|png|webp)`
   and set `thumbnail`. Without one, a placeholder is generated from the id.
3. Optionally add `overview`, `features`, `sections`, `screenshots` for the
   detail page. Every field is optional; the page renders from whatever exists.

That's it. Cards, filters (built from the values actually present), the detail
page, sitemap and metadata all come from the registry. The build fails on a
duplicate id, a bad slug or a malformed date.

### Live URLs

`liveUrl` takes one of:

| value | resolves to |
|---|---|
| `"https://anything.example"` | as written, any host |
| `{ subdomain: "ocr" }` | `https://ocr.<NEXT_PUBLIC_SITE_DOMAIN>` |
| `{ path: "/swirl" }` | a path on the hub's own domain |

Set `deployed: false` while the URL is planned but nothing answers there yet.
The card shows "Not deployed yet" instead of a dead link. `deploymentNote` adds a
one-line caveat (e.g. "self-hosted, may be offline") on the detail page.

Statuses: `live`, `completed`, `experimental`, `wip`, `archived`.

## Deploying the hub

Set `NEXT_PUBLIC_SITE_DOMAIN` (e.g. `parthiv.dev`) in the host's environment.
Without it, subdomain links stay unresolved and render as not deployed.

The output in `out/` is plain static files, so any of these work at zero cost:

- **Vercel (Hobby):** import the repo, framework auto-detected, add the env var.
  Builds produce static assets only, so no function invocations are used.
  Hobby is for personal, non-commercial use.
- **Cloudflare Pages:** build command `npm run build`, output directory `out`.
- **GitHub Pages:** publish `out/` (custom domain via `public/CNAME`; `public/.nojekyll` is already there so `_next/` is served).

## Domain and subdomains

Recommended: put the domain's DNS on **Cloudflare** (free), whichever host
serves the hub. It is the only option that also covers a Cloudflare Tunnel or
Cloudflare Pages project on a subdomain later, and every record below lives in
one place.

| record | points to | notes |
|---|---|---|
| apex `@` | the hub's host | Vercel: the A / CNAME values shown under Project → Domains; set the Cloudflare record to **DNS only** (grey cloud) so Vercel can issue its certificate. Cloudflare Pages: add the custom domain in Pages and it creates the record. |
| `www` | CNAME to the apex host | redirect to apex in the host's domain settings |
| `<project>` | that project's host | one record per independently deployed project |

Each subdomain is its own deployment with its own stack and its own failure
modes. Adding one never touches this repo beyond its registry entry.

A `.dev` domain is on the HSTS preload list: HTTPS only, everywhere. Every host
above issues certificates automatically, so this only matters for anything you
self-host.

### Swirl

Swirl's own docs record that Vercel + Neon was costed and rejected (`/submit`
shells out to Python, `/api/image` serves local files). It runs on my Mac. Two
ways to get its public dashboard onto `swirl.<domain>` without changing how it
works:

- **Static push (current plan).** After each scheduled job, the Mac renders `/`
  to static HTML and pushes it to its own Cloudflare Pages (or GitHub Pages)
  project, bound to `swirl.<domain>`. Always up, costs nothing. Open work is on
  the Swirl side: `/` is `force-dynamic`, and the availability bands depend on
  today's Melbourne date, so a build must also run just after midnight.
  `/submit` and `/review` stay local.
- **Cloudflare Tunnel.** The path-allowlisted config in `ops/cloudflared/`
  already exists. `cloudflared tunnel route dns <name> swirl.<domain>` creates
  the record. Live data, but only reachable while the Mac is on.

When either is up: in `content/projects.ts` set `deployed: true`, `status:
"live"`, and update `deploymentNote`.

## Later, if needed

The registry is the only data source and is read through `lib/projects.ts`. To
move to Postgres/Supabase with an admin UI: make `getProjects`/`getProject`
async and read from the database, drop `output: "export"` in
`next.config.ts`, and add auth around an `/admin` route. Nothing in the
components changes.
