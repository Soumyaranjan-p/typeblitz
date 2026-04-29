
import { Doto, Geist_Mono, Space_Grotesk } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { AppChrome } from "@/components/app-chrome"
import { ThemeProvider } from "@/components/theme-provider"
import { SettingsProvider } from "@/components/settings-context"
import { cn } from "@/lib/utils"
import type { Metadata } from "next";

const spaceGrotesk = Space_Grotesk({subsets:['latin'],variable:'--font-sans'})

const doto = Doto({ subsets: ['latin'], variable: '--font-doto' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})


export const metadata: Metadata = {
  title: "TypeBlitz",
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
      className={cn("antialiased", fontMono.variable, "font-sans", spaceGrotesk.variable, doto.variable)}
    >  
     
      <body suppressHydrationWarning>
        <Toaster/>
        
        <ThemeProvider>
          <SettingsProvider>
            <AppChrome>{children}</AppChrome>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
