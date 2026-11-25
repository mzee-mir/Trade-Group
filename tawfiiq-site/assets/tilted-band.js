/* Tilted band — a plain-JavaScript port of the "TiltedGridHero" React component.

   One row of images streams right-to-left around the inside of a cylinder:
   the centre faces you flat, the ends curl toward you and fade into the page.
   A CSS box can't bend, so each tile is cut into SLICES vertical strips, each a
   flat facet of the cylinder; the tile (preserve-3d) is what animates, so its
   strips never drift apart. Motion is transform-only on the compositor.

   Usage:
     <div class="tilted-band" data-tilted-band
          data-images='["a.jpg","b.jpg"]'
          data-speed="4" data-tile-height="26" data-aspect="16/9"
          data-gap="6" data-axis="56" data-curve="80" data-fade="12"></div>

   All data-* options match the React props (speed, tileHeight, aspectRatio,
   gap, axis, curve, fade). The element needs an explicit height.

   Accessibility additions over the original: a pause/play button (WCAG 2.2.2),
   starts paused when the visitor prefers reduced motion, and stops animating
   while scrolled out of view. The band itself is decorative (aria-hidden). */

(function () {
  // Strips per tile: enough that facets don't read as corners.
  const SLICES = 16;
  // Camera distance from the screen, as a multiple of the cylinder's radius.
  const CAMERA = 1.6;
  // A tile is never wider than this share of the band, so phones still show neighbours.
  const MAX_WIDTH = 55;

  // Cylinder radius (share of width) that puts the frame's edge `bend` radians round the arc.
  const arc = (bend) => (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));

  function measure(width, height, tile, aspect, gap, bend) {
    const h = Math.min((tile / 100) * height, ((MAX_WIDTH / 100) * width) / aspect);
    const radius = width * arc(bend);
    if (!(h > 0) || !(radius > 0)) return { columns: 2, sweep: 0, unit: 0, limit: 0 };
    const deg = (rad) => (rad * 180) / Math.PI;
    const unit = deg(h / radius);
    const pitch = (aspect + gap / 100) * unit;
    const limit = deg(bend) + (aspect * unit) / 2;
    const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
    const round = (n) => +n.toFixed(4);
    const sweep = round((columns * pitch) / 2);
    return { columns, sweep, unit: round(unit), limit: round(Math.min(sweep, limit)) };
  }

  const num = (v, d) => (v === undefined || v === "" || isNaN(+v) ? d : +v);
  let count = 0;

  function mount(root) {
    const o = root.dataset;
    // Each entry is an image URL, or { src, href, label } to make that slide a link.
    let items = [];
    try { items = JSON.parse(o.images || "[]"); } catch { /* bad JSON: render nothing */ }
    items = items.map((it) => (typeof it === "string" ? { src: it } : it)).filter((it) => it && it.src);
    if (!items.length) return;
    const images = items.map((it) => it.src);

    const speed = num(o.speed, 4);
    const tileHeight = num(o.tileHeight, 26);
    const [a, b] = (o.aspect || "16/9").split("/").map(Number);
    const aspect = b ? a / b : a || 16 / 9;
    const gap = num(o.gap, 6);
    const axis = num(o.axis, 56);
    const curve = num(o.curve, 80);
    const fade = num(o.fade, 12);
    const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;

    const id = `tb${++count}`;
    const orbit = `${id}-orbit`;

    root.style.containerType = "size";
    const style = document.createElement("style");
    const band = document.createElement("div");
    band.className = "tb-band";
    band.setAttribute("aria-hidden", "true");

    const r = 100 * arc(bend);
    const radius = `${+r.toFixed(3)}cqw`;
    const turn = (deg) => `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`;
    const u = (n) => `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(MAX_WIDTH / aspect).toFixed(4)}cqw))`;
    const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${100 - fade}%,transparent)`;
    Object.assign(band.style, {
      perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
      perspectiveOrigin: `50% ${axis}%`,
      maskImage: mask,
      webkitMaskImage: mask,
    });

    // Pause / play control
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tb-toggle";
    const setPaused = (p) => {
      root.classList.toggle("is-paused", p);
      btn.setAttribute("aria-pressed", String(p));
      btn.setAttribute("aria-label", p ? "Play photo animation" : "Pause photo animation");
      btn.innerHTML = p
        ? '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></svg>';
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(reduce.matches);
    btn.addEventListener("click", () => setPaused(!root.classList.contains("is-paused")));

    // The moving slides are mouse/touch targets only (the band is aria-hidden).
    // Keyboard and screen-reader users get the same destinations as a plain list
    // of links, which appears over the band when one of them has focus.
    const linked = items.filter((it) => it.href);
    const nav = document.createElement("ul");
    nav.className = "tb-links";
    nav.setAttribute("aria-label", root.dataset.linksLabel || "Destinations");
    linked.forEach((it) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = it.href;
      a.textContent = it.label || it.href;
      li.append(a);
      nav.append(li);
    });

    root.append(style, band, btn);
    if (linked.length) root.append(nav);

    // Fetch every image up front; a tile swaps in its next one just before it re-enters.
    images.forEach((src) => { new Image().src = src; });

    let layout = null;

    function build(L) {
      const { columns, sweep, unit, limit } = L;
      // Beyond `limit` a tile is wholly off-screen, so it's hidden there (and while it wraps).
      const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
      style.textContent =
        `@keyframes ${orbit}{from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}` +
        `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}` +
        `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}`;

      const share = aspect / SLICES;
      const duration = columns * speed;
      const frag = document.createDocumentFragment();

      for (let t = 0; t < columns; t++) {
        const first = columns - 1 - t; // order tiles come on screen
        const tile = document.createElement("div");
        tile.className = "tb-tile";
        Object.assign(tile.style, {
          left: `calc(50% - ${u(aspect / 2)})`,
          top: `calc(${axis}% - ${u(0.5)})`,
          width: u(aspect),
          height: u(1),
          animation: `${orbit} ${duration}s linear ${-t * speed}s infinite`,
        });

        const imgs = [];
        for (let k = 0; k < SLICES; k++) {
          const slice = document.createElement("div");
          slice.className = "tb-slice" + (k === 0 ? " first" : "") + (k === SLICES - 1 ? " last" : "");
          Object.assign(slice.style, {
            left: u((aspect - share) / 2),
            // A pixel wider so neighbouring facets overlap with no hairline gap.
            width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`,
            height: u(1),
            transform: turn((aspect / 2 - (k + 0.5) * share) * unit),
          });
          const img = document.createElement("img");
          img.alt = "";
          img.draggable = false;
          img.decoding = "async";
          Object.assign(img.style, { left: u(-k * share), width: u(aspect), height: u(1) });
          slice.append(img);
          tile.append(slice);
          imgs.push(img);
        }

        let current = first;
        const show = (i) => {
          current = i;
          const item = items[i % items.length];
          imgs.forEach((im) => { if (im.getAttribute("src") !== item.src) im.src = item.src; });
          tile.classList.toggle("is-link", !!item.href);
          if (item.label) tile.title = item.label; else tile.removeAttribute("title");
        };
        // Clicking a slide follows the link of whatever image it is showing right now.
        tile.addEventListener("click", () => {
          const item = items[current % items.length];
          if (item.href) location.href = item.href;
        });
        show(first);
        // Each wrap happens off-screen: hand the tile its next image then.
        tile.addEventListener("animationiteration", (e) => {
          const lap = Math.round(e.elapsedTime / duration);
          show(lap * columns + first);
        });
        frag.append(tile);
      }
      band.replaceChildren(frag);
    }

    const relayout = (width, height) => {
      if (!(width > 0 && height > 0)) return;
      const next = measure(width, height, tileHeight, aspect, gap, bend);
      if (layout && layout.columns === next.columns && layout.sweep === next.sweep && layout.unit === next.unit) return;
      layout = next;
      build(next);
      root.classList.add("is-ready");
    };
    // Lay out straight away (works even in a background tab that isn't painting yet),
    // then follow size changes.
    relayout(root.clientWidth, root.clientHeight);
    new ResizeObserver(([entry]) => relayout(entry.contentRect.width, entry.contentRect.height)).observe(root);

    // Don't spend frames on it while it's scrolled away.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => root.classList.toggle("is-offscreen", !e.isIntersecting)).observe(root);
    }
  }

  const init = () => document.querySelectorAll("[data-tilted-band]").forEach(mount);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
