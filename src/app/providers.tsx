'use client'

import { useRouter } from 'next/navigation'
import { HeroUIProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// declare module '@react-types/shared' {
//   interface RouterConfig {
//     routerOptions: NonNullable<
//       Parameters<ReturnType<typeof useRouter>['push']>[1]
//     >
//   }
// }

const queryClient = new QueryClient()

type ProvidersProps = Readonly<{
  children: React.ReactNode
}>

export function Providers({ children }: ProvidersProps) {
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        {/*  */}
        {children}
        {/*  */}
      </HeroUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
