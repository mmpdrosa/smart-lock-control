import Image from 'next/image'
import QRCode from 'qrcode'
import * as React from 'react'

interface ImageViewProps {
  text: string
}

export async function ImageView({ text }: ImageViewProps) {
  const imageUrl = await QRCode.toDataURL(text, { width: 400 })

  return (
    <div className="relative aspect-square w-screen md:w-96">
      <Image src={imageUrl} fill alt="" />
    </div>
  )
}
