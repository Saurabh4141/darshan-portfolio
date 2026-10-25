import CopyEmail from "./CopyEmail";
import { Icon, linkedinIcon } from "./icons";
import SectionHead from "./SectionHead";
import { profile } from "@/content/profile";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="wrap">
        <SectionHead channel={5} id="contact-title" title="Contact">
          {profile.seeking} — Python, AI or mobile. Email is the quickest way to reach me.
        </SectionHead>

        <div className={`reveal ${styles.card}`}>
          <p className={`mono ${styles.label}`}>Email</p>
          <a className={styles.email} href={`mailto:${profile.email}`}>
            {profile.email}
            <span className={styles.emailArrow} aria-hidden="true">
              →
            </span>
          </a>
          <div className={styles.row}>
            <CopyEmail email={profile.email} />
            <a
              className="btn btn--quiet"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className={styles.icon}>{linkedinIcon}</Icon>
              LinkedIn <span className="arrow" aria-hidden="true">↗</span>
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
            <a className="btn btn--quiet" href={profile.resume} target="_blank" rel="noopener">
              Resume <span className={`mono ${styles.pdf}`}>PDF</span>
              <span className="arrow" aria-hidden="true">↗</span>
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          </div>
          <p className={`mono ${styles.location}`}>Based in {profile.location}, India</p>
        </div>
      </div>
    </section>
  );
}
