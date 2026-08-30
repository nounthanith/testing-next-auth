"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { GoogleIcon, GitHubIcon } from "@/components/OAuthIcons";

type Provider = "google" | "github";

interface OAuthButtonsProps {
  loading?: Provider | null;
  onLoadingChange?: (provider: Provider | null) => void;
  callbackUrl?: string;
}

export default function OAuthButtons({
  loading: controlledLoading,
  onLoadingChange,
  callbackUrl = "/",
}: OAuthButtonsProps) {
  const [internalLoading, setInternalLoading] = useState<Provider | null>(null);

  const loading = controlledLoading ?? internalLoading;

  const handleSignIn = (provider: Provider) => {
    if (controlledLoading !== undefined) {
      onLoadingChange?.(provider);
    } else {
      setInternalLoading(provider);
    }
    signIn(provider, { callbackUrl });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => handleSignIn("google")}
        disabled={loading !== null}
        className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white font-medium text-neutral-900 shadow-lg shadow-black/20 transition hover:bg-white/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading === "google" ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
        ) : (
          <GoogleIcon className="h-5 w-5" />
        )}
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => handleSignIn("github")}
        disabled={loading !== null}
        className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-neutral-900 font-medium text-white ring-1 ring-white/10 transition hover:bg-neutral-800 hover:ring-white/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading === "github" ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        ) : (
          <GitHubIcon className="h-5 w-5 fill-current" />
        )}
        Continue with GitHub
      </button>
    </div>
  );
}
