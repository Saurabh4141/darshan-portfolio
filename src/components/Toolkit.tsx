import SectionHead from "./SectionHead";
import { toolkit } from "@/content/profile";
import styles from "./Toolkit.module.css";

export default function Toolkit() {
  return (
    <section id="toolkit" className={styles.section} aria-labelledby="toolkit-title">
      <div className="wrap">
        <SectionHead channel={3} id="toolkit-title" title="Toolkit">
          A spec sheet, not a word cloud: each skill group as it stands, with the project, internship or
          certification behind it.
        </SectionHead>

        <dl className={styles.sheet}>
          {toolkit.map((g, i) => (
            <div key={g.group} className={`reveal ${styles.row}`}>
              <dt className={styles.group}>
                <span className={`mono ${styles.index}`} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {g.group}
              </dt>
              <dd className={styles.items}>
                <ul>
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
              {g.seenIn ? (
                <dd className={`mono ${styles.seen}`}>
                  <span className={styles.seenLabel}>Backed by</span> {g.seenIn}
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
