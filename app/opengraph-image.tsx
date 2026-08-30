import { ImageResponse } from "next/og";

export const alt = "NextAuth - Secure Google & GitHub Authentication";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0f1a",
          backgroundImage:
            "radial-gradient(600px 400px at 80% 20%, rgba(168,85,247,0.35), transparent 70%), radial-gradient(500px 400px at 20% 90%, rgba(34,211,238,0.30), transparent 70%)",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "110px",
            height: "110px",
            borderRadius: "28px",
            background: "linear-gradient(135deg, #9333ea, #06b6d4)",
            fontSize: "60px",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "40px",
          }}
        >
          A
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          NextAuth
        </div>
        <div
          style={{
            marginTop: "20px",
            fontSize: "32px",
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          Sign in securely with Google or GitHub
        </div>
      </div>
    ),
    { ...size }
  );
}
