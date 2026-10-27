# Manikandan M — Portfolio

Personal portfolio built with React 19, Vite and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| Text content (about, projects, experience, skills, testimonials, education) | `src/data/portfolioData.json` |
| Page sections | `src/components/` |
| Design tokens and shared styles | `src/index.css` |
| Resume (the download button) | `public/resume.pdf` — replace the file to update it |
| Link-preview image | `public/og-image.png` |

## Notes

- Responsive layout uses Tailwind utilities in the JSX (`max-sm:`, `max-lg:`), plus a short global block in `src/index.css`.
- Projects have no screenshots by design (several are government/client work).
