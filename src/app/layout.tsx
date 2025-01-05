// 'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme'
import '../../src/styles/globals.css'
import Header from './layout/header'
import Menu from './layout/menu'
import Footer from './layout/footer'
import AppQueryProvider from '@/libs/query-provider'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto'
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  console.log(locale)

  // Providing all messages to the client
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AppQueryProvider>
              <NextIntlClientProvider messages={messages}>
                <Header />
                <Menu />
                <main>{children}</main>
                <Footer />
              </NextIntlClientProvider>
            </AppQueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
