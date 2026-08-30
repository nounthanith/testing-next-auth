"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const links = [
  { href: "/", label: "Home" },
  // { href: "/login", label: "Login" },
  { href: "/profile", label: "Profile" },
  { href: "/users", label: "Users" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const renderLinks = (onClick?: () => void) => (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClick}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            isActive(link.href)
              ? "bg-white/10 text-white"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          }`}
        >
          {link.label}
        </Link>
      ))}

      {session?.user ? (
        <div className="flex items-center gap-2 md:hidden">
          {session.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name ?? "Avatar"}
              className="h-8 w-8 rounded-full ring-2 ring-white/20"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
              {session.user.name?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
          )}
          <span className="text-sm font-medium text-white/80">
            {session.user.name}
          </span>
        </div>
      ) : (
        <Link
          href="/login"
          onClick={onClick}
          className="rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/30 transition hover:opacity-90 md:hidden"
        >
          Sign in
        </Link>
      )}

      {session?.user && (
        <button
          type="button"
          onClick={() => signOut()}
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-left text-sm font-medium text-red-300 transition hover:bg-red-500/20 md:hidden"
        >
          Sign out
        </button>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 text-sm text-white">
            A
          </span>
          NextAuth
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">{renderLinks()}</nav>

        {/* Desktop: avatar / sign-in on the right */}
        <div className="hidden items-center gap-3 md:flex">
          {session?.user ? (
            <>
              <div className="flex items-center gap-2">
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "Avatar"}
                    className="h-8 w-8 rounded-full ring-2 ring-white/20"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                    {session.user.name?.charAt(0)?.toUpperCase() ?? "?"}
                  </div>
                )}
                <span className="hidden text-sm font-medium text-white/80 sm:block">
                  {session.user.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/30 transition hover:opacity-90"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
            {open ? (
              <path d="M18.3 5.7a1 1 0 0 1 0 1.4L13.4 12l4.9 4.9a1 1 0 0 1-1.4 1.4L12 13.4l-4.9 4.9a1 1 0 0 1-1.4-1.4l4.9-4.9-4.9-4.9a1 1 0 0 1 1.4-1.4l4.9 4.9 4.9-4.9a1 1 0 0 1 1.4 0z" />
            ) : (
              <path d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="border-t border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {renderLinks(() => setOpen(false))}
          </div>
        </nav>
      )}
    </header>
  );
}
