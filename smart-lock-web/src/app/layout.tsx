import * as React from 'react'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Smart Lock Control',
  description:
    'Smart Lock Control é um aplicativo baseado em IoT para controle de acesso seguro, utilizando QR codes e diversos mecanismos de fechadura. Desenvolvido com o ESP32, oferece uma gestão de acesso remota sem interrupções, com uma interface intuitiva.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
