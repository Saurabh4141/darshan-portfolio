import Logo from "./Logo";
import { profile } from "@/content/profile";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.bar}`}>
        <a href="#top" className={styles.brand}>
          <Logo size={22} />
          <span>{profile.name}</span>
        </a>
        <p className={`mono ${styles.meta}`}>
          © {new Date().getFullYear()} · {profile.location} · No trackers, no cookies
        </p>
        <a href="#top" className={`mono ${styles.top}`}>
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
