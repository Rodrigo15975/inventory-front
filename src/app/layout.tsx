import { ProviderQueryClient } from '@/provider/QueryClient'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import NextTopLoader from 'nextjs-toploader'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader
          color="#10B981"
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={500}
          zIndex={999999999}
          showAtBottom={false}
        />
        <ProviderQueryClient>
          {children}
          <Toaster />
        </ProviderQueryClient>
      </body>
    </html>
  )
}
