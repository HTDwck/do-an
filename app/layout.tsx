import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PET SERVICE - Dịch vụ chăm sóc thú cưng",
  description:
    "Dịch vụ chăm sóc thú cưng chuyên nghiệp, uy tín tại Hà Nội. Tắm gội, cắt tỉa lông, kiểm tra sức khỏe cho chó mèo.",
  keywords: "pet care, chăm sóc thú cưng, tắm chó, cắt lông mèo, thú y, Hà Nội",
  authors: [{ name: "Pet Service Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0891b2" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
