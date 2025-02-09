import { Source_Code_Pro } from 'next/font/google'
import type { Metadata } from 'next'

import { Providers } from './providers'

import './globals.css'

const sourceCodeProFont = Source_Code_Pro({
  variable: '--font-source-code-pro',
  subsets: ['latin'],
  weight: '300',
})

const favIcon =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👻</text></svg>'

export const metadata: Metadata = {
  title: 'Shadō Screen',
  description: 'By Shadō Network',
  icons: favIcon,
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en" className="select-none bg-neutral-950 antialiased dark">
      <body className={sourceCodeProFont.className}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
