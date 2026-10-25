import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { profile, sections } from "@/content/profile";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.bar}`}>
        <a href="#top" className={styles.brand} aria-label={`${profile.name}, back to top`}>
          <Logo size={28} />
          <span className={styles.name}>{profile.name}</span>
        </a>

        <nav className={styles.nav} aria-label="Sections">
          <ul>
            {/* Contact gets the button beside the nav instead. */}
            {sections.filter((s) => s.id !== "contact").map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className={`btn ${styles.cta}`} href="#contact">
          Contact
        </a>

        <MobileMenu items={sections} />
      </div>
      {/* Scroll progress, filled in the page's current heat. */}
      <span className={styles.progress} aria-hidden="true" />
    </header>
  );
}
