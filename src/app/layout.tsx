
import {  Space_Grotesk } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import { AppChrome } from "@/components/app-chrome"
import { ThemeProvider } from "@/components/theme-provider"
import { SettingsProvider } from "@/components/settings-context"
import { cn } from "@/lib/utils"
import type { Metadata } from "next";


import { Doto, Geist_Mono, Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-display",
})

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "TypeBlitz - Practice typing fast",
  description: "Practice typing fast with TypeBlitz",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased",
    inter.variable,
    mono.variable,
    doto.variable)}
    >  
     
      <body  suppressHydrationWarning>
        <Toaster/>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W5HG68WM"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <ThemeProvider>
          <SettingsProvider>
            <AppChrome>{children}</AppChrome>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
