import * as React from 'react'
import { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Lock Control',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
