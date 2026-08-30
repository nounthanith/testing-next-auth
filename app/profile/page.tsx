"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface ProfileUser {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  emailVerified?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-white/50">{label}</span>
      <span className="break-all text-sm text-white/90">{value ?? "—"}</span>
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setProfile(data.user);
          } else {
            setError(data.error ?? "Failed to load profile");
          }
        })
        .catch(() => setError("Failed to load profile"))
        .finally(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || (status === "authenticated" && loading)) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-lg font-medium">You are not signed in</p>
        <Link
          href="/login"
          className="rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/30 transition hover:opacity-90"
        >
          Sign in
        </Link>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 items-center justify-center p-8">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-sm text-red-300">
          {error}
        </div>
      </main>
    );
  }

  const user = profile;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
        <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-purple-600/30 blur-3xl" />

        <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 opacity-40 blur-2xl" />
              {user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name ?? "Avatar"}
                  className="relative h-24 w-24 rounded-full ring-2 ring-white/20"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-cyan-500 text-4xl font-bold text-white">
                  {(user?.name ?? user?.email ?? "?")?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h1 className="mt-6 text-2xl font-bold">{user?.name ?? "Profile"}</h1>
            <p className="text-sm text-white/60">{user?.email}</p>
          </div>

          <div className="relative flex w-full flex-col gap-4 border-t border-white/10 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <Row label="Name" value={user?.name} />
            <Row label="Email" value={user?.email} />
            <Row label="User ID" value={user?.id} />
            <Row
              label="Email verified"
              value={
                user?.emailVerified
                  ? new Date(user.emailVerified).toLocaleDateString()
                  : "No"
              }
            />
            <Row
              label="Joined"
              value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : null}
            />
            <Row
              label="Last updated"
              value={user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : null}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
