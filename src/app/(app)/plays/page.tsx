import { Spacer } from '@heroui/react'
import type { Metadata } from 'next'

import PlaysTable from './table/PlaysTable'
import AddPlayModal from './modals/AddPlayModal'

export const metadata: Metadata = {
  title: 'Plays | Shadō Screen',
}

export default function Plays() {
  return (
    <section className="container mx-auto p-12">
      <div className="flex">
        <div className="flex-1">
          <h1 className="text-xl font-semibold uppercase text-white">Plays</h1>
          <p className="text-neutral-400">Your connected shado-play swarms.</p>
        </div>
        <div className="flex items-center">
          <AddPlayModal />
        </div>
      </div>

      <Spacer y={6} />

      <PlaysTable />
    </section>
  )
}
