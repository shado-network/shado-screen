'use client'

import { useCallback } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Avatar, Chip } from '@heroui/react'
import type { ChipProps } from '@heroui/react'

import BaseTable from '@/ui/components/BaseTable'

import {
  getPlays,
  // getPlaysData,
  // getPlaysHealth
} from './logic'
import type { PlayDTO } from './logic'
import type { BaseTableColumn } from '@/ui/components/BaseTable'

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

type PlayDataCellProps = {
  play: PlayDTO
}

function PlayDataCell(props: PlayDataCellProps) {
  const queries = {
    playData: useQuery({
      queryKey: ['play', props.play.identifier, 'data'],
      queryFn: () => ({}) as any,
      // queryFn: () => getPlayData(props.play),
      // enabled: true,
      // placeholderData: keepPreviousData,
    }),
  }

  return (
    <div className="flex gap-3">
      <div>
        <Avatar
          name={queries.playData.data?.data?.play.name || props.play.identifier}
          src={queries.playData.data?.data?.play.image}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-md text-white">
          {queries.playData.data?.data?.play.name || props.play.identifier}
        </span>
        <span className="text-sm text-neutral-500">{props.play.url}</span>
        {/* <span>{play.key}</span> */}
      </div>
    </div>
  )
}

//

type PlayStatusCellProps = {
  play: PlayDTO
}

function PlayStatusCell(props: PlayStatusCellProps) {
  const queries = {
    playHealth: useQuery({
      queryKey: ['play', props.play.identifier, 'health'],
      queryFn: () => ({}) as any,
      // queryFn: () => getPlayHealth(props.play),
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
  const playStatus =
    queries.playHealth.data?.timestamp >= Date.now() - 1 * 60 * 1000
      ? 'online'
      : 'offline'

  return (
    <Chip
      className="uppercase"
      color={statusColorMap[playStatus || 'offline']}
      size="sm"
      variant="flat"
    >
      {playStatus || 'offline'}
    </Chip>
  )
}
