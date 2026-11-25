"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── the curved row ──────────────────────────────────────────────
 * Scroll Tilted Grid turned on its side, with the tilt drawn as a curve.
 * One row of images streams from right to left around the inside of a
 * cylinder. The centre faces you flat, the ends bend toward you so each
 * end image curves along its length, and the ends fade into the page.
 *
 * A CSS box can't bend, so every tile is cut into SLICES vertical strips,
 * each a flat facet of the cylinder showing its share of the image. The
 * tile (preserve-3d) is what moves: one rotateY carries it along the arc.
 *
 * Additions for Tawfiiq (over the original component):
 *  - images can carry `href` + `label`: clicking a slide follows its link,
 *    and keyboard / screen-reader users get the same links as a list that
 *    appears when focused (the moving band itself stays aria-hidden);
 *  - a pause/play button (WCAG 2.2.2), starting paused for reduced motion;
 *  - pauses while hovered (a moving target is hard to click) and while
 *    scrolled out of view;
 *  - lays out immediately from the element's size, so a background tab
 *    doesn't show an empty band until it is first painted.
 * ─────────────────────────────────────────────────────────────── */

const SLICES = 16;
const CAMERA = 1.6;
const MAX_WIDTH = 55;

function arc(bend: number) {
  return (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
}

function measure(width: number, height: number, tile: number, aspect: number, gap: number, bend: number) {
  const h = Math.min((tile / 100) * height, ((MAX_WIDTH / 100) * width) / aspect);
  const radius = width * arc(bend);
  if (!(h > 0) || !(radius > 0)) return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  const deg = (rad: number) => (rad * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (aspect + gap / 100) * unit;
  const limit = deg(bend) + (aspect * unit) / 2;
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
  const round = (n: number) => +n.toFixed(4);
  const sweep = round((columns * pitch) / 2);
  return { columns, sweep, unit: round(unit), limit: round(Math.min(sweep, limit)) };
}

export type TiltedGridImage = {
  src: string;
  alt?: string;
  /** Makes the slide a link. */
  href?: string;
  /** Name of the link, for keyboard / screen-reader users and the hover tooltip. */
  label?: string;
};

export type TiltedGridHeroProps = {
  images: TiltedGridImage[];
  /** Seconds for the row to advance by one tile. @default 4 */
  speed?: number;
  /** Tile height, as a percentage of the hero's height. @default 26 */
  tileHeight?: number;
  /** Tile width divided by tile height. @default 16 / 9 */
  aspectRatio?: number;
  /** Space between tiles, as a percentage of a tile's height. @default 6 */
  gap?: number;
  /** Vertical centre of the row, as a percentage of the hero's height. @default 56 */
  axis?: number;
  /** How far the row has bent round by the frame's edge, in degrees (5–85). @default 80 */
  curve?: number;
  /** Width of the fade at each end, as a percentage of the hero's width. @default 12 */
  fade?: number;
  /** Called when a linked slide is clicked; defaults to normal navigation. */
  onSelect?: (image: TiltedGridImage) => void;
  /** Accessible name for the list of slide links. */
  linksLabel?: string;
  children?: React.ReactNode;
  className?: string;
};

export function TiltedGridHero({
  images,
  speed = 4,
  tileHeight = 26,
  aspectRatio = 16 / 9,
  gap = 6,
  axis = 56,
  curve = 80,
  fade = 12,
  onSelect,
  linksLabel = "Destinations",
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onSelect"> & TiltedGridHeroProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const orbit = `tgh-o-${id}`;
  const tile = `tgh-t-${id}`;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;

  const [layout, setLayout] = React.useState<ReturnType<typeof measure> | null>(null);
  const [shown, setShown] = React.useState<Record<number, number>>({});
  const [paused, setPaused] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [offscreen, setOffscreen] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = (width: number, height: number) => {
      if (!(width > 0 && height > 0)) return;
      const next = measure(width, height, tileHeight, aspectRatio, gap, bend);
      setLayout((prev) =>
        prev?.columns === next.columns && prev.sweep === next.sweep && prev.unit === next.unit ? prev : next,
      );
    };
    apply(el.clientWidth, el.clientHeight);
    const ro = new ResizeObserver(([entry]) => apply(entry.contentRect.width, entry.contentRect.height));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting));
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, [tileHeight, aspectRatio, gap, bend]);

  React.useEffect(() => {
    for (const { src } of images) new Image().src = src;
  }, [images]);

  const { columns, sweep, unit, limit } = layout ?? measure(1200, 560, tileHeight, aspectRatio, gap, bend);

  const u = (n: number) =>
    `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(MAX_WIDTH / aspectRatio).toFixed(4)}cqw))`;

  const r = 100 * arc(bend);
  const radius = `${+r.toFixed(3)}cqw`;
  const turn = (deg: number) =>
    `translateZ(${radius}) rotateY(${+deg.toFixed(4)}deg) translateZ(-${radius})`;

  const hide = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
  const css =
    `@keyframes ${orbit}{` +
    `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}` +
    `0%,${hide}%,${100 - hide}%,100%{visibility:hidden}` +
    `${hide + 0.001}%,${100 - hide - 0.001}%{visibility:visible}}` +
    // Pause on hover (mouse users), when paused, or when out of view.
    `@media(hover:hover){[data-tgh="${id}"]:hover .${tile}{animation-play-state:paused!important}}`;

  const share = aspectRatio / SLICES;
  const duration = columns * speed;
  const mask = `linear-gradient(90deg,transparent,#000 ${fade}%,#000 ${100 - fade}%,transparent)`;
  const stopped = paused || offscreen;
  const linked = images.filter((i) => i.href);

  const follow = (img: TiltedGridImage) => {
    if (!img.href) return;
    if (onSelect) onSelect(img);
    else window.location.href = img.href;
  };

  return (
    <div
      ref={ref}
      data-tgh={id}
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "size", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: layout ? 1 : 0,
          perspective: `${+(r * CAMERA).toFixed(3)}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {Array.from({ length: columns }, (_, t) => {
          const first = columns - 1 - t;
          const index = (shown[t] ?? first) % Math.max(images.length, 1);
          const img = images[index];
          return (
            <div
              key={t}
              title={img?.label}
              className={cn(tile, "absolute", img?.href && "pointer-events-auto cursor-pointer [&:hover>div]:brightness-110")}
              style={{
                left: `calc(50% - ${u(aspectRatio / 2)})`,
                top: `calc(${axis}% - ${u(0.5)})`,
                width: u(aspectRatio),
                height: u(1),
                transformStyle: "preserve-3d",
                // longhands, not the `animation` shorthand, so play-state can change safely
                animationName: orbit,
                animationDuration: `${duration}s`,
                animationTimingFunction: "linear",
                animationDelay: `${-t * speed}s`,
                animationIterationCount: "infinite",
                animationPlayState: stopped ? "paused" : "running",
              }}
              onClick={() => img && follow(img)}
              onAnimationIteration={(e) => {
                const lap = Math.round(e.elapsedTime / duration);
                setShown((prev) => {
                  const next = lap * columns + first;
                  return prev[t] === next ? prev : { ...prev, [t]: next };
                });
              }}
            >
              {Array.from({ length: SLICES }, (_, k) => (
                <div
                  key={k}
                  className={cn(
                    "absolute top-0 overflow-hidden bg-navy-2 transition-[filter]",
                    k === 0 && "rounded-l-[10px]",
                    k === SLICES - 1 && "rounded-r-[10px]",
                  )}
                  style={{
                    left: u((aspectRatio - share) / 2),
                    width: k === SLICES - 1 ? u(share) : `calc(${u(share)} + 1px)`,
                    height: u(1),
                    transform: turn((aspectRatio / 2 - (k + 0.5) * share) * unit),
                  }}
                >
                  {img ? (
                    <img
                      src={img.src}
                      alt=""
                      draggable={false}
                      className="absolute top-0 max-w-none object-cover select-none"
                      style={{ left: u(-k * share), width: u(aspectRatio), height: u(1) }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {children}

      {/* Pause / play */}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play photo animation" : "Pause photo animation"}
        className="absolute right-[max(16px,calc((100%-1180px)/2+24px))] bottom-2 z-[2] grid size-11 place-items-center rounded-full border border-white/35 bg-navy/75 text-white backdrop-blur-md hover:bg-navy-3"
      >
        {paused ? <Play className="size-[18px] fill-current" /> : <Pause className="size-[18px] fill-current" />}
      </button>

      {/* Keyboard / screen-reader version of the slide links: hidden until focused */}
      {linked.length > 0 && (
        <ul
          aria-label={linksLabel}
          className="absolute bottom-2 left-[max(16px,calc((100%-1180px)/2+24px))] z-[3] flex flex-wrap gap-2 [clip-path:inset(50%)] focus-within:right-20 focus-within:[clip-path:none]"
        >
          {linked.map((img) => (
            <li key={img.href}>
              <a
                href={img.href}
                onClick={(e) => { if (onSelect) { e.preventDefault(); onSelect(img); } }}
                className="inline-flex min-h-11 items-center rounded-full bg-white px-[18px] text-sm font-bold text-navy"
              >
                {img.label ?? img.href}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TiltedGridHero;
