import NavHeader from '@/ui/components/NavHeader'

type AppLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <main>
      <NavHeader />
      {children}
    </main>
  )
}
