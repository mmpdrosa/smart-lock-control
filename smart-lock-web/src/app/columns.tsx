'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Check, X } from 'lucide-react'

import { DataTableRowActions } from './data-table-row-actions'

export type LockCode = {
  code: string
  isRead: boolean
  expiresIn: Date
}

export const columns: ColumnDef<LockCode>[] = [
  {
    accessorKey: 'code',
    header: 'Código',
  },
  {
    accessorKey: 'isRead',
    header: 'Status',
    cell: ({ row }) => {
      const isRead = row.getValue('isRead')

      return (
        <div>
          {isRead ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </div>
      )
    },
  },
  {
    accessorKey: 'expiresIn',
    header: 'Válidade',
    cell: ({ row }) => {
      const expiresIn = new Date(row.getValue('expiresIn'))

      const formatted = format(expiresIn, "dd/MM/yyyy 'às' hh:mm")

      return <div>{formatted}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
