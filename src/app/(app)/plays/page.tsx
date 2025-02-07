import { Spacer } from '@heroui/react'
import type { Metadata } from 'next'

import PlaysTable from './PlaysTable'

export const metadata: Metadata = {
  title: 'Plays | Shadō Screen',
}

export default function Plays() {
  return (
    <section className="container mx-auto p-12">
      <h1 className="text-2xl font-semibold text-white">Plays</h1>
      <p className="text-neutral-400">Your connected shado-play swarms.</p>

      <Spacer y={6} />

      <PlaysTable />
    </section>
  )
}
