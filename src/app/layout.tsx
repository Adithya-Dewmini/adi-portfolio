import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Nadun Peiris | Creative Software Engineer",
  description: "Premium portfolio of Nadun Peiris, a software engineering undergraduate, web developer, graphic designer, and digital creative.",
  keywords: ["Nadun Peiris", "Software Engineer", "Portfolio", "Next.js", "Graphic Designer", "Sri Lanka"],
  authors: [{ name: "Nadun Peiris" }],
  openGraph: {
    title: "Nadun Peiris | Creative Software Engineer",
    description: "Code, design, and digital brand work in one premium portfolio.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="noise font-sans antialiased">
        <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up" afterSignOutUrl="/">
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
