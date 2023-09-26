import "./globals.css";
import type { Metadata } from "next";
import { inter, silkscreen } from "./font";
import { ReduxProvider } from "@/services/Provider";
import { ToastProvider } from "@/components/Toast";
import Circle from "@/components/Circle";
import Header from "@/components/RootHeader";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "KuroshibaZ",
  description: "Tiny Blog with kuro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body
          className={`${inter.variable} ${silkscreen.variable} animate-transform-background min-h-screen w-full 
          overflow-x-clip bg-gradient-to-b from-[rgb(var(--background-start-rgb))] to-[rgb(var(--background-end-rgb))] 
          text-[color:rgb(var(--foreground-rgb))] dark:from-[rgb(var(--background-start-rgb))] 
          dark:to-[rgb(var(--background-end-rgb))] dark:text-[color:rgb(var(--foreground-rgb))]`}
        >
          <div className="fixed -right-10 -top-32 -z-10">
            <Circle />
          </div>
          <div className="fixed -left-32 top-1/2 -z-10 -translate-y-1/2">
            <Circle />
          </div>
          <div className="fixed -bottom-10 -right-10 -z-10">
            <Circle />
          </div>
          <ReduxProvider>
            <ToastProvider>
              <Header />
              {children}
            </ToastProvider>
          </ReduxProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
