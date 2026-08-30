"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { GoogleIcon } from "@/components/OAuthIcons";

const features = [
  {
    title: "OAuth login",
    text: "One-click sign in with Google or GitHub.",
    icon: <GoogleIcon className="h-6 w-6" />,
  },
  {
    title: "Profile page",
    text: "See your account details from the database.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
      </svg>
    ),
  },
  {
    title: "User directory",
    text: "List every registered user.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
        <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
];

export default function LandingHero() {
  const { data: session, status } = useSession();
  const initial = session?.user?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <main className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-12 overflow-hidden px-6 py-16 text-center">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/25 blur-3xl" />

      {/* Hero */}
      <div className="relative flex flex-col items-center gap-6">
        {status === "authenticated" && session.user ? (
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
            {session.user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name ?? "Avatar"}
                className="h-8 w-8 rounded-full ring-2 ring-white/20"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 text-sm font-bold text-white">
                {initial}
              </div>
            )}
            <span className="text-sm font-medium text-white/80">
              Signed in as {session.user.name}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Open source · Powered by Next.js
          </div>
        )}

        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Sign in securely with{" "}
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Google
          </span>{" "}
          or{" "}
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            GitHub
          </span>
        </h1>

        <p className="max-w-xl text-lg text-white/60">
          A modern authentication demo built with Next.js and NextAuth.
          Authenticate with your favourite provider, then view your profile and
          explore the user directory.
        </p>

        <nav
          className="flex flex-wrap items-center justify-center gap-3"
          aria-label="Main navigation"
        >
          <Link
            href={status === "authenticated" ? "/profile" : "/login"}
            className="rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/30 transition hover:opacity-90"
          >
            {status === "authenticated" ? "Go to your profile" : "Get started"}
          </Link>
          <Link
            href="/users"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/10"
          >
            Browse users
          </Link>
        </nav>
      </div>

      {/* Features */}
      <section className="grid w-full gap-4 sm:grid-cols-3" aria-label="Features">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600/25 to-cyan-500/25 text-cyan-300">
              {feature.icon}
            </div>
            <h2 className="font-semibold text-white">{feature.title}</h2>
            <p className="mt-2 text-sm text-white/60">{feature.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
