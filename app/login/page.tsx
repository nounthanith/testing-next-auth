"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-semibold">
          Signed in as {session.user?.name}
        </h1>
        {session.user?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt="Avatar"
            className="h-16 w-16 rounded-full"
            referrerPolicy="no-referrer"
          />
        )}
        <button
          onClick={() => signOut()}
          className="rounded-full border border-solid border-black/[.08] px-5 py-2 hover:bg-black/[.04]"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold">Sign in</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex h-12 w-64 items-center justify-center rounded-full border border-solid border-black/[.08] px-5 hover:bg-black/[.04]"
        >
          Continue with Google
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="flex h-12 w-64 items-center justify-center rounded-full bg-foreground px-5 text-background hover:bg-black/[.8]"
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}
