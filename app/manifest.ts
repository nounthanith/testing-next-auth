import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NextAuth - Secure Google & GitHub Authentication",
    short_name: "NextAuth",
    description:
      "Sign in securely with Google or GitHub and manage your profile.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f1a",
    theme_color: "#0b0f1a",
  };
}
