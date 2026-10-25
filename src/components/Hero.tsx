import { facts, profile, signalPath } from "@/content/profile";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <div className={`wrap ${styles.grid}`}>
        <p className={`mono ${styles.status}`}>
          <span className={styles.dot} aria-hidden="true" />
          {profile.seeking} · {profile.location}
        </p>

        {/* Not animated: it's the largest paint, and an entrance would delay it. */}
        <h1 id="hero-name" className={styles.name}>
          <span>{profile.firstName}</span>{" "}
          <span className={styles.last}>{profile.lastName}</span>
        </h1>

        <p className={`mono ${styles.role}`}>
          {profile.role} <span aria-hidden="true">/</span> {profile.focus}
        </p>

        <div className={styles.copy}>
          <p className={styles.lede}>{profile.intro}</p>
          <p className={styles.summary}>{profile.summary}</p>
          <div className={styles.actions}>
            <a className="btn" href="#build">
              See the build <span className="arrow arrow--down" aria-hidden="true">↓</span>
            </a>
            <a className="btn btn--quiet" href="#contact">
              Get in touch <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <figure className={styles.path}>
          <figcaption className={styles.pathCaption}>
            <span className="mono">Signal path</span>
            The three stages my skills cover, end to end.
          </figcaption>
          <div className={styles.pathBody}>
            <span className={styles.track} aria-hidden="true">
              <span className={styles.pulse} />
            </span>
            <ol>
              {signalPath.map((s, i) => (
                <li key={s.stage} className={styles.node} style={{ "--i": i } as React.CSSProperties}>
                  <span className={`mono ${styles.index}`} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stage}>{s.stage}</span>
                  <span className={`mono ${styles.detail}`}>{s.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </figure>

        <div className={styles.thermo}>
          <p className={`mono ${styles.thermoLabel}`}>
            Page heat:{" "}
            <span className={styles.modeAuto}>Auto — warms as you scroll</span>
            <span className={styles.modeLow}>Low</span>
            <span className={styles.modeMedium}>Medium</span>
            <span className={styles.modeHigh}>High</span>
            <a className={styles.thermoLink} href="#heat-control">
              set it in Build
            </a>
          </p>
          <div className={styles.scale} aria-hidden="true">
            <span className={styles.marker} />
          </div>
          <div className={`mono ${styles.ticks}`} aria-hidden="true">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>

        <dl className={styles.facts}>
          {facts.map((f) => (
            <div key={f.label} className={styles.fact}>
              <dt className={styles.factLabel}>{f.label}</dt>
              <dd className={styles.factValue}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
