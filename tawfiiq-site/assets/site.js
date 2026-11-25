/* Tawfiiq Group — site data, shared markup and interactions.

   EDIT CONTENT HERE, then run `node build.js` to write it into the HTML pages.
   - WHATSAPP / EMAIL: where orders and enquiries go.
   - SOCIAL: paste profile URLs; empty ones are hidden everywhere.
   - DEPARTMENTS[...].products: [category, size, name?, price?]
       name  → shown as the product title (defaults to "[PRODUCT NAME]")
       price → e.g. "$12.50 / carton"; leave out to show "Price on request"
   - Department header image: assets/departments/<slug>.svg. To use a photo, save it as
     <slug>.jpg (or .webp) and add  heroExt: "jpg"  to that department below. */

const WHATSAPP = "252907090025";
const EMAIL = "info@tawfiiqgroup.com";
const SOCIAL = { Facebook: "", Instagram: "", TikTok: "" };

const DEPARTMENTS = {
  "foodstuff-dairy": {
    name: "Foodstuff & Dairy",
    title: 'Foodstuff <span class="hl">&amp;</span> Dairy',
    intro: "Milk, rice and spaghetti from trusted brands — supplied to shops, restaurants and families across Somalia.",
    filters: ["Milk", "Spaghetti", "Rice"],
    products: [
      ["Milk", "Milk powder"], ["Milk", "Tin"], ["Milk", "Milk powder"],
      ["Spaghetti", "Pasta"], ["Spaghetti", "Pasta"], ["Spaghetti", "Pasta"],
      ["Rice", "Basmati rice"], ["Rice", "Premium basmati rice"], ["Rice", "Rice"],
    ],
    cards: [
      ["Wholesale prices", "Shops and restaurants get bulk pricing by the carton or sack."],
      ["Delivery", "[DELIVERY AREAS AND TERMS — confirm with Tawfiiq]"],
      ["Need a regular supply?", "Set up a standing weekly or monthly order with our sales team on WhatsApp."],
    ],
  },
  "building-materials": {
    name: "Building Materials",
    title: 'Building <span class="hl">Materials</span>',
    intro: "Paint, timber, ceramic tiles and steel for contractors, builders and home owners — backed by partners like Salalah Steel and Barwaqo Cement.",
    filters: ["Paints", "Wood", "Ceramic", "Steel Bars", "Other"],
    products: [
      ["Paints", "20 L · Smalto enamel for metal"], ["Wood", "Full size"], ["Ceramic", "Ceramic tiles"],
      ["Steel Bars", "Steel for concrete work"], ["Other", "Ask for sizes"],
    ],
    cards: [
      ["Project supply", "Contractors get project pricing and scheduled deliveries to site."],
      ["Delivery", "[DELIVERY AREAS AND TERMS — confirm with Tawfiiq]"],
      ["Not sure what you need?", "Send your bill of quantities on WhatsApp and we will price it for you."],
    ],
  },
  "engine-oil": {
    name: "Engine Oil",
    title: 'Engine Oil <span class="hl">&amp;</span> Lubricants',
    intro: "Speedx and Perfomax engine oils for diesel and petrol vehicles, plus hydraulic oil, grease, tuk-tuk oil and batteries. Wholesale and retail across Somalia.",
    filters: ["Speedx", "Perfomax", "Tuk-tuk Oil", "Battery", "Grease", "Hydraulic"],
    products: [
      ["Speedx", "4 litres"], ["Speedx", "3 litres"], ["Perfomax", "Tin (Daasad)"], ["Perfomax", "Tin (Daasad)"],
      ["Perfomax", "5 L plastic (Caag)"], ["Perfomax", "5 L plastic (Caag)"], ["Perfomax", "1 L plastic (Caag)"], ["Tuk-tuk Oil", "1.5 litres"],
      ["Battery", "Vehicle battery"], ["Grease", "24 × 1"], ["Hydraulic", "20 litres"], ["Hydraulic", "Transmission fluid"],
    ],
    cards: [
      ["Wholesale prices", "Garages, fleets and shops get bulk pricing by the carton or drum (fuusto)."],
      ["Delivery", "[DELIVERY AREAS AND TERMS — confirm with Tawfiiq]"],
      ["Which oil is right?", "Tell us your vehicle on WhatsApp and our team will recommend the right grade."],
    ],
  },
  "furniture-electronics": {
    name: "Furniture & Electronics",
    title: 'Furniture <span class="hl">&amp;</span> Electronics',
    intro: "Turkish furniture, beds and home appliances for homes, offices and hotels.",
    filters: ["Furniture", "Appliances"],
    products: [
      ["Furniture", "Furniture"], ["Furniture", "Furniture"], ["Furniture", "Furniture"], ["Appliances", "Home appliance"],
      ["Appliances", "Ask for models"], ["Appliances", "Home appliance"], ["Appliances", "Home appliance"], ["Appliances", "Home appliance"],
    ],
    cards: [
      ["Hotels and offices", "Furnishing a whole building? Ask for a project quote and bulk pricing."],
      ["Delivery", "[DELIVERY AREAS AND TERMS — confirm with Tawfiiq]"],
      ["See it in person", "Visit our showroom in Bosaso [SHOWROOM ADDRESS] or ask for photos on WhatsApp."],
    ],
  },
  "bakery-sweets": {
    name: "Bakery & Sweets",
    title: 'Bakery <span class="hl">&amp;</span> Sweets',
    intro: "[SHORT DESCRIPTION OF THE BAKERY AND SWEETS RANGE — confirm with Tawfiiq]",
    filters: ["Bakery", "Sweets"],
    products: [
      ["Bakery", "[SIZE]"], ["Bakery", "[SIZE]"], ["Bakery", "[SIZE]"],
      ["Sweets", "[SIZE]"], ["Sweets", "[SIZE]"], ["Sweets", "[SIZE]"],
    ],
    cards: [
      ["Orders for events", "Weddings, Eid and celebrations — order ahead on WhatsApp."],
      ["Delivery", "[DELIVERY AREAS AND TERMS — confirm with Tawfiiq]"],
      ["Fresh daily", "[BAKING SCHEDULE AND PICKUP POINTS]"],
    ],
  },
};

