import { Spacer } from '@heroui/react'
import type { Metadata } from 'next'

import PuppetsTable from './table/PuppetsTable'
import AddPuppetModal from './modals/AddPuppetModal'

export const metadata: Metadata = {
  title: 'Puppets | Shadō Screen',
}

export default function Puppets() {
  return (
    <section className="container mx-auto p-12">
      <div className="flex">
        <div className="flex-1">
          <h1 className="text-xl font-semibold uppercase text-white">
            Puppets
          </h1>
          <p className="text-neutral-400">Your connected shado-puppets.</p>
        </div>
        <div className="flex items-center">
          <AddPuppetModal />
        </div>
      </div>

      <Spacer y={6} />

      <PuppetsTable />
    </section>
  )
}
