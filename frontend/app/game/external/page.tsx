import * as React from 'react';
import { StyleSwitcher } from "@/components/style-switcher"
import { Gameiframe } from "@/components/casino/game-frame"
import GameFrameRowsWrapper from "@/components/casino/game-frame-page-wrapper"

export default function ExternalGamePage() {
  return (
    <div className="container relative my-4">
    <StyleSwitcher />
    <section className="flex w-full items-center my-4 md:my-8">
          <Gameiframe />
      </section>
      <section className="flex w-full items-center gap-6">
          <GameFrameRowsWrapper />
      </section>
     </div>
  )
}



