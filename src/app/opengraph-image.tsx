import { ImageResponse } from "next/og";
import { MARK, mercuryPath, tubePath } from "@/lib/mark";
import { profile } from "@/content/profile";

// Link-preview card (1200×630), generated at build time and attached to every
// route as og:image / twitter:image.
export const alt = `${profile.name} — ${profile.role} (${profile.focus})`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TONES = { cool: "#4ec1db", warm: "#f0b03c", hot: "#ff6a48" } as const;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0c0f10",
          color: "#e7ebe8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#b4bcb8" }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: TONES.warm }} />
          {profile.seeking} · {profile.location}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 140, fontWeight: 800, lineHeight: 0.9, letterSpacing: -6 }}>
              {profile.firstName}
            </div>
            <div style={{ fontSize: 140, fontWeight: 800, lineHeight: 0.9, letterSpacing: -6, paddingLeft: 80 }}>
              {profile.lastName}
            </div>
            <div style={{ marginTop: 36, fontSize: 40, fontWeight: 700 }}>
              {`${profile.role} — ${profile.focus}`}
            </div>
          </div>

          {/* The Thermo-D mark, mercury three-quarters up. */}
          <svg width="280" height="280" viewBox="0 0 32 32" fill="none">
            <path d={MARK.bowl} stroke="#e7ebe8" strokeWidth={MARK.bowlWidth} strokeLinecap="round" />
            <path d={tubePath} stroke="#e7ebe8" strokeWidth={MARK.tube.width} strokeLinecap="round" />
            <circle cx={MARK.bulb.cx} cy={MARK.bulb.cy} r={MARK.bulb.r} fill="#e7ebe8" />
            <path d={mercuryPath} stroke="#0c0f10" strokeWidth={MARK.channel.width} strokeLinecap="round" />
            <path
              d={`M${MARK.tube.x} ${MARK.bulb.cy}V11`}
              stroke={TONES.hot}
              strokeWidth={MARK.channel.width}
              strokeLinecap="round"
            />
            <circle cx={MARK.bulb.cx} cy={MARK.bulb.cy} r={MARK.bulb.core} fill={TONES.hot} />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            height: 10,
            borderRadius: 10,
            background: `linear-gradient(to right, ${TONES.cool}, ${TONES.warm}, ${TONES.hot})`,
          }}
        />
      </div>
    ),
    size,
  );
}
