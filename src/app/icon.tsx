import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#EA580C",
          border: "2px solid white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 14,
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: -0.5,
        }}
      >
        EM
      </div>
    ),
    { ...size }
  );
}
