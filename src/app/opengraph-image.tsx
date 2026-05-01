import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tunzone 3D furniture platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #050816 0%, #10172a 46%, #2563eb 100%)",
          color: "#f8fafc",
          fontFamily: "Inter, Arial, sans-serif",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              background: "#f8fafc",
              color: "#2563eb",
              fontSize: 28,
            }}
          >
            T
          </div>
          Tunzone
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              maxWidth: 880,
              fontSize: 76,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.06em",
            }}
          >
            3D furniture sales platform
          </div>
          <div
            style={{
              maxWidth: 760,
              color: "#cbd5e1",
              fontSize: 32,
              lineHeight: 1.35,
            }}
          >
            Transform product photos into 3D models, build immersive room planners,
            and sell modular furniture online.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#dbeafe",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          <span>Product photos to 3D</span>
          <span>Room planners</span>
          <span>Online catalogs</span>
        </div>
      </div>
    ),
    size,
  );
}
