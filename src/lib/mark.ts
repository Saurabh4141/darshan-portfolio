/**
 * Geometry of the "Thermo-D" mark on a 32×32 grid: a letter D whose stem is
 * a thermometer. The stem is a tube ending in a sensor bulb, and the D's bowl
 * runs from the top of the tube round into the bulb. Mercury fills the tube
 * from the bulb up. Shared by <Logo>, the Open Graph card and (hand-copied)
 * app/icon.svg.
 */
export const MARK = {
  /** Thermometer tube: centre line from top to the bulb. */
  tube: { x: 10, top: 4.5, bottom: 25.5, width: 5.2 },
  /** Channel inside the tube, and the mercury that fills it. */
  channel: { top: 6.5, width: 2 },
  bulb: { cx: 10, cy: 25.5, r: 4.6, core: 2.5 },
  /** The D's bowl: from the tube's top, round to meet the bulb. */
  bowl: "M10 4.5H14A11.5 11.5 0 0 1 14 27.5",
  bowlWidth: 3.2,
} as const;

/** Mercury column, bottom (bulb) to top of the channel. */
export const mercuryPath = `M${MARK.tube.x} ${MARK.bulb.cy}V${MARK.channel.top}`;
export const tubePath = `M${MARK.tube.x} ${MARK.tube.top}V${MARK.tube.bottom}`;
