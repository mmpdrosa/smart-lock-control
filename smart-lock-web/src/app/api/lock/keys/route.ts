import { addHours } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST() {
  const lockCode = await prisma.lockCode.create({
    data: {
      code: new Date().toISOString(),
      expiresIn: addHours(new Date(), 1),
    },
  })

  return NextResponse.json(lockCode)
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return new NextResponse('The code was not provided.', { status: 400 })
  }

  const lockCode = await prisma.lockCode.findUnique({ where: { code } })

  if (!lockCode) {
    return new NextResponse('The provided code does not exist.', {
      status: 404,
    })
  }

  if (lockCode.isRead) {
    return new NextResponse('The provided code has already been read.', {
      status: 409,
    })
  }

  await prisma.lockCode.update({
    where: { id: lockCode.id },
    data: { isRead: true },
  })

  return new NextResponse(null, { status: 200 })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return new NextResponse('The code was not provided.', { status: 400 })
  }

  const lockCode = await prisma.lockCode.findUnique({ where: { code } })

  if (!lockCode) {
    return new NextResponse('The provided code does not exist.', {
      status: 404,
    })
  }

  await prisma.lockCode.delete({ where: { code } })

  return new NextResponse(null, { status: 200 })
}
