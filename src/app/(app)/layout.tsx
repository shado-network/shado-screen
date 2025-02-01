import Header from '@/ui/components/Header'

type AppLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}
