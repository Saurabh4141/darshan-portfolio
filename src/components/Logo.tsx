import { MARK, mercuryPath, tubePath } from "@/lib/mark";
import styles from "./Logo.module.css";

/**
 * The "Thermo-D" mark: a D whose stem is a thermometer. The mercury is live —
 * its level follows the page heat (--heat), and it rises on hover.
 */
export default function Logo({ size = 32 }: { size?: number }) {
  const { tube, channel, bulb } = MARK;
  return (
    <svg
      className={styles.mark}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={MARK.bowl} stroke="currentColor" strokeWidth={MARK.bowlWidth} strokeLinecap="round" />
      <path d={tubePath} stroke="currentColor" strokeWidth={tube.width} strokeLinecap="round" />
      <circle cx={bulb.cx} cy={bulb.cy} r={bulb.r} fill="currentColor" />
      {/* The empty channel, then the mercury and bulb core in the current heat. */}
      <path className={styles.channel} d={mercuryPath} strokeWidth={channel.width} strokeLinecap="round" />
      <path className={styles.mercury} d={mercuryPath} strokeWidth={channel.width} strokeLinecap="round" />
      <circle className={styles.core} cx={bulb.cx} cy={bulb.cy} r={bulb.core} />
    </svg>
  );
}
