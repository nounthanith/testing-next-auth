import type { Metadata } from "next";
import LandingHero from "@/components/LandingHero";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Sign in securely with Google or GitHub using NextAuth. Explore the profile and user management features.",
};

export default function Home() {
  return <LandingHero />;
}
