import type { ReactNode } from "react";

export function AuthShell({
  title,
  description,
  children
}: Readonly<{
  title: string;
  description: string;
  children: ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.2),transparent_24%),linear-gradient(180deg,#070A12_0%,#0B1120_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />

      <section className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#1E293B] bg-[#0F172A]/90 shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-[#1E293B] px-8 py-10 lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#38BDF8]">
              Secure Admin
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-[#F8FAFC]">{title}</h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#94A3B8]">{description}</p>

            <div className="mt-10 space-y-4">
              {[
                "Only authenticated users can reach the admin route group.",
                "Server-side email allowlisting limits access to approved admins.",
                "Public portfolio pages remain outside the protected route boundary."
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-[#1E293B] bg-slate-950/40 px-4 py-4 text-sm leading-6 text-[#94A3B8]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-14">{children}</div>
        </div>
      </section>
    </main>
  );
}
