import "@/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { StyleSwitcher } from "@/components/style-switcher"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { WebsocketProvider } from "@/components/websocket-provider";
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "black" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
  manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}
import { HeaderBase } from "@/components/casino/header-base"
import { PubWebsocket } from "@/components/casino/pub-websocket"
import { FooterBase } from "@/components/casino/footer-base"

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" className={fontSans.variable} suppressHydrationWarning>
        <head />
        <Script defer src="/external.js" />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <WebsocketProvider> 
              <div className="relative flex min-h-screen flex-col">
                  <HeaderBase />
                  <div className="flex-1">{children}</div>
                  <FooterBase />
              </div>
              <TailwindIndicator />
              <PubWebsocket />
            </WebsocketProvider>
          </ThemeProvider>
          <StyleSwitcher />
          <Toaster />
        </body>
      </html>
    </>
  )
}
