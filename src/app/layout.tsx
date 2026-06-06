import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Adithya Dewmini | Creative Software Engineer",
  description: "Premium portfolio of Adithya Dewmini, a software engineering undergraduate, web developer, graphic designer, and digital creative.",
  keywords: ["Adithya Dewmini", "Software Engineer", "Portfolio", "Next.js", "Graphic Designer", "Sri Lanka"],
  authors: [{ name: "Adithya Dewmini" }],
  openGraph: {
    title: "Adithya Dewmini | Creative Software Engineer",
    description: "Code, design, and digital brand work in one premium portfolio.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="noise font-sans antialiased">
        <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up" afterSignOutUrl="/">
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
