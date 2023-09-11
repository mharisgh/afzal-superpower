import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "react-cmdk/dist/cmdk.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Afzal Super Finger',
  description: 'Find at the speed of thought',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
