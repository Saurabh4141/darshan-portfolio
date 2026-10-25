import { ImageResponse } from "next/og";
import { MARK, mercuryPath, tubePath } from "@/lib/mark";

// iOS home-screen icon (180×180), generated at build time: the Thermo-D on
// the same dark tile as the favicon.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14191b",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32" fill="none">
          <path d={MARK.bowl} stroke="#eef1ee" strokeWidth={MARK.bowlWidth} strokeLinecap="round" />
          <path d={tubePath} stroke="#eef1ee" strokeWidth={MARK.tube.width} strokeLinecap="round" />
          <circle cx={MARK.bulb.cx} cy={MARK.bulb.cy} r={MARK.bulb.r} fill="#eef1ee" />
          <path d={mercuryPath} stroke="#14191b" strokeWidth={MARK.channel.width} strokeLinecap="round" />
          <path
            d={`M${MARK.tube.x} ${MARK.bulb.cy}V12`}
            stroke="#ff6a48"
            strokeWidth={MARK.channel.width}
            strokeLinecap="round"
          />
          <circle cx={MARK.bulb.cx} cy={MARK.bulb.cy} r={MARK.bulb.core} fill="#ff6a48" />
        </svg>
      </div>
    ),
    size,
  );
}
