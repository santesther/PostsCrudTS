import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Posts App",
  description: "Aplicação de gerenciamento de posts",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <header className="bg-slate-800 text-white py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-bold">Posts App</h1>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
