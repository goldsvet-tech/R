"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function PromoVideo() {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="overflow-hidden rounded-lg border bg-white shadow-xl"
    >
      <video autoPlay muted playsInline>
        <source
          src="/examples/headvideo-bastet.mp4"
          type="video/mp4"
        />
      </video>
    </AspectRatio>
  )
}
