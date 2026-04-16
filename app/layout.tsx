import ColorThemeBootstrap from '@/components/ColorThemeBootstrap'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Smart IS - Warehouse Solutions & Product Showcase',
  description: 'Discover Smart IS innovative warehouse management solutions including MOCA Client, AUTEST, Smart DevOps, and 12+ products for supply chain transformation.',
  generator: 'v0.app',
  keywords: ['warehouse management', 'supply chain', 'Smart IS solutions', 'MOCA Client', 'product showcase', 'enterprise software'],
  authors: [{ name: 'Smart IS' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'DigitalBY',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e293b' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-hidden" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased overflow-hidden`}
        suppressHydrationWarning
      >
        <ColorThemeBootstrap />
        <ServiceWorkerRegister />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
