"use client";

import { useState } from "react";
import { jobs, type Fit, type JobListing, type JobType, type Status } from "@/content/jobs";
import styles from "./JobsTable.module.css";

const TABS: { type: JobType; label: string }[] = [
  { type: "Job", label: "Jobs" },
  { type: "Walk-in", label: "Walk In" },
];

type City = "all" | "Pune" | "Other";
type Filters = { city: City; posted: number; fit: "" | Fit; status: "" | Status };

type SortKey = "status" | "company" | "role" | "posted" | "openings" | "applications" | "location" | "fit" | "source";
type Sort = { key: SortKey; dir: 1 | -1 } | null;

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "status", label: "Status" },
  { key: "company", label: "Company" },
  { key: "role", label: "Role" },
  { key: "posted", label: "Posted on" },
  { key: "openings", label: "Openings" },
  { key: "applications", label: "Applications" },
  { key: "location", label: "Location" },
  { key: "fit", label: "Fit" },
];

const STATUS_ORDER: Record<Status, number> = { Open: 0, Unverified: 1, Past: 2 };
const FIT_ORDER: Record<Fit, number> = { Yes: 0, Maybe: 1, Unknown: 2, No: 3 };
const firstNumber = (s: string) => {
  const m = /\d+/.exec(s);
  return m ? Number(m[0]) : null;
};

/** Comparable value for a column; null means "no value" and always sorts last. */
function sortValue(j: JobListing, key: SortKey): string | number | null {
  switch (key) {
    case "status":
      return STATUS_ORDER[j.status];
    case "fit":
      return FIT_ORDER[j.fit];
    case "posted":
      return j.ageDays;
    case "openings":
      return firstNumber(j.openings);
    case "applications":
      return firstNumber(j.applications);
    case "company":
      return j.company.toLowerCase();
    case "role":
      return j.role.toLowerCase();
    case "location":
      return j.location.toLowerCase();
    case "source":
      return j.source;
  }
}

export default function JobsTable() {
  const [tab, setTab] = useState<JobType>("Job");
  const [filters, setFilters] = useState<Filters>({ city: "all", posted: 0, fit: "", status: "" });
  const [sort, setSort] = useState<Sort>(null);

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => setFilters((f) => ({ ...f, [key]: value }));

  // Walk-ins only count in Pune. Jobs can be in any city. `jobs` is already newest first.
  const matching = jobs.filter(
    (j) =>
      (j.type === "Walk-in" ? j.city === "Pune" : filters.city === "all" || j.city === filters.city) &&
      (!filters.posted || (j.ageDays !== null && j.ageDays <= filters.posted)) &&
      (!filters.fit || j.fit === filters.fit) &&
      (!filters.status || j.status === filters.status),
  );
  const inTab = matching.filter((j) => j.type === tab);
  const rows = sort
    ? inTab
        .map((j, i) => ({ j, i, v: sortValue(j, sort.key) }))
        .sort((a, b) => {
          if (a.v === null && b.v === null) return a.i - b.i;
          if (a.v === null) return 1;
          if (b.v === null) return -1;
          const c = typeof a.v === "number" && typeof b.v === "number" ? a.v - b.v : String(a.v).localeCompare(String(b.v));
          return c * sort.dir || a.i - b.i;
        })
        .map((x) => x.j)
    : inTab;
  const count = (type: JobType) => matching.filter((j) => j.type === type).length;
  const toggleSort = (key: SortKey) => setSort((s) => (s && s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }));

  return (
    <div>
      <div className={styles.controls}>
        <div className={styles.tabs} role="tablist" aria-label="Listing type">
          {TABS.map((t) => (
            <button
              key={t.type}
              type="button"
              role="tab"
              id={`tab-${t.type}`}
              aria-selected={tab === t.type}
              aria-controls="jobs-panel"
              className={styles.tab}
              onClick={() => setTab(t.type)}
            >
              {t.label} ({count(t.type)})
            </button>
          ))}
        </div>

        <label className={styles.field}>
          <span className="mono">City</span>
          <select value={filters.city} onChange={(e) => set("city", e.target.value as City)}>
            <option value="all">All</option>
            <option value="Pune">Pune</option>
            <option value="Other">Other than Pune</option>
          </select>
        </label>
        <label className={styles.field}>
          <span className="mono">Posted</span>
          <select value={filters.posted} onChange={(e) => set("posted", Number(e.target.value))}>
            <option value={0}>Any time</option>
            <option value={2}>Last 2 days</option>
            <option value={4}>Last 4 days</option>
            <option value={7}>Last week</option>
          </select>
        </label>
        <label className={styles.field}>
          <span className="mono">Fit</span>
          <select value={filters.fit} onChange={(e) => set("fit", e.target.value as Filters["fit"])}>
            <option value="">All</option>
            <option>Yes</option>
            <option>Maybe</option>
            <option>No</option>
            <option>Unknown</option>
          </select>
        </label>
        <label className={styles.field}>
          <span className="mono">Status</span>
          <select value={filters.status} onChange={(e) => set("status", e.target.value as Filters["status"])}>
            <option value="">All</option>
            <option>Open</option>
            <option>Unverified</option>
            <option>Past</option>
          </select>
        </label>
      </div>

      <p className={`mono ${styles.count}`} role="status">
        {rows.length} {rows.length === 1 ? "listing" : "listings"}, newest first
        {tab === "Walk-in" ? " · walk-ins are Pune only" : ""}
      </p>

      <div id="jobs-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className={styles.scroller} tabIndex={0}>
        <table className={styles.table}>
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={sort?.key === c.key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
                >
                  <button type="button" className={styles.sortBtn} onClick={() => toggleSort(c.key)}>
                    {c.label}
                    <span className={styles.arrow} aria-hidden="true">
                      {sort?.key === c.key ? (sort.dir === 1 ? "▲" : "▼") : "⇅"}
                    </span>
                  </button>
                </th>
              ))}
              <th scope="col">Details</th>
              <th
                scope="col"
                aria-sort={sort?.key === "source" ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
              >
                <button type="button" className={styles.sortBtn} onClick={() => toggleSort("source")}>
                  Source
                  <span className={styles.arrow} aria-hidden="true">
                    {sort?.key === "source" ? (sort.dir === 1 ? "▲" : "▼") : "⇅"}
                  </span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={10} className={styles.empty}>
                  No listings match these filters.
                </td>
              </tr>
            ) : (
              rows.map((j) => (
                <tr key={j.url + j.location}>
                  <td>
                    <span className={`${styles.tag} ${styles[j.status]}`}>{j.status}</span>
                  </td>
                  <td className={styles.company}>{j.company}</td>
                  <td>{j.role}</td>
                  <td>{j.posted}</td>
                  <td>{j.openings}</td>
                  <td>{j.applications}</td>
                  <td>{j.location}</td>
                  <td>
                    <span className={`${styles.tag} ${styles[j.fit]}`}>{j.fit}</span>
                  </td>
                  <td>
                    {j.note ? <strong>{j.note}. </strong> : null}
                    {j.details}
                  </td>
                  <td>
                    <a href={j.url} target="_blank" rel="noopener noreferrer">
                      {j.source}
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
