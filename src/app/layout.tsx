// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Link from 'next/link'
import Header from './components/header'


export const metadata = {
  title: 'Seaside Cinema',
  description: 'Luxury beachside movie nights in San Diego',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
      <Header />
        <main className="min-h-[calc(100vh-80px)]">{children}</main>
        <footer className="text-center py-6 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Seaside Cinema · San Diego, CA
        </footer>
      </body>
    </html>
  )
}
