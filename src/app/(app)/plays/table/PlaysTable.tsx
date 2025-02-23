'use client'

import { useCallback } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import BaseTable from '@/components/BaseTable'
import type { BaseTableColumn } from '@/components/BaseTable'

import {
  PlayActionsCell,
  PlayDataCell,
  PlayStatusCell,
} from './PlaysTableCells'

import { getPlays } from '../logic'

const columns: BaseTableColumn[] = [
  {
    id: 'play',
    label: 'Play',
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

export default function PlaysTable() {
  const queries = {
    plays: useQuery({
      queryKey: ['plays'],
      queryFn: () => getPlays(),
      // enabled: true,
      // placeholderData: keepPreviousData,
    }),
  }

  const renderCell = useCallback((item: any, columnKey: string) => {
    const cellValue = item[columnKey]

    switch (columnKey) {
      case 'play':
        return <PlayDataCell play={item} />
      case 'status':
        return <PlayStatusCell play={item} />
      case 'actions':
        return <PlayActionsCell play={item} />
      default:
        return cellValue
    }
  }, [])

  return (
    <BaseTable
      rows={queries.plays.data || []}
      columns={columns}
      renderCell={renderCell}
      //
      ariaLabel="Shadō Plays collection"
      emptyContent="No shado-plays to display."
    />
  )
}

//