/* News articles shown in the pop-up when a news card is clicked.
   A card opens one with data-article="<key>". Each article also has its own
   link, news.html#article-<key>, which opens straight to the pop-up.
   body: one string per paragraph. link: [url, label] for a related page, or null. */
const NEWS = {
  "performax-hdx8": {
    date: "5 Nov 2026",
    cat: "Engine Oil",
    title: "Saliidda National Performax HDX8",
    photo: "[PHOTO: Performax HDX8]",
    summary: "Performance-tested engine oil for diesel and petrol vehicles.",
    body: ["[FULL ARTICLE TEXT — paste the complete article here. Each paragraph goes in its own quoted line in site.js.]"],
    link: ["engine-oil.html", "See our engine oils"],
  },
  "non-woven-bags": {
    date: "5 Nov 2026",
    cat: "Products",
    title: "Non-Woven Bags ama Sallada Suufka ah",
    photo: "[PHOTO: non-woven bags]",
    summary: "A greener alternative to plastic bags for shops and markets.",
    body: ["[FULL ARTICLE TEXT — paste the complete article here. Each paragraph goes in its own quoted line in site.js.]"],
    link: null,
  },
  "speedx-perfomax": {
    date: "5 Nov 2026",
    cat: "Engine Oil",
    title: "Saliidda SPEEDX iyo PERFOMAX",
    photo: "[PHOTO: Speedx & Perfomax]",
    summary: "Why regular oil changes with Speedx and Perfomax protect your engine.",
    body: ["[FULL ARTICLE TEXT — paste the complete article here. Each paragraph goes in its own quoted line in site.js.]"],
    link: ["engine-oil.html", "See our engine oils"],
  },
};

/* ---------------------------------------------------------------- helpers */

const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const attr = (s) => esc(s);

const ICONS = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"/></svg>',
  arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chevron: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>',
  search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  list: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></svg>',
};

/* ---------------------------------------------------------------- markup */

