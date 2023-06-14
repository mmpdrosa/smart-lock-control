'use client'

import { Row } from '@tanstack/react-table'
import { Loader2, MoreHorizontal, QrCode, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { z } from 'zod'

import { ImageView } from '@/components/image-view'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const lockCodeSchema = z.object({
  id: z.string(),
  code: z.string(),
  isRead: z.boolean(),
  expiresIn: z.date(),
})

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const router = useRouter()

  const lockCode = lockCodeSchema.parse(row.original)

  const handleDeleteLockCode = async (code: string) => {
    await fetch(`/api/lock/keys?code=${code}`, {
      method: 'DELETE',
    })

    router.refresh()
  }

  return (
    <Dialog>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setDropdownOpen(false)}>
              <QrCode className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Visualizar
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDeleteLockCode(lockCode.code)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="flex justify-center">
        <React.Suspense
          fallback={
            <div className="flex h-96 w-96 items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          }
        >
          {/* @ts-expect-error Server Component */}
          <ImageView text={lockCode.code} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  )
}
