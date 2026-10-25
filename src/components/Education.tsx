import SectionHead from "./SectionHead";
import { activities, certifications, education } from "@/content/profile";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <section id="education" className={styles.section} aria-labelledby="education-title">
      <div className="wrap">
        <SectionHead channel={4} id="education-title" title="Education">
          A Computer Science degree, plus focused certifications in the tools I build with.
        </SectionHead>

        <div className={styles.grid}>
          <ol className={styles.timeline}>
            {education.map((e) => (
              <li key={e.title} className={`reveal ${styles.step}`}>
                <span className={`mono ${styles.year}`}>{e.year}</span>
                <div>
                  <h3 className={styles.title}>{e.title}</h3>
                  <p className={styles.place}>{e.place}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.side}>
            <div className="reveal">
              <h3 className={`mono ${styles.label}`}>Certifications</h3>
              <ol className={styles.certs}>
                {certifications.map((c, i) => (
                  <li key={c}>
                    <span className="mono" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c}
                  </li>
                ))}
              </ol>
            </div>

            <div className="reveal">
              <h3 className={`mono ${styles.label}`}>Leadership &amp; activities</h3>
              {activities.map((a) => (
                <div key={a.title} className={styles.activity}>
                  <p className={styles.activityTitle}>{a.title}</p>
                  <p className={styles.activityBody}>{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
