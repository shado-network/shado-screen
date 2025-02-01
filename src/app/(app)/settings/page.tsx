import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings | Shadō Screen',
}

export default function Settings() {
  return (
    <section className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-white">Settings</h1>
      <p className="text-stone-400">Lorem ipsum dolor sit amet.</p>
    </section>
  )
}
