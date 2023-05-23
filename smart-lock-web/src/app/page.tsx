'use client'

import * as React from 'react'
import Image from 'next/image'
import QRCode from 'qrcode'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

interface LockCode {
  id: string
  code: string
  isRead: boolean
  createdAt: string
  expiresIn: string
}

export default function Home() {
  const [imageUrl, setImageUrl] = React.useState('')
  const [lockCodes, setLockCodes] = React.useState<LockCode[]>([])

  const handleCreateLockCode = async () => {
    const response = await fetch('/api/lock/keys', {
      method: 'POST',
    })

    const lockCode = await response.json()

    const qrCodeUrl = await QRCode.toDataURL(lockCode.code, {
      width: 400,
    })

    setImageUrl(qrCodeUrl)
  }

  React.useEffect(() => {
    const fetchCodes = async () => {
      const response = await fetch('/api/lock/keys', {
        method: 'GET',
      })

      const lockCodes: LockCode[] = await response.json()

      setLockCodes(lockCodes)
    }

    fetchCodes()
  }, [imageUrl])

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-96 w-96 self-center">
          {imageUrl && <Image src={imageUrl} fill alt="" />}
        </div>
        <Button onClick={handleCreateLockCode}>Gerar Código</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Criação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lockCodes.map((lockCode) => (
            <TableRow key={lockCode.id}>
              <TableCell>{lockCode.code}</TableCell>
              <TableCell>{String(lockCode.isRead)}</TableCell>
              <TableCell>{lockCode.expiresIn}</TableCell>
              <TableCell>{lockCode.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