const NAV = [
  ["Home", "index.html", "home"],
  ["About", "about.html", "about"],
  ["Departments", null, "departments"],
  ["Partners", "partners.html", "partners"],
  ["News", "news.html", "news"],
  ["Contact", "contact.html", "contact"],
];

function renderHeader(active, activeDept) {
  const current = ' class="active" aria-current="page"';
  const links = NAV.map(([label, href, key]) => {
    if (href) return `<a href="${href}"${key === active ? current : ""}>${label}</a>`;
    const items = Object.entries(DEPARTMENTS).map(([slug, d]) =>
      `<li><a href="${slug}.html"${slug === activeDept ? ' aria-current="page"' : ""}>${esc(d.name)}</a></li>`).join("");
    return `<div class="nav-dd">
          <button type="button" class="dd-toggle${key === active ? " active" : ""}" aria-expanded="false" aria-controls="dd-menu">Departments ${ICONS.chevron}</button>
          <ul class="dd-menu" id="dd-menu">
            <li><a href="index.html#departments">All departments</a></li>${items}
          </ul>
        </div>`;
  }).join("\n        ");
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="index.html" aria-label="Tawfiiq Group, home">
        <span class="brand-mark" aria-hidden="true">T</span>
        <span><span class="brand-name">TAWFIIQ GROUP</span><br><span class="brand-sub">General Trading · Since 1992</span></span>
      </a>
      <div class="header-actions">
        <a class="icon-btn wa-btn" href="${waLink("Hello Tawfiiq sales team")}" target="_blank" rel="noopener" aria-label="Chat with sales on WhatsApp">${ICONS.wa}</a>
        <button type="button" class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>
      </div>
      <nav class="nav" id="site-nav" aria-label="Main">
        ${links}
        <a class="btn btn-yellow nav-cta" href="${waLink("Hello Tawfiiq sales team, I'd like a quote.")}" target="_blank" rel="noopener">${ICONS.wa} WhatsApp sales</a>
      </nav>
    </div>
  </header>`;
}

function socialLinks() {
  return Object.entries(SOCIAL).filter(([, url]) => url)
    .map(([name, url]) => `<a href="${attr(url)}" target="_blank" rel="noopener">${name}</a>`);
}

function renderFooter(full) {
  const social = socialLinks();
  const wa = `<a class="wa-float" href="${waLink("Hello Tawfiiq, I'd like to ask about your products.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICONS.wa}</a>`;
  if (full) {
    const depts = Object.entries(DEPARTMENTS).map(([slug, d]) => `<li><a href="${slug}.html">${esc(d.name)}</a></li>`).join("");
    const follow = social.length ? `<div><h2 class="foot-h">Follow us</h2><ul>${social.map((a) => `<li>${a}</li>`).join("")}</ul></div>` : "";
    return `<footer class="site-footer">
    <div class="wrap footer-main">
      <div><div class="brand-name">TAWFIIQ GROUP</div><p>Towfiiq General Trading Company. Trusted supplier across Somalia since 1992.</p></div>
      <div><h2 class="foot-h">Departments</h2><ul>${depts}</ul></div>
      <div><h2 class="foot-h">Contact</h2><ul><li>Gaaca, Bosaso, Somalia</li><li><a href="tel:+252907090025">+252 907 090 025</a></li><li><a href="mailto:${EMAIL}">${EMAIL}</a></li></ul></div>
      ${follow}
    </div>
    <div class="wrap footer-bar"><span>© 2026 Towfiiq General Trading Company. All rights reserved.</span></div>
  </footer>
  ${wa}`;
  }
  return `<footer class="site-footer">
    <div class="wrap footer-slim">
      <span>© 2026 Towfiiq General Trading Company</span>
      <span>Gaaca, Bosaso · <a href="tel:+252907090025">+252 907 090 025</a> · <a href="mailto:${EMAIL}">${EMAIL}</a></span>
      ${social.length ? `<span class="social">${social.join("")}</span>` : ""}
    </div>
  </footer>
  ${wa}`;
}

