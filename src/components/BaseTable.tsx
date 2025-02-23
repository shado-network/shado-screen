'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react'

export type BaseTableColumn = {
  id: string
  label: string
  align: 'start' | 'center' | 'end'
}

type BaseTableProps = {
  rows: any[]
  columns: BaseTableColumn[]
  renderCell: (item: any, columnKey: string) => any
  //
  ariaLabel: string
  emptyContent: string
}

export default function BaseTable(props: BaseTableProps) {
  return (
    <Table
      // removeWrapper
      hideHeader
      //
      aria-label={props.ariaLabel}
    >
      <TableHeader columns={props.columns}>
        {(column) => (
          <TableColumn
            key={column.id}
            align={column.align ? column.align : 'start'}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={props.rows} emptyContent={props.emptyContent}>
        {(row) => (
          <TableRow key={row.identifier}>
            {(columnKey) => (
              <TableCell>
                {props.renderCell(row, columnKey as string)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
