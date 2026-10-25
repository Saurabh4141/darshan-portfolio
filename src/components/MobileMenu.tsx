"use client";

import { useRef } from "react";
import styles from "./SiteHeader.module.css";

type Item = { readonly id: string; readonly label: string };

/**
 * Small-screen navigation on the native popover API: the button opens it
 * without script, Escape and outside taps close it. Script only closes it
 * after a link is chosen.
 */
export default function MobileMenu({ items }: { items: readonly Item[] }) {
  const panel = useRef<HTMLDivElement>(null);

  return (
    <>
      <button
        type="button"
        className={styles.menuButton}
        popoverTarget="site-menu"
        aria-label="Open section menu"
      >
        <span className={styles.burger} aria-hidden="true" />
      </button>
      <div id="site-menu" popover="auto" ref={panel} className={styles.menu}>
        <nav aria-label="Sections">
          <ol>
            {items.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={() => panel.current?.hidePopover()}>
                  <span className="mono" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}
