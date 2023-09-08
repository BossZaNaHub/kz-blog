import './globals.css'
import type { Metadata } from 'next'
import { inter, silkscreen } from './font'
import { ReduxProvider } from '@/services/Provider'
import { ToastProvider } from '@/components/Toast'
import Circle from '@/components/Circle'
import Header from '@/components/RootHeader'
import Loading from '@/components/Loading'

export const metadata: Metadata = {
  title: 'KuroshibaZ',
  description: 'Tiny Blog with kuro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${silkscreen.variable} animate-transform-background w-full min-h-screen overflow-x-clip`}>
        <div className="fixed -top-32 -right-10 -z-10">
          <Circle />
        </div>
        <div className="fixed top-1/2 -translate-y-1/2 -left-32 -z-10">
          <Circle />
        </div>
        <div className="fixed -bottom-10 -right-10 -z-10">
          <Circle />
        </div>
        <ReduxProvider>
          <ToastProvider>
            <Header />
            <Loading loading={false}>
              {children}
            </Loading>
          </ToastProvider>
        </ReduxProvider>
      </body>
      
    </html>
  )
}
