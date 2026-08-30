import type { Metadata, Viewport } from "next";

const siteUrl =
  process.env.NEXTAUTH_URL ?? "https://testing-next-auth.vercel.app";
const siteName = "NextAuth";
const siteTitle = "NextAuth - Secure Google & GitHub Authentication";
const siteDescription =
  "NextAuth is a modern authentication demo built with Next.js — sign in securely with Google or GitHub and manage your profile.";

export const SITE_URL = siteUrl;
export const SITE_NAME = siteName;
export const SITE_TITLE = siteTitle;
export const SITE_DESCRIPTION = siteDescription;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "Nuon Thanith", url: siteUrl }],
  keywords: [
    "Next.js",
    "NextAuth",
    "authentication",
    "OAuth",
    "Google login",
    "GitHub login",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0f1a",
};
