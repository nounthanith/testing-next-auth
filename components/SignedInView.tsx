"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

interface SignedInViewProps {
  name?: string | null;
  image?: string | null;
}

export default function SignedInView({ name, image }: SignedInViewProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 opacity-40 blur-2xl" />
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt="Avatar"
            className="relative h-20 w-20 rounded-full ring-2 ring-white/20"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 text-3xl font-bold text-white">
            {name?.charAt(0)?.toUpperCase()}
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="text-xl font-semibold">Welcome back {name}</p>
        <p className="mt-1 text-sm text-white/60">
          You are signed in successfully
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          setLoading(true);
          signOut();
        }}
        disabled={loading}
        className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/10 disabled:opacity-60"
      >
        {loading ? "Signing out..." : "Sign out"}
      </button>
    </div>
  );
}
