import { Icon, linkedinIcon, mailIcon } from "./icons";
import { profile } from "@/content/profile";
import styles from "./FloatingLinks.module.css";

const links = [
  { label: "LinkedIn", href: profile.linkedin, icon: linkedinIcon, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: mailIcon, external: false },
];

/**
 * Profile rail (left edge, wide screens) and resume pill (bottom right),
 * fixed on screen. Pure CSS: the rail steps aside while the Contact section —
 * which lists the same links — is on screen, via a named view timeline.
 */
export default function FloatingLinks() {
  return (
    <>
      <nav className={styles.rail} aria-label="Profiles">
        <ul className={styles.railList}>
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={styles.railLink}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon className={styles.icon}>{l.icon}</Icon>
                <span className={`mono ${styles.tip}`}>
                  {l.label}
                  {l.external ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <span className={styles.railRule} aria-hidden="true" />
      </nav>

      <a className={styles.resume} href={profile.resume} target="_blank" rel="noopener">
        <span className={styles.resumeLabel}>Resume</span>
        <span className={`mono ${styles.resumeTag}`} aria-hidden="true">
          PDF ↗
        </span>
        <span className="visually-hidden"> (PDF, opens in a new tab)</span>
      </a>
    </>
  );
}
