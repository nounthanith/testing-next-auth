"use client";

import { useSession } from "next-auth/react";
import OAuthButtons from "@/components/OAuthButtons";
import SignedInView from "@/components/SignedInView";
import { LockBadge } from "@/components/OAuthIcons";

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </main>
    );
  }

  if (session) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <SignedInView name={session.user?.name} image={session.user?.image} />
      </main>
    );
  }

  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden p-8">
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/30">
            <LockBadge className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-white/60">
            Sign in to continue to your account
          </p>
        </div>

        <OAuthButtons />

        <p className="mt-6 text-center text-xs text-white/40">
          By continuing, you agree to our Terms of Service.
        </p>
      </div>
    </main>
  );
}
