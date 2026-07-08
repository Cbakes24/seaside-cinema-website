// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { FlagValues } from "flags/react"
import { evaluate } from "flags/next"
import { julyweek1, summerSaleFlag } from "@/flags"
import ClarityInit from "@/app/components/ClarityInit"
export const metadata = {
  title: 'Seaside Cinema',
  description: 'Luxury beachside movie nights in San Diego',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { isSummerSaleEnabled, isJulyWeek1Enabled } = await evaluate({
    isSummerSaleEnabled: summerSaleFlag,
    isJulyWeek1Enabled: julyweek1,
  })

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Shadows+Into+Light&display=swap" rel="stylesheet" />
      </head>
      <body
        className="bg-white text-gray-900 font-inter"
        data-summer-sale={String(isSummerSaleEnabled)}
        data-julyweek1={String(isJulyWeek1Enabled)}
      >
      <Header />
        <main className="min-h-[calc(100vh-80px)]">
          {children}
          <ClarityInit />
          <FlagValues
            values={{
              "summer-sale": isSummerSaleEnabled,
              julyweek1: isJulyWeek1Enabled,
            }}
          />
          <Analytics />
          <SpeedInsights />
        </main>
        <Footer />
        <footer className="text-center py-6 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Seaside Cinema · San Diego, CA
        </footer>
      </body>
    </html>
  )
}
