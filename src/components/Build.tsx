import SectionHead from "./SectionHead";
import { project } from "@/content/profile";
import styles from "./Build.module.css";

export default function Build() {
  return (
    <section id="build" className={styles.section} aria-labelledby="build-title">
      <div className="wrap">
        <SectionHead channel={1} id="build-title" title="Build">
          One project, end to end: a sensor, a microcontroller, and an app in the wearer&rsquo;s hand.
        </SectionHead>

        <article className={styles.grid} aria-labelledby="project-name">
          <div className={`reveal ${styles.story}`}>
            <p className={`mono ${styles.kind}`}>{project.kind}</p>
            <h3 id="project-name" className={styles.name}>
              {project.name}
            </h3>
            <p className={styles.tagline}>{project.tagline}</p>
            <p className={styles.overview}>{project.overview}</p>

            <ol className={styles.points}>
              {project.points.map((p, i) => (
                <li key={p.title}>
                  <span className={`mono ${styles.pointIndex}`} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </li>
              ))}
            </ol>

            <ul className={styles.stack} aria-label="Built with">
              {project.stack.map((s) => (
                <li key={s} className="mono">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className={`reveal ${styles.panelWrap}`}>
            <form className={styles.panel} id="heat-control" aria-describedby="heat-note">
              <div className={styles.panelTop} aria-hidden="true">
                <span className="mono">Thermowear</span>
                <span className={styles.led} />
              </div>

              <div className={styles.gauge} aria-hidden="true">
                {[1, 2, 3].map((n) => (
                  <span key={n} style={{ "--n": n } as React.CSSProperties} />
                ))}
              </div>

              <fieldset>
                <legend className={styles.legend}>Heating mode</legend>
                <div className={styles.modes}>
                  {project.modes.map((m) => (
                    <label key={m.id} className={styles.mode}>
                      <input
                        type="radio"
                        name="heat"
                        id={`heat-${m.id}`}
                        value={m.id}
                        defaultChecked={m.id === "auto"}
                      />
                      <span>{m.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </form>
            <p id="heat-note" className={styles.note}>
              The jacket&rsquo;s control model — Auto, or Low / Medium / High by hand — rebuilt as this
              site&rsquo;s colour control. Pick a level and the whole page changes temperature; in Auto it
              warms as you scroll. An illustration, not a screenshot of the app.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
