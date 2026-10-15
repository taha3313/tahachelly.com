# tahachelly.com

A small, responsive personal landing page. Plain HTML and CSS, with no build step or dependencies.

## Preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173.

## Hosting

Hosting target: Cloudflare Pages, using Direct Upload. No build command is required.

1. Open Cloudflare's Workers & Pages dashboard and create a Pages project using Direct Upload.
2. Name the project `tahachelly` and upload `tahachelly-cloudflare.zip`, which contains only the three public assets at its root.
3. Deploy and check the returned `pages.dev` URL.
4. Add `tahachelly.com` as a website in the same Cloudflare account. Review the imported DNS records, preserving any mail records.
5. In Namecheap, open Domain List → Manage → Nameservers → Custom DNS. Enter the two nameservers assigned to this domain by Cloudflare.
6. Once the Cloudflare zone is active, open the Pages project's Custom domains and add `tahachelly.com` and `www.tahachelly.com`.

Namecheap remains the registrar. Cloudflare becomes the authoritative DNS provider, replacing Namecheap PremiumDNS for this domain. Do not change nameservers until the existing DNS records have been reviewed in Cloudflare.

Cloudflare Pages project `tahachelly` is deployed at https://tahachelly.pages.dev.
The apex and `www` custom domains are attached, and the Cloudflare zone contains
their Pages CNAMEs plus the discovered Namecheap Email Forwarding MX and SPF
records. The apex domain is active at https://tahachelly.com. The `www` hostname is still
completing verification. Nameservers: `santino.ns.cloudflare.com` and
`tricia.ns.cloudflare.com`.

References:
- https://developers.cloudflare.com/pages/get-started/direct-upload/
- https://developers.cloudflare.com/pages/configuration/custom-domains/

## Design

The landing page includes a short introduction, selected technical skills, the current
SpeakDuo role, and email, LinkedIn, and GitHub links. Content is based on the supplied CV.
The visual system uses cool neutrals, a blue accent, and distinct light and dark themes.
The header toggle follows the system preference initially and persists an explicit
choice in local storage. The portrait comes from the supplied `taha.png`.
SpeakDuo dates are Jan 2026 — Present, as requested.

`dist/` contains the static public files, including ICO and PNG favicons for Google Search
compatibility. Deployments use Pages Direct Upload assets and a manifest; the previous inline
Pages Worker is no longer needed.

## Search and AI discovery

The page has a canonical URL, name-focused title and heading, Person/ProfilePage/WebSite
JSON-LD, social preview metadata, robots.txt, and a sitemap. Public llms.txt and profile.md
provide a concise readable profile. Google does not use llms.txt as a ranking signal.
The canonical link selects https://tahachelly.com/ as the preferred URL.
Host redirect directives are packaged in _redirects, but www and pages.dev currently
return 200 in live checks; do not claim those host redirects are active.

Search Console ownership verification and a URL indexing request require the owner's
Google account. Add tahachelly.com as a domain property, publish the supplied verification
TXT record in Cloudflare, then submit sitemap.xml and request indexing for the homepage.
