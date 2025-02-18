'use client'

import { Tabs, Tab } from '@heroui/react'

import PuppetDetailsHtnTab from './PuppetDetailsHtnTab'
import { PuppetDTO } from '../../../logic'

type PuppetDetailsTabsProps = {
  puppet: PuppetDTO | null
}

export default function PuppetDetailsTabs(props: PuppetDetailsTabsProps) {
  return (
    <Tabs aria-label="Puppet details tabs" className="mt-6">
      <Tab key="sandbox" title="SANDBOX">
        <span className="uppercase">Coming soon...</span>
      </Tab>
      <Tab key="htn" title="PLANNER">
        <PuppetDetailsHtnTab puppet={props.puppet} />
      </Tab>
    </Tabs>
  )
}
