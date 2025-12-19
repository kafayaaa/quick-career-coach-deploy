import type { Metadata } from "next";
import { Playfair_Display, Sora } from "next/font/google";
import "./globals.css";
import { CVProvider } from "@/context/CVContext";
import ThemeToggle from "@/components/ThemeToggle";
import { InterviewProvider } from "@/context/InterviewContext";
import Navbar from "@/components/Navbar";
import { MuiThemeProvider } from "./theme-provider";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quick Career Coach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-y-scroll">
      <body
        className={`${playfairDisplay.variable} ${sora.variable} antialiased`}
      >
        <div className="font-sora bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50">
          <CVProvider>
            <InterviewProvider>
              <MuiThemeProvider>
                <Navbar />
                {children}
              </MuiThemeProvider>
            </InterviewProvider>
          </CVProvider>
          <ThemeToggle />
        </div>
      </body>
    </html>
  );
}
