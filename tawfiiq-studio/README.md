# Tawfiiq Group — Sanity Studio

The content editor for the website (`../tawfiiq-react`). Edit departments, products, news,
offices, partners and contact details here; the site picks the changes up on the next page load.

## One-time setup

1. **Create a Sanity project** (free) and sign in. This opens your browser:
   ```bash
   npx sanity login
   npx sanity init --bare
   ```
   `--bare` just creates the project and prints its **project ID**. This project uses the dataset `trade-group-dataset`.
   (Or create the project at https://www.sanity.io/manage and copy its ID from there.)

2. **Tell the Studio and the website the project ID:**
   - `tawfiiq-studio/.env` → `SANITY_STUDIO_PROJECT_ID=<id>` (copy `.env.example`)
   - `tawfiiq-react/.env.local` → `VITE_SANITY_PROJECT_ID=<id>` (copy `.env.example`)

3. **Load the current website content** (60 documents, with placeholder images):
   ```bash
   npm run seed     # rebuilds seed/content.ndjson from tawfiiq-react/src/data
   npm run import   # loads it into the "trade-group-dataset" dataset
   ```

4. **Allow the website to read from Sanity** (add each address the site runs on):
   ```bash
   npx sanity cors add http://localhost:5174
   npx sanity cors add https://your-live-domain.com
   ```

5. **Run the Studio:**
   ```bash
   npm run dev      # http://localhost:3333
   npm run deploy   # optional: host the Studio at https://<name>.sanity.studio
   ```

## What's in the Studio

| Section | What it controls |
|---|---|
| Site settings | WhatsApp number, phone, email, social links, key numbers, values, brands strip |
| Departments | Name, web address, heading, intro, photo, product categories, info cards |
| Products | Per department: category, name, size, price, photo (browse **By department**) |
| News | Articles shown on the News page and in the pop-up |
| Offices | Contact page offices; ticking **Sourcing office** + adding a photo puts it in the Home photo band |
| Partners | Partners page; **Show as yellow highlight card** for special relationships |

A product's **category** must match one of its department's product categories exactly,
or it won't show under that filter.

## Notes

- The dataset must be **public** (the default) for the website to read it without a token.
- If Sanity is unreachable, or a section is empty, the website falls back to its built-in content.
- Re-running `npm run import` overwrites the seeded documents (same IDs) with the built-in versions,
  so only do it again on purpose.
