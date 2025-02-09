import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings | Shadō Screen',
}

export default function Settings() {
  return (
    <section className="container mx-auto p-12">
      <h1 className="text-xl font-semibold uppercase text-white">Settings</h1>
      <p className="text-neutral-400">Lorem ipsum dolor sit amet.</p>
    </section>
  )
}
