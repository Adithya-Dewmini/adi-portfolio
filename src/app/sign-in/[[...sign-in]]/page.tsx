import { SignIn } from "@clerk/nextjs";
import { AuthShell } from "@/components/auth/auth-shell";

export default function SignInPage() {
  return (
    <AuthShell
      title="Admin sign in"
      description="Sign in with your approved admin email to access the portfolio dashboard and content controls."
    >
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        forceRedirectUrl="/admin/dashboard"
        appearance={{
          variables: {
            colorPrimary: "#38BDF8",
            colorBackground: "#0F172A",
            colorInputBackground: "#020617",
            colorInputText: "#F8FAFC",
            colorText: "#F8FAFC",
            colorTextSecondary: "#94A3B8",
            colorNeutral: "#1E293B",
            colorDanger: "#FB7185",
            borderRadius: "1rem"
          },
          elements: {
            card: "bg-transparent shadow-none",
            rootBox: "mx-auto w-full",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton: "border border-[#1E293B] bg-slate-950/50 text-[#F8FAFC] hover:bg-slate-900",
            formButtonPrimary:
              "bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] text-white shadow-lg shadow-sky-950/30 hover:opacity-95",
            formFieldInput:
              "h-12 rounded-2xl border border-[#1E293B] bg-slate-950/50 text-[#F8FAFC] placeholder:text-[#64748B]",
            footerActionLink: "text-[#38BDF8] hover:text-sky-300",
            formFieldLabel: "text-[#F8FAFC]",
            dividerText: "text-[#64748B]",
            dividerLine: "bg-[#1E293B]",
            identityPreviewText: "text-[#94A3B8]",
            formResendCodeLink: "text-[#38BDF8]"
          }
        }}
      />
    </AuthShell>
  );
}
