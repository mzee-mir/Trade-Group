// Writes the shared header, footer and department catalogues into every HTML page,
// so the site works as plain HTML (no JavaScript needed to see content; better for search engines).
// Run after editing assets/site.js:   node build.js

const fs = require("fs");
const path = require("path");
const S = require("./assets/site.js");

const fill = (html, name, content, file) => {
  const re = new RegExp(`(<!-- @${name} -->)[\\s\\S]*?(<!-- /@${name} -->)`);
  if (!re.test(html)) throw new Error(`${file}: missing <!-- @${name} --> … <!-- /@${name} --> markers`);
  return html.replace(re, (_, open, close) => `${open}\n  ${content}\n  ${close}`);
};

const files = fs.readdirSync(__dirname).filter((f) => f.endsWith(".html"));
for (const file of files) {
  const p = path.join(__dirname, file);
  let html = fs.readFileSync(p, "utf8");
  const body = html.match(/<body([^>]*)>/)[1];
  const page = (body.match(/data-page="([^"]+)"/) || [])[1] || "";
  const dept = (body.match(/data-dept="([^"]+)"/) || [])[1] || "";
  html = fill(html, "header", S.renderHeader(dept ? "departments" : page, dept), file);
  html = fill(html, "footer", S.renderFooter(/data-footer="full"/.test(body)), file);
  if (dept) {
    if (!S.DEPARTMENTS[dept]) throw new Error(`${file}: unknown department "${dept}"`);
    html = fill(html, "dept", S.renderDepartment(dept), file);
    // Page title + search description come from the same data, so they can't drift.
    const d = S.DEPARTMENTS[dept];
    const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(d.name)} — Tawfiiq Group</title>`);
    html = html.replace(/<meta name="description" content="[^"]*">/, () =>
      `<meta name="description" content="${esc(d.name)} from Tawfiiq Group — wholesale and retail across Somalia. Order on WhatsApp.">`);
  }
  fs.writeFileSync(p, html);
  console.log(`built ${file}`);
}
