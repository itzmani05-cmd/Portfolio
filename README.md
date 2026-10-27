# Manikandan M — Portfolio

Personal portfolio of Manikandan M, a full stack developer. Live at **https://www.manidevfolio.site/**

Built with React 19, Vite and Tailwind CSS v4.

## What's on the site

- Hero with a selected-work list
- Experience, projects, skills, testimonials, GitHub activity, education and certificates
- Contact section and a downloadable resume
- Command palette for quick navigation
- Responsive layout for phones, tablets and desktops
- SEO: meta tags, Open Graph and Twitter cards, JSON-LD, `robots.txt`, `sitemap.xml`

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| All text content (about, projects, experience, skills, testimonials, education) | `src/data/portfolioData.json` |
| Page sections | `src/components/` |
| Design tokens and shared styles | `src/index.css` |
| Page title, SEO and social-preview tags | `index.html` |
| Resume (the Resume button downloads this) | `public/resume.pdf` |
| Link-preview image (WhatsApp, LinkedIn, etc.) | `public/og-image.png` |
| `robots.txt` and `sitemap.xml` | `public/` |

## Common updates

- **Add or edit a project:** edit the `projects` list in `src/data/portfolioData.json`. Projects with no live or source link show a "Private / client project" label.
- **Update the resume:** replace `public/resume.pdf` with the new file (same name) and redeploy.
- **Change the site URL:** update the canonical, Open Graph and JSON-LD URLs in `index.html`, plus `public/robots.txt` and `public/sitemap.xml`.

## Notes

- Responsive styles use Tailwind utilities in the JSX (`max-sm:`, `max-lg:`) plus a short global block in `src/index.css`.
- Projects have no screenshots by design, since several are government or client work.
