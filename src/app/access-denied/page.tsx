import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.2),transparent_24%),linear-gradient(180deg,#070A12_0%,#0B1120_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />

      <section className="relative z-10 w-full max-w-xl rounded-[2rem] border border-[#1E293B] bg-[#0F172A]/90 p-8 shadow-2xl shadow-sky-950/20 backdrop-blur-xl sm:p-10">
        <div className="inline-flex items-center rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-rose-300">
          Access Denied
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-[#F8FAFC]">You do not have admin access.</h1>
        <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
          This dashboard is restricted to approved admin accounts only. Sign in with the authorized Clerk email or return to the public portfolio.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-[#1E293B] bg-slate-950/40 px-5 py-3 text-sm font-medium text-[#F8FAFC] transition hover:border-sky-400/30 hover:text-[#38BDF8]"
          >
            Go to homepage
          </Link>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white"
          >
            Sign in with admin account
          </Link>
        </div>

        <div className="mt-4">
          <SignOutButton>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-[#1E293B] px-5 py-3 text-sm font-medium text-[#94A3B8] transition hover:text-white"
            >
              Sign out and switch account
            </button>
          </SignOutButton>
        </div>
      </section>
    </main>
  );
}
