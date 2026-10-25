import styles from "./Backdrop.module.css";

/**
 * Fixed circuit-board backdrop behind the page, matching the theme.
 *
 * - A perfboard dot grid, visible only toward the screen edges.
 * - A thermal glow in each corner whose colour follows the page heat: three
 *   fixed-colour layers cross-faded by opacity, so a heat change never
 *   repaints them.
 * - PCB traces with solder pads running in from both edges (wide screens),
 *   a few carrying a signal pulse now and then.
 * - An ESP32-style module tucked into the top-right corner.
 *
 * All of it is server-rendered from a seeded generator, so the board is
 * identical on every request and costs no JavaScript. Light and dark themes
 * only swap colour tokens (see Backdrop.module.css).
 */

// Small deterministic PRNG (mulberry32): same seed, same board.
function prng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = prng(2005);
const r1 = (n: number) => Math.round(n * 10) / 10;

type Trace = { d: string; pad: [number, number]; via: boolean; pulse: boolean };

/**
 * Traces on a 180×1000 edge panel: in from the screen edge, a 45° bend, then
 * a vertical run ending in a pad. Rows are spaced so traces never cross.
 */
function traces(count: number): Trace[] {
  return Array.from({ length: count }, (_, i) => {
    const y0 = 70 + i * (900 / count) + rand() * 40;
    const x1 = 18 + rand() * 50;
    const bend = 16 + rand() * 22;
    const down = rand() > 0.5 ? 1 : -1;
    const run = 36 + rand() * 70;
    const x2 = x1 + bend;
    const y2 = y0 + bend * down;
    const y3 = y2 + run * down;
    return {
      d: `M0 ${r1(y0)}H${r1(x1)}L${r1(x2)} ${r1(y2)}V${r1(y3)}`,
      pad: [r1(x2), r1(y3)],
      via: rand() > 0.55,
      pulse: i % 3 === 1,
    };
  });
}

const left = traces(7);
const right = traces(7);

function EdgeBoard({ items, side }: { items: Trace[]; side: "left" | "right" }) {
  let pulseIndex = 0;
  return (
    <svg
      className={`${styles.edge} ${side === "right" ? styles.right : ""}`}
      viewBox="0 0 180 1000"
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {items.map((t, i) => (
        <g key={i}>
          <path className={styles.trace} d={t.d} />
          {t.pulse ? (
            <path
              className={styles.pulse}
              d={t.d}
              pathLength={100}
              style={{ animationDelay: `${(pulseIndex++ * 3.1 + (side === "right" ? 1.6 : 0)).toFixed(1)}s` }}
            />
          ) : null}
          {t.via ? (
            <circle className={styles.via} cx={t.pad[0]} cy={t.pad[1]} r="3" />
          ) : (
            <circle className={styles.pad} cx={t.pad[0]} cy={t.pad[1]} r="4.5" />
          )}
        </g>
      ))}
    </svg>
  );
}

/** Castellated module: a shielded can with pins down both long sides. */
function Module() {
  const pins = Array.from({ length: 9 }, (_, i) => 22 + i * 16);
  return (
    <svg className={styles.module} viewBox="0 0 200 180" aria-hidden="true" focusable="false">
      <rect className={styles.board} x="20" y="10" width="160" height="164" rx="6" />
      {pins.map((y) => (
        <g key={y}>
          <rect className={styles.pin} x="14" y={y} width="12" height="7" rx="2" />
          <rect className={styles.pin} x="174" y={y} width="12" height="7" rx="2" />
        </g>
      ))}
      <rect className={styles.can} x="44" y="26" width="112" height="88" rx="4" />
      {/* PCB antenna meander below the can. */}
      <path className={styles.antenna} d="M52 132h16v14h14v-14h14v14h14v-14h14v14h16" />
      <circle className={styles.led} cx="150" cy="156" r="4" />
    </svg>
  );
}

export default function Backdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.grid} />
      <div className={`${styles.glow} ${styles.cool}`} />
      <div className={`${styles.glow} ${styles.warm}`} />
      <div className={`${styles.glow} ${styles.hot}`} />
      <EdgeBoard items={left} side="left" />
      <EdgeBoard items={right} side="right" />
      <Module />
    </div>
  );
}
