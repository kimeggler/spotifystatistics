# SEO Audit - Statfy (spotifystatistics)

Date: 2026-08-04
Framework: React 19 + Vite (client-rendered SPA, react-router-dom), no SSR/SSG

## Summary

`index.html` has a solid static baseline (title, description, OG/Twitter tags, JSON-LD, canonical, correct `lang`), and `robots.txt`/`sitemap.xml` correctly restrict crawling to the three public marketing routes (`/`, `/about`, `/roadmap`) while blocking authenticated data routes. The biggest problem is a **domain mismatch** between the sitemap and every other canonical reference. The second biggest gap is that **all pages share one static title/description** - there's no per-route head management, so `/about` and `/roadmap` render with the exact same `<title>` and meta description as the homepage, which is a real ranking and CTR cost even for a 3-page indexable surface.

## Findings

### 1. Domain mismatch - sitemap points to the wrong domain (high priority)
- `public/sitemaps.xml` lists `https://statfy.xyz/...` for all three URLs.
- `index.html` canonical, `og:url`, and `twitter:url` all say `https://statfy.app/`.
- `robots.txt` sitemap directive points to `https://statfy.app/sitemaps.xml`.
- Internal links (e.g. `Footer.tsx`, `Landingpage.tsx`) point to `https://deezer.statfy.xyz`, suggesting `.xyz` may be a legacy or secondary domain.
- This is worth flagging, not silently fixing - I don't know which domain is canonical today. If `.app` is the live domain, the sitemap URLs need to be updated to match; if `.xyz` is being reintroduced, the canonical/OG tags in `index.html` and `robots.txt` need to change instead. Whichever it is, having them disagree confuses crawlers about which URL to index.

### 2. No per-route metadata (medium-high priority)
- No `react-helmet-async` (or any head-management library) is installed or used anywhere in `src/`.
- No `document.title` assignment exists anywhere either.
- Result: every route - including the two other indexable pages, `/about` and `/roadmap` - serves the identical `<title>STATFY - Free Spotify Statistics, Analytics & Insights | Track Your Music</title>` and identical meta description from `index.html`. Google can dedupe/rank around this, but duplicate titles/descriptions across a small site's indexable pages waste an opportunity to target different search intent per page (e.g. "about" and "roadmap" pages ranking for the same terms as the homepage instead of their own).
- Fix pattern (not applied - installing a new dependency and wiring it into ~3 routes is a scoped change worth doing deliberately): add `react-helmet-async`, wrap the app in `HelmetProvider`, and give `About.tsx` and `Roadmap.tsx` their own `<title>`/`<meta description>` via `<Helmet>`.

### 3. Duplicate JSON-LD on every route (low priority)
- The `WebApplication` JSON-LD block in `index.html` is static and ships on every route, including protected app routes that are disallowed in `robots.txt` anyway. Harmless but redundant outside `/`; if per-route Helmet is added, consider moving this schema block into `Landingpage.tsx` specifically instead of the global HTML shell.

### 4. Stale/low-value `meta name="keywords"` (low priority)
- `index.html` includes a 20-term `keywords` meta tag. This tag is ignored by Google and Bing and carries no ranking value; not harmful, just dead weight. Safe to remove whenever the file is touched next.

## Looks correct / no action needed
- `<html lang="en">` present.
- `robots.txt` correctly disallows only authenticated/personal-data routes (`/user`, `/overview`, `/artists`, `/tracks`, `/suggestions`, `/analyze`, `/genres`, `/callback`) and leaves marketing pages crawlable.
- Every route file has exactly one `<h1>` - no missing or duplicate top-level headings found in `src/views`.
- All external links (`target="_blank"`) correctly carry `rel="noopener noreferrer"`.
- No bare `<img>` tags without `alt` - the only dynamic images (artist/album art) are rendered as CSS `backgroundImage`, not `<img>`, so there's no missing-alt issue there. (Not an SEO fix, but worth a later a11y pass: background-image data visuals like artist/album art could use `role="img" aria-label="..."` for screen readers.)
- OG/Twitter card tags and a JSON-LD `WebApplication` schema are present and reasonably populated in `index.html`.

## Not covered by this audit
- This is a client-rendered SPA with no SSR/SSG. Even once per-route Helmet tags are added, they only update the DOM after JS executes - modern Googlebot renders JS and will pick this up, but less-capable crawlers and some link-preview/social-share bots read only the raw `index.html` response and will always see the static homepage title/description regardless of route. If organic visibility for `/about` and `/roadmap` specifically matters, the durable fix is prerendering those routes (e.g. `vite-plugin-prerender-spa`) or migrating to a framework with SSR (Next.js, Remix, Astro) rather than relying on client-side Helmet alone.
- Core Web Vitals (LCP/INP/CLS) weren't measured - this environment doesn't have access to run the project's dev/build server against this folder. Recommend a Lighthouse or PageSpeed Insights pass against the deployed site.
- No code changes were made in this pass since the request was to audit, not fix - the domain mismatch in particular needs a decision on which domain is canonical before anything should be edited.
