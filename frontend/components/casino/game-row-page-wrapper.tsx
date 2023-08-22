"use client"

import React, { useState, useEffect } from 'react';
import { GameRow } from "@/components/casino/game-row"
import { gameRows } from "@/config/site"
import { RecentGames } from "@/components/casino/recent-games"
import { useGamedata } from '@/hooks/gamedata'

export default function GameRowsWrapper() {
	return (
		<div className="container relative">
		<section className="flex w-full items-center my-5">
			<div className="overflow-hidden">
					<GameRow
						key={"gamerow-popular"}
						gamesKey={"popular"}
						headerTitle="Highlight"
						imageType={"s3"}
						subHeader="Check out your personalized game recommendations."
					/>
				<RecentGames />

				<GamesMap />
			</div>
		</section>
		</div>
  )
}


export function GamesMap() {
return (
	<div className="overflow-hidden">
	{gameRows.map((game) => (
		<div 
		  key={"gamerow-"+game.gameKey}
		> 
		  <GameRow
		  	key={"gamerow-"+game.gameKey}
			gamesKey={game.gameKey}
			imageType={game.imageType}
			headerTitle={game.header}
			subHeader={game.subHeader}
		  />
		</div>
		))
	  }
	  </div>
);

}