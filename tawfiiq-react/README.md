# Tawfiiq Group — website

React 19 · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui (Radix) · Framer Motion · React Router

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Where to edit content

| What | File |
|---|---|
| WhatsApp number, email, social links | `src/data/site.ts` |
| Departments, products, prices, filters | `src/data/departments.ts` |
| News articles (full text for the pop-up) | `src/data/news.ts` |
| Offices, partners, values, stats, network slides | `src/data/company.ts` |
| Brand colours and fonts | `src/index.css` (`@theme` and `:root`) |
| Photos | `public/images/…` (placeholders — replace with real photos) |

Products: `{ cat, size, name?, price? }`. Without `price` the card shows "Price on request".
Social links left empty are hidden everywhere.

## Structure

```
src/
  pages/            one file per page (home, about, partners, news, contact, department, not-found)
  components/
    ui/             shadcn components + tilted-grid-hero (photo band) + spotlight-card (glow)
    layout/         header, footer, page layout, scroll handling
    order/          order list: state, bar, dialog, stepper
    news/           article pop-up (opens from /news#article-<key>)
  data/             all site content
```

## Notes

- Department pages are one template: `/departments/:slug`.
- Pages other than the home page load on demand (code-split).
- Animations respect the visitor's "reduce motion" setting.
- Deploying: this is a single-page app, so the host must send `index.html` for unknown paths
  (e.g. Netlify `_redirects`: `/* /index.html 200`, or Vercel's SPA rewrite).
