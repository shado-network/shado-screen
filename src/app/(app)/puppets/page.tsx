import { Spacer } from '@heroui/react'
import type { Metadata } from 'next'

import PuppetsTable from './PuppetsTable'

export const metadata: Metadata = {
  title: 'Puppets | Shadō Screen',
}

export default function Puppets() {
  return (
    <section className="container mx-auto p-12">
      <h1 className="text-2xl font-semibold text-white">Puppets</h1>
      <p className="text-neutral-400">Your connected shado-puppets.</p>

      <Spacer y={6} />

      <PuppetsTable />
    </section>
  )
}
