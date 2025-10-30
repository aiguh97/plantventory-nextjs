import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { stackClientApp } from "@/stack";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Plantventory",
  description: "Inventory for plants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
                {/* <div className="w-screen h-auto flex flex-col bg-primary  "> */}
              <Navbar />
              {children}
              {/* </div> */}
            </ThemeProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
