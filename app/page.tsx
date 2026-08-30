import Link from "next/link";

export const metadata = {
  title: "Home",
  description:
    "Sign in securely with Google or GitHub using NextAuth. Explore the profile and user management features.",
};

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
        Sign in securely with Google or GitHub
      </h1>
      <p className="max-w-xl text-lg text-white/60">
        NextAuth is a modern authentication demo built with Next.js. Authenticate
        with your favourite provider, then view your profile and manage the user
        directory.
      </p>

      <nav className="flex flex-wrap items-center justify-center gap-3" aria-label="Main navigation">
        <Link
          href="/login"
          className="rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/30 transition hover:opacity-90"
        >
          Sign in
        </Link>
        <Link
          href="/profile"
          className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/10"
        >
          View profile
        </Link>
        <Link
          href="/users"
          className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/10"
        >
          Browse users
        </Link>
      </nav>

      <section className="grid w-full gap-4 sm:grid-cols-3" aria-label="Features">
        {[
          {
            title: "OAuth login",
            text: "One-click sign in with Google or GitHub.",
          },
          {
            title: "Profile page",
            text: "See your account details from the database.",
          },
          {
            title: "User directory",
            text: "List every registered user.",
          },
        ].map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur"
          >
            <h2 className="font-semibold text-white">{feature.title}</h2>
            <p className="mt-2 text-sm text-white/60">{feature.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
