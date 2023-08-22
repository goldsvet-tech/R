import * as React from 'react';
import { StyleSwitcher } from "@/components/style-switcher"
import GameRowsWrapper from "@/components/casino/game-row-page-wrapper"

export default function IndexPage() {
  
  return (
    <div className="container">
        <StyleSwitcher />
        <div className="flex w-full items-center gap-6 py-2">
          <GameRowsWrapper />
        </div>
     </div>
  )
}



