import SectionHead from "./SectionHead";
import { experience, timelineMonths } from "@/content/profile";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHead channel={2} id="experience-title" title="Experience">
          Two internships that ran in parallel in early 2026 — one on IoT hardware, one turning software
          features into clear business value.
        </SectionHead>

        <div className={styles.log}>
          <div className={`mono ${styles.months}`} aria-hidden="true">
            <span className={styles.year}>2026</span>
            <span className={styles.monthRow}>
              {timelineMonths.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </span>
          </div>

          <ol>
            {experience.map((job) => (
              <li key={job.role} className={`reveal ${styles.entry}`}>
                <div className={styles.meta}>
                  <h3 className={styles.role}>{job.role}</h3>
                  <p className={styles.company}>
                    {job.company}, {job.place}
                  </p>
                  <p className={`mono ${styles.dates}`}>{job.dates}</p>
                </div>

                <div className={styles.track} aria-hidden="true">
                  <span
                    className={styles.bar}
                    style={{ gridColumn: `${job.span[0] + 1} / ${job.span[1] + 2}` }}
                  />
                </div>

                <ul className={styles.points}>
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
