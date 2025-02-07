'use client'

import { useCallback } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react'
import { Chip, User } from '@heroui/react'
import type { ChipProps } from '@heroui/react'

// NOTE: Stub data.
import puppets from '@/data/stub/puppets.json'
import puppetUrls from '@/data/stub/puppetUrls.json'

type PuppetData = {
  id: string
  name: string
  image: string
  url: string
  //
  status: 'online' | 'offline'
}

const rows = [...puppets]

type Column = {
  uid: string
  name: string
  align: 'start' | 'center' | 'end'
}

const columns: Column[] = [
  {
    uid: 'puppet',
    name: 'Puppet',
    align: 'start',
  },
  {
    uid: 'status',
    name: 'Status',
    align: 'end',
  },
]

export default function PuppetsTable() {
  const renderCell = useCallback(
    (puppet: PuppetData, columnKey: keyof PuppetData & 'puppet') => {
      const cellValue = puppet[columnKey]

      switch (columnKey) {
        case 'puppet':
          return (
            <User
              name={puppet.name}
              description={puppet.url}
              avatarProps={{ radius: 'full', src: puppet.image }}
            >
              {puppet.name}
            </User>
          )
        case 'status':
          const statusColorMap: {
            [key: string]: ChipProps['color']
          } = {
            online: 'success',
            offline: 'danger',
          }

          return (
            <Chip
              className="capitalize"
              color={statusColorMap[puppet.status || 'offline']}
              size="sm"
              variant="flat"
            >
              {puppet.status || 'offline'}
            </Chip>
          )
        default:
          return cellValue
      }
    },
    [],
  )

  return (
    <Table
      // removeWrapper
      hideHeader
      aria-label="Shadō Puppets collection"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.align ? column.align : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={rows as PuppetData[]}
        emptyContent={'No shado-puppets to display.'}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof PuppetData & 'puppet')}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
