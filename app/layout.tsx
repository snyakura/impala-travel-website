import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LiveChat } from '@/components/live-chat'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Impala Travel Agency | Partner in Travel Convenience',
  description: 'Book flights, safaris, hotel reservations, car rentals, and custom travel packages with Impala Travel Agency - your trusted partner in travel convenience across Africa.',
  keywords: ['travel agency', 'safari tours', 'Zimbabwe travel', 'flight booking', 'hotel reservations', 'Africa travel'],
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#06723C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <LiveChat />
        <Analytics />
      </body>
    </html>
  )
}
