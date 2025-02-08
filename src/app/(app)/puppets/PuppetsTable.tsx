'use client'

import { useCallback } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Avatar, Chip } from '@heroui/react'
import type { ChipProps } from '@heroui/react'

import BaseTable from '@/ui/components/BaseTable'

import { getPuppets, getPuppetData, getPuppetHealth } from './logic'
import type { PuppetDTO } from './logic'
import type { BaseTableColumn } from '@/ui/components/BaseTable'

const columns: BaseTableColumn[] = [
  {
    id: 'puppet',
    label: 'Puppet',
    align: 'start',
  },
  {
    id: 'status',
    label: 'Status',
    align: 'end',
  },
]

export default function PuppetsTable() {
  const queries = {
    puppets: useQuery({
      queryKey: ['puppets'],
      queryFn: () => getPuppets(),
      // enabled: true,
      // placeholderData: keepPreviousData,
    }),
  }

  const renderCell = useCallback((item: any, columnKey: string) => {
    const cellValue = item[columnKey]

    switch (columnKey) {
      case 'puppet':
        return <PuppetDataCell puppet={item} />
      case 'status':
        return <PuppetStatusCell puppet={item} />
      default:
        return cellValue
    }
  }, [])

  return (
    <BaseTable
      rows={queries.puppets.data || []}
      columns={columns}
      renderCell={renderCell}
      //
      ariaLabel="Shadō Puppets collection"
      emptyContent="No shado-puppets to display."
    />
  )
}

//

type PuppetDataCellProps = {
  puppet: PuppetDTO
}

function PuppetDataCell(props: PuppetDataCellProps) {
  const queries = {
    puppetData: useQuery({
      queryKey: ['puppet', props.puppet.identifier, 'data'],
      queryFn: () => getPuppetData(props.puppet),
      // enabled: true,
      // placeholderData: keepPreviousData,
    }),
  }

  return (
    <div className="flex gap-3">
      <div>
        <Avatar
          name={
            queries.puppetData.data?.data?.puppet.name ||
            props.puppet.identifier
          }
          src={queries.puppetData.data?.data?.puppet.image}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-md text-white">
          {queries.puppetData.data?.data?.puppet.name ||
            props.puppet.identifier}
        </span>
        <span className="text-xs text-neutral-500">{props.puppet.url}</span>
        {/* <span>{puppet.key}</span> */}
      </div>
    </div>
  )
}

//

type PuppetStatusCellProps = {
  puppet: PuppetDTO
}

function PuppetStatusCell(props: PuppetStatusCellProps) {
  const queries = {
    puppetHealth: useQuery({
      queryKey: ['puppet', props.puppet.identifier, 'health'],
      queryFn: () => getPuppetHealth(props.puppet),
      // enabled: true,
      // placeholderData: keepPreviousData,
      //
      // NOTE: Check every minute.
      refetchInterval: 1 * 60 * 1000,
    }),
  }

  const statusColorMap: {
    [key: string]: ChipProps['color']
  } = {
    online: 'success',
    offline: 'danger',
  }

  // NOTE: Check if ping reply is more recent than 1 minute ago.
  const puppetStatus =
    queries.puppetHealth.data?.timestamp >= Date.now() - 1 * 60 * 1000
      ? 'online'
      : 'offline'

  return (
    <Chip
      className="capitalize"
      color={statusColorMap[puppetStatus || 'offline']}
      size="sm"
      variant="flat"
    >
      {puppetStatus || 'offline'}
    </Chip>
  )
}
