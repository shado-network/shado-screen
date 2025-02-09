'use client'

import { useRouter } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HeroUIProvider } from '@heroui/react'

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

export function Providers(props: ProvidersProps) {
  const router = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        {/*  */}
        {props.children}
        {/*  */}
      </HeroUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
