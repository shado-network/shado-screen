import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Puppets | Shadō Screen',
}

export default function Puppets() {
  return (
    <section className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-white">Puppets</h1>
      <p className="text-stone-400">Your connected shado-puppets.</p>
    </section>
  )
}
