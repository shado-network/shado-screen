import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plays | Shadō Screen',
}

export default function Plays() {
  return (
    <section className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-white">Plays</h1>
      <p className="text-stone-400">Your connected shado-play swarms.</p>
    </section>
  )
}
