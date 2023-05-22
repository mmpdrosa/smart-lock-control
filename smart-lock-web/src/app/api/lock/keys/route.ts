import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST() {
  const lockCode = await prisma.lockCode.create({
    data: {
      code: new Date().toISOString(),
      expiresIn: dayjs().add(1, 'h').toDate(),
    },
  })

  return NextResponse.json(lockCode)
}

export async function GET() {
  const lockCodes = await prisma.lockCode.findMany()

  return NextResponse.json(lockCodes)
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { error: 'The code was not provided.' },
      { status: 400 },
    )
  }

  const lockCode = await prisma.lockCode.findUnique({ where: { code } })

  if (!lockCode) {
    return NextResponse.json(
      { error: 'The provided code does not exist.' },
      { status: 404 },
    )
  }

  if (lockCode.isRead) {
    return NextResponse.json(
      { error: 'The provided code has already been read.' },
      { status: 409 },
    )
  }

  await prisma.lockCode.update({
    where: { id: lockCode.id },
    data: { isRead: true },
  })

  return NextResponse.json(
    { message: 'Lock code successfully marked as read.' },
    { status: 200 },
  )
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { error: 'The code was not provided.' },
      { status: 400 },
    )
  }

  const lockCode = await prisma.lockCode.findUnique({ where: { code } })

  if (!lockCode) {
    return NextResponse.json(
      { error: 'The provided code does not exist.' },
      { status: 404 },
    )
  }

  await prisma.lockCode.delete({ where: { code } })

  return NextResponse.json({}, { status: 200 })
}
