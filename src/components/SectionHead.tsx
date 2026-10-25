import styles from "./SectionHead.module.css";

/**
 * Every section opens like an instrument channel: a channel number, the
 * heading, and a tick scale whose filled length grows with the channel.
 */
export default function SectionHead({
  channel,
  id,
  title,
  children,
}: {
  channel: number;
  id: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`reveal ${styles.head}`} style={{ "--fill": channel / 5 } as React.CSSProperties}>
      <p className={`mono ${styles.channel}`} aria-hidden="true">
        CH-{String(channel).padStart(2, "0")}
      </p>
      <span className={styles.scale} aria-hidden="true" />
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {children ? <p className={styles.intro}>{children}</p> : null}
    </div>
  );
}
