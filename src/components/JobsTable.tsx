"use client";

import { useState } from "react";
import { jobs, type Fit, type JobType, type Status } from "@/content/jobs";
import styles from "./JobsTable.module.css";

const TABS: { type: JobType; label: string }[] = [
  { type: "Job", label: "Jobs" },
  { type: "Walk-in", label: "Walk In" },
];

type City = "all" | "Pune" | "Other";
type Filters = { city: City; posted: number; fit: "" | Fit; status: "" | Status };

export default function JobsTable() {
  const [tab, setTab] = useState<JobType>("Job");
  const [filters, setFilters] = useState<Filters>({ city: "all", posted: 0, fit: "", status: "" });

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => setFilters((f) => ({ ...f, [key]: value }));

  // Walk-ins only count in Pune. Jobs can be in any city. `jobs` is already newest first.
  const matching = jobs.filter(
    (j) =>
      (j.type === "Walk-in" ? j.city === "Pune" : filters.city === "all" || j.city === filters.city) &&
      (!filters.posted || (j.ageDays !== null && j.ageDays <= filters.posted)) &&
      (!filters.fit || j.fit === filters.fit) &&
      (!filters.status || j.status === filters.status),
  );
  const rows = matching.filter((j) => j.type === tab);
  const count = (type: JobType) => matching.filter((j) => j.type === type).length;

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
              <th scope="col">Status</th>
              <th scope="col">Company</th>
              <th scope="col">Role</th>
              <th scope="col">Posted on</th>
              <th scope="col">Openings</th>
              <th scope="col">Applications</th>
              <th scope="col">Location</th>
              <th scope="col">Fit</th>
              <th scope="col">Details</th>
              <th scope="col">Source</th>
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
