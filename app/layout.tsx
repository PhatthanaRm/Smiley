import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { CartProvider } from '@/components/cart-provider'
import { AuthProvider } from '@/components/auth-provider'
import { Toaster } from '@/components/ui/toaster'
import NewsletterPopup from '@/components/newsletter-popup'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SMILEY - Premium Oral Care Products',
  description: 'Discover our playful yet premium oral care products with fruit-inspired flavors. Dentist-approved, fun, and effective for the whole family.',
  keywords: 'oral care, toothpaste, dental hygiene, fruit flavors, premium dental products',
  authors: [{ name: 'SMILEY Team' }],
  openGraph: {
    title: 'SMILEY - Premium Oral Care Products',
    description: 'Discover our playful yet premium oral care products with fruit-inspired flavors.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              {children}
              <Toaster />
              <NewsletterPopup />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
        {/* Crisp Chat */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp=[];window.CRISP_WEBSITE_ID="YOUR_CRISP_WEBSITE_ID";
              (function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
            `,
          }}
        />
      </body>
    </html>
  )
}