function renderProduct(slug, d, p, i) {
  const [cat, size, name = "[PRODUCT NAME]", price] = p;
  const id = `${slug}-${i}`;
  const search = `${name} ${size} ${cat}`.toLowerCase();
  const priceHtml = price ? `<div class="price">${esc(price)}</div>` : `<div class="price ask">Price on request</div>`;
  return `<article class="product reveal" data-cat="${attr(cat)}" data-id="${id}" data-search="${attr(search)}"
        data-name="${attr(name)}" data-size="${attr(size)}" data-dept="${attr(d.name)}">
        <div class="ph">[PRODUCT PHOTO]</div>
        <div class="info">
          <span class="cat">${esc(cat)}</span>
          <h3>${esc(name)}</h3>
          <span class="size">${esc(size)}</span>
          ${priceHtml}
          <div class="order-ctl">
            <button type="button" class="btn btn-navy btn-block add-btn">Add to order</button>
            <div class="stepper" hidden>
              <button type="button" class="step dec" aria-label="One less ${attr(cat)} ${attr(size)}">−</button>
              <span class="qty" aria-hidden="true">1</span>
              <button type="button" class="step inc" aria-label="One more ${attr(cat)} ${attr(size)}">+</button>
            </div>
          </div>
        </div>
      </article>`;
}

