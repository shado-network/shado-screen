import type { Metadata } from 'next'
import PuppetDetailsHtnTab from './tabs/PuppetDetailsHtnTab'
import { getPuppetByIdentifier } from '../../logic'

export const metadata: Metadata = {
  title: 'Puppet Details | Shadō Screen',
}

type PuppetDetailsProps = {
  params: Promise<{ identifier: string }>
}

export default async function PuppetDetails({ params }: PuppetDetailsProps) {
  const puppetIdentifier = (await params).identifier

  const puppet = await getPuppetByIdentifier(puppetIdentifier)

  return (
    <section className="container mx-auto p-12">
      <h1 className="text-xl font-semibold uppercase text-white">
        Puppet / {puppet.identifier || '...'}
      </h1>
      <p className="text-neutral-400">Insights into a shado-puppet instance.</p>
      {/* TODO: Tabs */}
      <PuppetDetailsHtnTab puppet={puppet} />
    </section>
  )
}
