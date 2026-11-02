import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

// Open Graph cards, rendered once at build time (static export) into PNGs.
// Same palette and type as the site: near-black, off-white, Geist.

export const OG_SIZE = { width: 1200, height: 630 };

const FONTS = path.join(process.cwd(), "node_modules/geist/dist/fonts");
const font = (file: string) => fs.readFileSync(path.join(FONTS, file));

const C = {
  bg: "#0a0a0a",
  line: "#1f1f1f",
  fg: "#ededed",
  mid: "#a1a1a1",
  low: "#737373",
  live: "#4ade80",
};

export function renderOg({
  eyebrow,
  title,
  subtitle,
  footer,
  status,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  footer?: string;
  status?: { label: string; live: boolean };
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: C.bg,
          padding: "72px 80px",
          fontFamily: "Geist",
          color: C.fg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: "Geist Mono", fontSize: 26, color: C.low }}>
          <span>{eyebrow}</span>
          {status ? (
            <span style={{ display: "flex", alignItems: "center", gap: 10, color: C.mid, fontSize: 22, letterSpacing: 2 }}>
              <span style={{ width: 10, height: 10, borderRadius: 10, background: status.live ? C.live : C.mid }} />
              {status.label.toUpperCase()}
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, fontWeight: 500, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
          {subtitle ? (
            <div style={{ fontSize: 34, color: C.mid, lineHeight: 1.35, maxWidth: 980 }}>{subtitle}</div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            borderTop: `1px solid ${C.line}`,
            paddingTop: 28,
            fontFamily: "Geist Mono",
            fontSize: 24,
            color: C.low,
          }}
        >
          {footer ?? ""}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Geist", data: font("geist-sans/Geist-Regular.ttf"), weight: 400 },
        { name: "Geist", data: font("geist-sans/Geist-Medium.ttf"), weight: 500 },
        { name: "Geist Mono", data: font("geist-mono/GeistMono-Regular.ttf"), weight: 400 },
      ],
    },
  );
}
