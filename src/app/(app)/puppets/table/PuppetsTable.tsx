'use client'

import { useCallback } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import BaseTable from '@/ui/components/BaseTable'
import type { BaseTableColumn } from '@/ui/components/BaseTable'

import {
  PuppetActionsCell,
  PuppetDataCell,
  PuppetStatusCell,
} from './PuppetTableCells'

import { getPuppets } from '../logic'

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
  {
    id: 'actions',
    label: 'Actions',
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
      case 'actions':
        return <PuppetActionsCell puppet={item} />
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
