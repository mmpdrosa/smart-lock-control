'use client'

import { useRouter } from 'next/navigation'

import { Button } from './ui/button'

export function NewCodeButton() {
  const router = useRouter()

  const handleCreateLockCode = async () => {
    await fetch('/api/lock/keys', {
      method: 'POST',
    })

    router.refresh()
  }

  return <Button onClick={handleCreateLockCode}>Gerar Código</Button>
}
