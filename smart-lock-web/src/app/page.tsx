import { DataTable } from '@/components/data-table'
import { prisma } from '@/lib/prisma'
import { LockCode, columns } from './columns'
import { NewCodeButton } from '@/components/new-code-button'

export default async function Home() {
  async function getLockCodes(): Promise<LockCode[]> {
    const lockCodes = await prisma.lockCode.findMany({
      select: { id: true, code: true, isRead: true, expiresIn: true },
    })

    return lockCodes
  }

  const lockCodes = await getLockCodes()

  return (
    <div className="container mx-auto space-y-10 py-10">
      <div className="flex justify-center">
        <NewCodeButton />
      </div>

      <DataTable columns={columns} data={lockCodes} />
    </div>
  )
}
