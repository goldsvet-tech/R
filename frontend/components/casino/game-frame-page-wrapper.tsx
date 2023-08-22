"use client"

import React, { useState, useEffect } from 'react';
import { GameRow } from "@/components/casino/game-row"
import { gameRows } from "@/config/site"

export default function GameFrameRowsWrapper() {
	return (
		<div className="container relative">
		<section className="flex w-full items-center my-5 ">
			<div className="overflow-hidden">
				<GamesFrameMap />
			</div>
		</section>
		</div>
  )
}


export function GamesFrameMap() {
    const [gameKey, setGameKey] = useState('popular');
    const [subHeader, setSubHeader] = useState('Play similar games.');
    const [headerTitle, setHeaderTitle] = useState('Related Games');
    const [imageType, setImageType] = useState('s3');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search) // id=123
        if(params.get('provider')) {
			gameRows.forEach(function(game) {
				if(game.gameKey === 'provider_'+params.get('provider')) {
					setGameKey('provider_'+params.get('provider'));
				}
			});

        } else {
			setGameKey('popular');
        }
      }, [])

return (
	<div className="overflow-hidden">
		<div 
			key={"gamerow-gameframepage-"+gameKey}
		> 
		  <GameRow 
		  	key={"gamerow-gameframepage-"+gameKey}
			gamesKey={gameKey}
			imageType={imageType}
			headerTitle={headerTitle}
			subHeader={subHeader}
		  />
		</div>
	  </div>
);

}