function renderDepartment(slug) {
  const d = DEPARTMENTS[slug];
  if (!d) return "";
  const filters = ["All", ...d.filters].map((f, i) =>
    `<button type="button" data-filter="${attr(f)}" aria-pressed="${i === 0}"${i === 0 ? ' class="on"' : ""}>${esc(f)}</button>`).join("");
  const products = d.products.map((p, i) => renderProduct(slug, d, p, i)).join("\n      ");
  const tones = ["green", "", "yellow"];
  const cards = d.cards.map(([h, p], i) => `<div class="info-card ${tones[i]} reveal"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join("");
  const others = Object.entries(DEPARTMENTS).filter(([s]) => s !== slug)
    .map(([s, o]) => `<a href="${s}.html">${esc(o.name)} ${ICONS.arrow}</a>`).join("");
  return `<section class="page-hero dept-hero">
    <img class="hero-bg" src="assets/departments/${slug}.${d.heroExt || "svg"}" alt="" decoding="async" fetchpriority="high">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span class="sep" aria-hidden="true">/</span><a href="index.html#departments">Departments</a><span class="sep" aria-hidden="true">/</span><span class="cur" aria-current="page">${esc(d.name)}</span></nav>
      <h1>${d.title}</h1>
      <p>${esc(d.intro)}</p>
    </div>
  </section>
  <section class="section catalog" aria-labelledby="products-h">
    <div class="wrap">
      <h2 id="products-h" class="sr-only">Products</h2>
      <div class="toolbar">
        <div class="search">
          ${ICONS.search}
          <label for="q" class="sr-only">Search ${esc(d.name)}</label>
          <input id="q" type="search" placeholder="Search products or sizes" autocomplete="off">
        </div>
        <div class="filters" role="group" aria-label="Filter by category">${filters}</div>
        <span class="count" role="status">${d.products.length} products</span>
      </div>
      <div class="product-grid">
      ${products}
      </div>
      <div class="empty" hidden>
        <p>No products match your search.</p>
        <a class="btn btn-navy" href="${waLink(`Hello Tawfiiq, I'm looking for a product in ${d.name}:`)}" target="_blank" rel="noopener">Ask us on WhatsApp</a>
      </div>
      <h2 class="sr-only">Buying from ${esc(d.name)}</h2>
      <div class="info-cards">${cards}</div>
      <div class="other-depts">
        <h2 class="eyebrow">Other departments</h2>
        <div class="other-grid">${others}</div>
      </div>
    </div>
  </section>`;
}

/* ---------------------------------------------------------------- browser */

function initSite() {
  const body = document.body;
  const page = body.dataset.page || (body.dataset.dept ? "departments" : "");
  // Fallback for pages that haven't been through build.js
  if (!document.querySelector(".site-header")) body.insertAdjacentHTML("afterbegin", renderHeader(page, body.dataset.dept));
  if (!document.querySelector(".site-footer")) body.insertAdjacentHTML("beforeend", renderFooter(body.dataset.footer === "full"));
  const main = document.getElementById("main");
  if (body.dataset.dept && main && !main.querySelector(".product-grid")) main.innerHTML = renderDepartment(body.dataset.dept);

  setupNav();
  setupLinks();
  setupReveal();
  setupCatalog();
  setupOrder();
  setupForm();
  setupNews();
  setupGlow();
  setupScrollers();
}

/* ---- Horizontal card rows: arrow buttons, disabled at either end */

function setupScrollers() {
  document.querySelectorAll("[data-scroller-for]").forEach((nav) => {
    const row = document.getElementById(nav.dataset.scrollerFor);
    if (!row) return;
    const [prev, next] = nav.querySelectorAll("button");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = () => {
      const card = row.firstElementChild;
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      // move by as many whole cards as fit, at least one
      const per = card ? card.getBoundingClientRect().width + gap : row.clientWidth;
      return Math.max(per, Math.floor(row.clientWidth / per) * per);
    };
    const update = () => {
      const max = row.scrollWidth - row.clientWidth - 2;
      prev.disabled = row.scrollLeft <= 2;
      next.disabled = row.scrollLeft >= max;
      nav.hidden = max <= 0; // everything fits: no arrows needed
    };
    [prev, next].forEach((b) => b.addEventListener("click", () => {
      row.scrollBy({ left: step() * +b.dataset.dir, behavior: reduce ? "auto" : "smooth" });
    }));
    row.addEventListener("scroll", update, { passive: true });
    new ResizeObserver(update).observe(row);
    update();
  });
}

/* ---- Product card spotlight: feed the pointer position to the CSS glow */

function setupGlow() {
  const grid = document.querySelector(".product-grid");
  if (!grid || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  let frame = 0, x = 0, y = 0;
  document.addEventListener("pointermove", (e) => {
    x = e.clientX; y = e.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      grid.style.setProperty("--x", x.toFixed(1));
      grid.style.setProperty("--y", y.toFixed(1));
      grid.style.setProperty("--xp", (x / innerWidth).toFixed(3));
    });
  }, { passive: true });
}

/* ---- News: full article in a pop-up */

function setupNews() {
  const triggers = document.querySelectorAll("[data-article]");
  const onNewsPage = document.body.dataset.page === "news";
  if (!triggers.length && !onNewsPage) return;

  document.body.insertAdjacentHTML("beforeend", `
  <dialog class="article-dialog" aria-labelledby="ad-title">
    <button type="button" class="ad-close" aria-label="Close article">×</button>
    <article class="ad-body"></article>
  </dialog>`);
  const dialog = document.querySelector(".article-dialog");
  const body = dialog.querySelector(".ad-body");
  const HASH = "#article-";

  const open = (key, { push = true } = {}) => {
    const a = NEWS[key];
    if (!a) return false;
    const ask = waLink(`Hello Tawfiiq, I read "${a.title}" and would like to know more.`);
    body.innerHTML = `
      <div class="ph ad-photo">${esc(a.photo)}</div>
      <div class="ad-text">
        <span class="meta">${esc(a.date)} · ${esc(a.cat)}</span>
        <h2 id="ad-title">${esc(a.title)}</h2>
        <p class="ad-lead">${esc(a.summary)}</p>
        ${a.body.map((p) => `<p>${esc(p)}</p>`).join("")}
        <div class="ad-actions">
          ${a.link ? `<a class="btn btn-navy" href="${attr(a.link[0])}">${esc(a.link[1])} ${ICONS.arrow}</a>` : ""}
          <a class="btn btn-ghost" href="${ask}" target="_blank" rel="noopener">${ICONS.wa} Ask about this on WhatsApp</a>
        </div>
      </div>`;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    // Give the article its own address so it can be shared or bookmarked.
    if (push && location.hash !== HASH + key) {
      history[pushed ? "replaceState" : "pushState"]({ article: key }, "", HASH + key);
      pushed = true;
    }
    document.title = `${a.title} — Tawfiiq Group`;
    return true;
  };

  let pushed = false; // did opening add a history entry we should step back out of?
  const baseTitle = document.title;
  const close = () => { if (dialog.open) dialog.close(); };
  dialog.addEventListener("close", () => {
    document.title = baseTitle;
    if (!location.hash.startsWith(HASH)) return;
    if (pushed) { pushed = false; history.back(); }   // so Back doesn't reopen it
    else history.replaceState(null, "", location.pathname + location.search); // opened from a shared link
  });
  dialog.querySelector(".ad-close").addEventListener("click", close);
  dialog.addEventListener("click", (e) => { if (e.target === dialog) close(); });

  triggers.forEach((el) => el.addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let "open in new tab" work
    if (open(el.dataset.article)) e.preventDefault();
  }));

  // Opening a shared link (news.html#article-…) or using Back/Forward.
  const fromHash = () => {
    const key = location.hash.startsWith(HASH) ? location.hash.slice(HASH.length) : "";
    if (key && NEWS[key]) open(key, { push: false });
    else { pushed = false; close(); } // user pressed Back: the entry is already gone
  };
  window.addEventListener("popstate", fromHash);
  if (location.hash.startsWith(HASH)) fromHash();
}

function setupNav() {
  const header = document.querySelector(".site-header");
  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".nav");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open);
  };
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));

  const dd = header.querySelector(".nav-dd");
  const ddBtn = dd.querySelector(".dd-toggle");
  const setDd = (open) => { dd.classList.toggle("open", open); ddBtn.setAttribute("aria-expanded", open); };
  ddBtn.addEventListener("click", () => setDd(!dd.classList.contains("open")));
  document.addEventListener("click", (e) => { if (!dd.contains(e.target)) setDd(false); });
  dd.addEventListener("focusout", (e) => { if (!dd.contains(e.relatedTarget) && window.innerWidth > 900) setDd(false); });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (dd.classList.contains("open")) { setDd(false); ddBtn.focus(); }
    else if (nav.classList.contains("open")) { setMenu(false); toggle.focus(); }
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { setMenu(false); setDd(false); }));
}

function setupLinks() {
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.wa || "Hello Tawfiiq");
    a.target = "_blank"; a.rel = "noopener";
  });
  // Social buttons in page content: link them up, or hide when no URL is set yet
  document.querySelectorAll("[data-social]").forEach((a) => {
    const url = SOCIAL[a.dataset.social];
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; } else a.hidden = true;
  });
  document.querySelectorAll("[data-social-group]").forEach((g) => {
    if (![...g.querySelectorAll("[data-social]")].some((a) => !a.hidden)) g.hidden = true;
  });
}

function setupReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("in"));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.05 });
  els.forEach((el) => io.observe(el));
}

function setupCatalog() {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;
  const items = [...grid.querySelectorAll(".product")];
  const buttons = document.querySelectorAll(".filters button");
  const input = document.getElementById("q");
  const count = document.querySelector(".count");
  const empty = document.querySelector(".empty");
  let cat = "All";

  const apply = () => {
    const terms = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let n = 0;
    items.forEach((it) => {
      const show = (cat === "All" || it.dataset.cat === cat) && terms.every((t) => it.dataset.search.includes(t));
      it.hidden = !show;
      if (show) { n++; it.classList.add("in"); }
    });
    count.textContent = `${n} product${n === 1 ? "" : "s"}`;
    empty.hidden = n > 0;
  };
  buttons.forEach((b) => b.addEventListener("click", () => {
    cat = b.dataset.filter;
    buttons.forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
    apply();
  }));
  input.addEventListener("input", apply);
}

/* ---- Order list: collect items across pages, send as one WhatsApp message */

const ORDER_KEY = "tawfiiq-order";
const store = {
  read() { try { return JSON.parse(localStorage.getItem(ORDER_KEY)) || []; } catch { return []; } },
  write(list) { try { localStorage.setItem(ORDER_KEY, JSON.stringify(list)); } catch { /* private mode: list lives for this page only */ } },
};

function orderMessage(list, note) {
  const lines = list.map((it, i) => `${i + 1}. ${it.qty} × ${it.name} — ${it.cat}, ${it.size} (${it.dept})`);
  return `Hello Tawfiiq, I'd like to order:\n${lines.join("\n")}${note ? `\n\nNote: ${note}` : ""}`;
}

function setupOrder() {
  let list = store.read();

  document.body.insertAdjacentHTML("beforeend", `
  <div class="order-bar" role="region" aria-label="Order list" hidden>
    <button type="button" class="ob-view" aria-haspopup="dialog">${ICONS.list}<span class="ob-text"></span></button>
    <a class="btn btn-yellow ob-send" target="_blank" rel="noopener">Send on WhatsApp</a>
  </div>
  <div class="sr-only" role="status" aria-live="polite" id="order-status"></div>
  <dialog class="order-dialog" aria-labelledby="od-title">
    <div class="od-head">
      <h2 id="od-title">Your order list</h2>
      <button type="button" class="od-close" aria-label="Close order list">×</button>
    </div>
    <ul class="od-list"></ul>
    <div class="field od-note"><label for="od-note">Note for our sales team (optional)</label><textarea id="od-note" placeholder="Delivery city, preferred brand, deadline…"></textarea></div>
    <div class="od-actions">
      <button type="button" class="btn btn-ghost od-clear">Clear list</button>
      <a class="btn btn-green od-send" target="_blank" rel="noopener">${ICONS.wa} Send on WhatsApp</a>
    </div>
  </dialog>`);

  const bar = document.querySelector(".order-bar");
  const barText = bar.querySelector(".ob-text");
  const status = document.getElementById("order-status");
  const dialog = document.querySelector(".order-dialog");
  const ul = dialog.querySelector(".od-list");
  const note = dialog.querySelector("#od-note");
  const sends = [bar.querySelector(".ob-send"), dialog.querySelector(".od-send")];
  const total = () => list.reduce((s, it) => s + it.qty, 0);
  const summary = () => `${list.length} item${list.length === 1 ? "" : "s"} · ${total()} units`;

  const setQty = (item, qty, announce = true) => {
    const existing = list.find((it) => it.id === item.id);
    if (qty <= 0) list = list.filter((it) => it.id !== item.id);
    else if (existing) existing.qty = qty;
    else list.push({ ...item, qty });
    store.write(list);
    render();
    if (announce) status.textContent = qty > 0 ? `${item.cat}, ${item.size}: ${qty} in your order list. ${summary()}.` : `${item.cat}, ${item.size} removed. ${list.length ? summary() : "Order list is empty"}.`;
  };

  const cards = [...document.querySelectorAll(".product")];
  const itemFromCard = (c) => ({ id: c.dataset.id, name: c.dataset.name, cat: c.dataset.cat, size: c.dataset.size, dept: c.dataset.dept });

  function render() {
    const has = list.length > 0;
    bar.hidden = !has;
    document.body.classList.toggle("has-order", has);
    barText.textContent = has ? `${summary()} — view list` : "";
    sends.forEach((a) => { a.href = waLink(orderMessage(list, note.value.trim())); });

    cards.forEach((c) => {
      const it = list.find((x) => x.id === c.dataset.id);
      c.querySelector(".add-btn").hidden = !!it;
      c.querySelector(".stepper").hidden = !it;
      c.querySelector(".qty").textContent = it ? it.qty : 1;
      c.classList.toggle("in-order", !!it);
    });

    ul.innerHTML = list.map((it) => `
      <li data-id="${attr(it.id)}">
        <div><b>${esc(it.name)}</b><span>${esc(it.cat)} · ${esc(it.size)} · ${esc(it.dept)}</span></div>
        <div class="stepper">
          <button type="button" class="step dec" aria-label="One less ${attr(it.cat)} ${attr(it.size)}">−</button>
          <span class="qty" aria-hidden="true">${it.qty}</span>
          <button type="button" class="step inc" aria-label="One more ${attr(it.cat)} ${attr(it.size)}">+</button>
        </div>
      </li>`).join("") || '<li class="od-empty">Your list is empty. Add products from any department.</li>';
  }

  cards.forEach((c) => {
    const item = itemFromCard(c);
    const qtyOf = () => (list.find((x) => x.id === item.id) || { qty: 0 }).qty;
    c.querySelector(".add-btn").addEventListener("click", () => { setQty(item, 1); c.querySelector(".inc").focus(); });
    c.querySelector(".inc").addEventListener("click", () => setQty(item, qtyOf() + 1));
    c.querySelector(".dec").addEventListener("click", () => {
      const q = qtyOf() - 1;
      setQty(item, q);
      if (q <= 0) c.querySelector(".add-btn").focus();
    });
  });

  ul.addEventListener("click", (e) => {
    const btn = e.target.closest(".step");
    if (!btn) return;
    const id = btn.closest("li").dataset.id;
    const it = list.find((x) => x.id === id);
    const q = it.qty + (btn.classList.contains("inc") ? 1 : -1);
    setQty(it, q);
    const li = ul.querySelector(`li[data-id="${CSS.escape(id)}"] .${btn.classList.contains("inc") ? "inc" : "dec"}`);
    (li || dialog.querySelector(".od-close")).focus();
  });

  note.addEventListener("input", () => sends.forEach((a) => { a.href = waLink(orderMessage(list, note.value.trim())); }));
  bar.querySelector(".ob-view").addEventListener("click", () => dialog.showModal());
  dialog.querySelector(".od-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.querySelector(".od-clear").addEventListener("click", () => {
    if (!list.length || !confirm("Remove every item from your order list?")) return;
    list = []; store.write(list); render();
    status.textContent = "Order list cleared.";
    dialog.close();
  });
  sends.forEach((a) => a.addEventListener("click", () => { status.textContent = "Opening WhatsApp with your order list."; }));

  // Keep the list in sync when another tab changes it
  window.addEventListener("storage", (e) => { if (e.key === ORDER_KEY) { list = store.read(); render(); } });
  render();
}

