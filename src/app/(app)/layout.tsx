import NavHeader from '@/ui/components/NavHeader'

type AppLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function AppLayout(props: AppLayoutProps) {
  return (
    <main>
      <NavHeader />
      {props.children}
    </main>
  )
}