/* ---- Enquiry form: inline validation, WhatsApp or email */

function setupForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;
  const note = form.querySelector(".form-note");
  const rules = {
    name: (v) => (v.trim().length >= 2 ? "" : "Enter your full name."),
    phone: (v) => (v.replace(/\D/g, "").length >= 7 ? "" : "Enter a phone or WhatsApp number with at least 7 digits."),
  };
  const check = (input) => {
    const rule = rules[input.name];
    if (!rule) return true;
    const msg = rule(input.value);
    const err = document.getElementById(input.getAttribute("aria-describedby"));
    err.textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    return !msg;
  };
  const fields = Object.keys(rules).map((n) => form.elements[n]);
  fields.forEach((f) => {
    f.addEventListener("blur", () => { if (f.value) check(f); });
    f.addEventListener("input", () => { if (f.getAttribute("aria-invalid") === "true") check(f); });
  });

  const message = () => {
    const f = new FormData(form);
    return `Enquiry from ${f.get("name")} (${f.get("phone")}${f.get("city") ? ", " + f.get("city") : ""})\nDepartment: ${f.get("department")}\n\n${f.get("message") || ""}`;
  };
  const valid = () => {
    const bad = fields.filter((f) => !check(f));
    if (bad.length) { note.textContent = "Please fix the highlighted field" + (bad.length > 1 ? "s." : "."); note.className = "form-note err-note"; bad[0].focus(); }
    return !bad.length;
  };
  const done = (how) => { note.textContent = `Thanks — ${how} is opening with your enquiry. If nothing opens, call +252 907 090 025.`; note.className = "form-note ok-note"; };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!valid()) return;
    window.open(waLink(message()), "_blank", "noopener");
    done("WhatsApp");
  });
  form.querySelector(".email-alt").addEventListener("click", () => {
    if (!valid()) return;
    const f = new FormData(form);
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry: ${f.get("department")}`)}&body=${encodeURIComponent(message())}`;
    done("your email app");
  });
}

/* ---------------------------------------------------------------- exports */

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DEPARTMENTS, NEWS, renderHeader, renderFooter, renderDepartment };
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite);
} else {
  initSite();
}
