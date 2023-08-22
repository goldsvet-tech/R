"use client"

import Deck from './blackjack-deck';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import globalStyles from './blackjack-css.tsx';
import { Centrifuge } from "centrifuge";
import { useAuth } from "@/hooks/auth"
import { setRevalidateHeaders } from 'next/dist/server/send-payload';
import { Progress } from "@/components/ui/progress"

export function BlackjackComponent() {
  const [count, setCount] = useState(0);
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);
  const [wallet, setWallet] = useState(100);
  const [currentBet, setCurrentBet] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTurn, setGameTurn] = useState("");
  const [dealerCardDraws, setDealerCardDraws] = useState(0);
  const [dealerWon, setDealerWon] = useState(false);
  const [playerWon, setPlayerWon] = useState(false);
  const [websocketState, setWebsocketState] = useState("");
  const [websocketDataEvent, setWebsocketDataEvent] = useState([]);
  const [websocketNewDataEvent, setWebsocketNewDataEvent] = useState([]);
  const [websocketDataNew, setWebsocketDataNew] = useState([]);
  const [gameState, setGameState] = useState("");
  const [playerOptionOpen, setPlayerOptionOpen] = useState(false);
  const [playerOptions, setPlayerOptions] = useState([]);
  const [hitOptionAvailable, setHitOptionAvailable] = useState(false);
  const [standOptionAvailable, setStandOptionAvailable] = useState(false);
  const [doubleOptionAvailable, setDoubleOptionAvailable] = useState(false);
  const [playerNewCards, setPlayerNewCards] = useState([]);
  const [dealerNewCards, setDealerNewCards] = useState([]);
  const [roundId, setRoundId] = useState("");
  const [placeBetState, setPlaceBetState] = useState(false);
  const [roomMainStateInt, setRoomMainStateInt] = useState(0);
  const [roomMainStateDesc, setRoomMainStateDesc] = useState("");
  const [roomSubStateInt, setRoomSubStateInt] = useState(0);
  const [roomSubStateDesc, setRoomSubStateDesc] = useState("");
  const [progessValueBar, setProgressValueBar] = useState(0);

  
  

  const waitDealerDrawing = () => new Promise((resolve) => setTimeout(resolve, (Math.floor(Math.random() * (999 - 800) ) + 800)));
  const startNewGameDraw = () => new Promise((resolve) => setTimeout(resolve, (Math.floor(Math.random() * (999 - 800) ) + 800)));
  const { user } = useAuth({
    middleware: 'guest',
  })
 

  useEffect(() => {
    if(dealerNewCards.length !== 0) {
      if(dealerNewCards !== dealerHand) {
        const newCardDealer = [...dealerNewCards];
        setDealerHand(newCardDealer);
      }
    }
  }, [dealerNewCards])
  
  useEffect(() => {
    if(playerNewCards.length !== 0) {
      if(playerNewCards !== playerHand) {
        const newCardPlayer = [...playerNewCards];
        setPlayerHand(newCardPlayer);
      }
    }
  }, [playerNewCards])

  useEffect(() => {
      if(playerOptions.hit) {
        if(playerOptions.hit === "open") {
          setHitOptionAvailable(true);
        } else {
          setHitOptionAvailable(false);
        }
      } else {
        setHitOptionAvailable(false);
      }
      if(playerOptions.stand) {
        if(playerOptions.stand === "open") {
          setStandOptionAvailable(true);
        } else {
          setStandOptionAvailable(false);
        }
      } else {
        setStandOptionAvailable(false);
      }
      if(playerOptions.double) {
        if(playerOptions.double === "open") {
          setDoubleOptionAvailable(true);
        } else {
          setDoubleOptionAvailable(false);
        }
      } else {
        setDoubleOptionAvailable(false);
      }
  }, [playerOptions]);

useEffect(() =>  {
    console.log("State: " + roomMainStateInt)
    if(roomMainStateInt === 0) {
      setMessage("Game starting soon.");
    }

    if(roomMainStateInt === 1) {
      setPlaceBetState(true);
    } else {
      setPlaceBetState(false);
    }
}, [roomMainStateInt, roomSubStateInt]);
useEffect(() => {
  const timer = setTimeout(() => setProgressValueBar(66), 500)
  return () => clearTimeout(timer)
}, [])

useEffect(() =>  {
  console.log("Sub State: " + roomSubStateInt)
 

  
  if(roomSubStateInt) {
    const calculateValue = (100 / (roomSubStateInt * 2));
    setProgressValueBar(calculateValue)
  }
}, [roomSubStateInt]);



useEffect(() =>  {
  if(placeBetState) {
    setMessage("Place your bets.");
  }
}, [placeBetState]);

  useEffect(() => {

        if(websocketNewDataEvent.state_1) {
          setRoomMainStateInt(websocketNewDataEvent.state_1.int);
          setRoomMainStateDesc(websocketNewDataEvent.state_1.desc);
        }
        if(websocketNewDataEvent.state_2) {
          setRoomSubStateInt(websocketNewDataEvent.state_2.int);
          setRoomSubStateDesc(websocketNewDataEvent.state_2.desc);
        }
        if(roundId !== websocketNewDataEvent.round_id) {
          setRoundId(websocketNewDataEvent.round_id);
        }

        if(websocketNewDataEvent.typde) {
          
          if(websocketNewDataEvent.state_1.desc === "PLACE_BETS") {
              setPlaceBetState(true);
              startNewGame();
          }
          if(websocketNewDataEvent.message.action === "playerOption") {
            websocketNewDataEvent.message.state === "open" ? setPlayerOptionOpen(true) : setPlayerOptionOpen(false);
            websocketNewDataEvent.message.options ? setPlayerOptions(websocketNewDataEvent.message.options) :  setPlayerOptions([]);
          }
          if(websocketNewDataEvent.message.action === "playerOptionTrigger") {
            if(websocketNewDataEvent.message.state === "playerHit") {
              hit();
            }
            if(websocketNewDataEvent.message.state === "playerDouble") {
              hit();
            }
            if(websocketNewDataEvent.message.state === "playerStand") {
              stand();
            }
        }
      }
  }, [websocketNewDataEvent]);

  useEffect(() => {
    if(user) {
      setWebsocketState("connecting");
      if(websocketState !== "connected") {
      const client = new Centrifuge(
        "wss://"+process.env.NEXT_PUBLIC_WEBSOCKET+"/connection/websocket",
        {
          token: user.websocket.auth.auth_key,
        }
      );
      
      client.on("connected", function (ctx) {
        setWebsocketState("connected");
        console.log("Connected to websocket..");
      });

      client.on("disconnected", function (ctx) {
        setWebsocketState("disconnected");
        console.log("Disconnected to websocket..");
      });

      client.on("error", function (ctx) {
        setWebsocketState("error");
        console.log(ctx);
      });
      
      client.on('publication', function(ctx) {
        const channel = ctx.channel;
        const payload = JSON.stringify(ctx.data);


        if(ctx.data.type === "room-event") {
          console.log('table: ', channel, payload);
          if(ctx.data !== websocketNewDataEvent) {
            setWebsocketNewDataEvent(ctx.data);
          }

          if(ctx.data.cards) {
              setPlayerNewCards(ctx.data.cards.player);
              setDealerNewCards(ctx.data.cards.dealer);
          }
        }
    });
    
		client.connect();
    }

		/*
    authChannel.on('publication', function(ctx) {
        console.log(ctx.data);
        if(ctx.data?.type) {
          if(ctx.data.type === "alert") {
            setNewAlertMessage(ctx.data.message);
          }
          if(ctx.data.type === "poker") {
            setNewPokerData(ctx.data.message);
          }
        }
      });
		
		authChannel.presenceStats().then(function(ctx) {
			console.log(ctx.numClients);
		}, function(err) {
				// presence stats call failed with error
		});
		*/
  }
  }, [user]);

  enum Messages {
    oom = 'Insufficient funds.',
    yl = 'You lose.',
    yw = 'You win.',
    dealer_bust = 'Dealer busted.',
    place_bet = 'Please place your bets.',
    draw = 'Draw', 
    diamonds = '♦',
    clubs = '♣',
    hearts = '♥',
    spades = '♠'
  }
  const placeBet = (e) => {
    const value = parseInt(e.currentTarget.getAttribute("data-value"));

    if (value > wallet) {
      setMessage(Messages.oom);
    } else {
      setCurrentBet(currentBet + Number(value));
      setWallet(wallet - value);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  
  const generateDeck = () => {
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "q", "k", "a"];
    const suits = ["diams", "clubs", "hearts", "spades"];
    const deck = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        deck.push({ number: cards[i], suit: suits[j], isFirst: false });
      }
    }
    console.log(deck);
    return deck;
  };
  const endGame = () => {
    const dealerFinalHand = [...dealerHand];
    dealerFinalHand[0].isFirst = false;
    setDealerHand(dealerFinalHand);
    setGameStarted(false);
    let playerHasWon = false;
    if (playerCount > 21) {
      setDealerWon(true);

      setMessage(Messages.yl);
      if (wallet < 0) {
        setWallet(0);
        setMessage(Messages.oom);
      }
    } else if (dealerCount > 21) {
      setMessage("You win");
      if (!playerHasWon) {
        setWallet(wallet + currentBet + currentBet);
        playerHasWon = true;
        setPlayerWon(true);
      }
      if (wallet < 0) {
        setWallet(0);
        setMessage(Messages.oom);
      }
      return;
    } else if (playerCount > dealerCount) {
      setMessage(Messages.yw);

      if (!playerHasWon) {
        setWallet(wallet + currentBet + currentBet);
        playerHasWon = true;
        setPlayerWon(true);
      }
      if (wallet < 0) {
        setWallet(0);
        setMessage(Messages.oom);
      }
      return;
    } else if (playerCount < dealerCount) {
      setMessage(Messages.yl);
      setDealerWon(true);
      if (wallet < 0) {
        setWallet(0);
        setMessage(Messages.oom);
      }
      return;
    } else {
      setMessage(Messages.draw);
    }
  };
  const hit = () => {
    if(playerOptionOpen) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/northplay/game/blackjack/action");
        xhttp.send(JSON.stringify({
            state: "hit",
            game: "blackjack",
            rid: ridNumber
        }));
    }
  };
  const stand = () => {
      if(playerOptionOpen) {
          
      }
  };

  useEffect(() => {
    if (gameOver) {
      endGame();
      setCurrentBet(0);
      setGameTurn("");
      return;
    }
  }, [gameOver]);

  useEffect(() => {
    if(!gameOver) {
    if(gameTurn === "dealer") {
      if (dealerCount < 17) {
          const dealerCard1 = getRandomCard(deck);
          const dealerNewHand = [...dealerHand, dealerCard1.randomCard];
          setDeck(dealerCard1.updatedDeck);
          setDealerHand(dealerNewHand);
      } else {
          setGameOver(true)
      }
      waitDealerDrawing().then(() => 
          setDealerCardDraws(dealerHand.length)
      );
    }
  }
  }, [gameTurn, dealerCardDraws]);

  const calculateScore = (hand) => {
    let score = 0;
    let numAces = 0;

    for (let card of hand) {
      // Get the value of the card (Ace is worth 1 by default)
      let value = 0;

      if (isNaN(card.number)) {
        // Face cards and 10
        if (["j", "q", "k"].includes(card.number)) {
          value = 10;
        } else if (card.number === "a") {
          value = 1;
          numAces++;
        }
      } else {
        value = Number(card.number);
      }

      score += value;
    }

    // Handle Aces
    while (numAces > 0 && score + 10 <= 21) {
      score += 10;
      numAces--;
    }

    return score;
  };
  const cardSize = 'text-[1.85em] md:text-[1.75em] lg:text-[1.95em] xl:text-[2.05em]';
  const cardSizeInnerValue = 'text-[1.1em] md:text-[1em] lg:text-[0.95em]';
  const cardSizeInnerSuit = 'text-[0.8em] md:text-[0.90em]';

  const CardRender = ({suited, value, indexed}) => {
    return (
      <li>
          <span
          className={`singlePlayingCard ${cardSize} rank-${value} ${suited} }`}
          >
          <span className="rank uppercase">
              <span className={`text ${cardSizeInnerValue}`}>
                {value}
              </span>
            </span>
            {(suited === 'clubs') && (
                <span className={`suit`}><span className={` ${cardSizeInnerSuit}`}>&clubs;</span></span>
            )}
            {(suited === 'spades') && (
                <span className={`suit ${cardSizeInnerSuit}`}>&spades;</span>
            )}
            {(suited === 'hearts') && (
                <span className={`suit ${cardSizeInnerSuit}`}>&hearts;</span>
            )}
            {(suited === 'diams') && (
                <span className={`suit ${cardSizeInnerSuit}`}>&diams;</span>
            )}

          </span>
      </li>
    )
  }

  const PlayerHand = ({ cards }) => {
    return (
      <div className='player-hand font-sans antialiased flex justify-center items-center'>
        <ul className="player-side playingCards faceImages flex">
          {cards.length > 0 ? (
            cards.map((card, index) => (
                <CardRender suited={card.suit} value={card.number} indexed={index} /> 
            ))
          ) : (
            <li className='no-cards'></li>
          )}
        </ul>
      </div>
    );
  };

  const GameTurnPingIcon = ({className}) => {
    return (
      <span className={className + " transition ease flex h-3 w-3"}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
      </span>
    );
  };
  const DealerCardsRender = ({ cards }) => {
    return (
      <div className='dealer-hand font-sans antialiased flex justify-center items-center'>
        <ul className="dealer-side playingCards faceImages flex">
          {cards.length > 0 ? (
            cards.map((card, index) => (
                <CardRender suited={card.suit} value={card.number} indexed={index} /> 
            ))
          ) : (
            <li className='no-cards'></li>
          )}

        {(cards.length === 1) && (
            <li 
                className={'singlePlayingCard back ' + cardSize + ' ' + (cards.length === 1 ? 'hidden' : '')}>
            </li>
        )}
        </ul>

      </div>
    );
  }

  
  const DealerHand = ({ cards }) => {
    return (
      <div className='player-hand flex justify-center items-center'>
          <DealerCardsRender cards={cards}/>
      </div>
    );
  };

  const shuffleDeck = (deck) => {
    // Make a copy of the original deck to avoid modifying it directly
    const newDeck = [...deck];

    // Shuffle the deck using the Fisher-Yates algorithm
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }

    // Return the shuffled deck
    return newDeck;
  };

  const dealCards = (deck) => {
    const playerCard1 = getRandomCard(deck);
    const dealerCard1 = getRandomCard(deck);
    const playerCard2 = getRandomCard(deck);

    const playerStartingHand = [playerCard1.randomCard, playerCard2.randomCard];
    const dealerStartingHand = [dealerCard1.randomCard];
    dealerStartingHand[0].isFirst = true;

    setPlayerHand(playerStartingHand);
    setDealerHand(dealerStartingHand);
  };

  const startNewGame = (type) => {
    if(currentBet < 1) {
      setMessage(Messages.place_bet);
      return;
    }
    setGameOver(false);
    setPlayerWon(false);
    setDealerWon(false);
    setGameTurn("player");
    setMessage("");
    setGameStarted(true);
    startNewGameDraw().then(() => dealCards(deck));
  };

  const getRandomCard = (deck) => {
    const updatedDeck = deck;
    const randomIndex = Math.floor(Math.random() * updatedDeck.length);
    const randomCard = updatedDeck[randomIndex];
    updatedDeck.splice(randomIndex, 1);
    return { randomCard, updatedDeck };
  };

  const Card = ({ number, suit }) => {
    const combo = number ? `${number}${suit}` : null;
    const color = suit === "diamonds" || suit === "hearts" ? "text-black" : "card";

    return (
      <td>
        <div className={color}>{combo}</div>
      </td>
    );
  };

  useEffect(() => {
    let currentPlayerScore = calculateScore(playerHand);
    setPlayerCount(currentPlayerScore);
    let currentDealerScore = calculateScore(dealerHand);
    setDealerCount(currentDealerScore);
    if (currentPlayerScore > 21) {
      setGameOver(true);
      setMessage("You busted!");
    } else if (currentDealerScore > 21) {
      setGameOver(true);
      setMessage(Messages.dealer_bust);
      // setWallet(wallet + currentBet + currentBet);
    } else if (playerHand.length === 2 && currentPlayerScore === 21) {
      setGameOver(true);
      setMessage("You got blackjack!");
      // setWallet(wallet + currentBet + currentBet);
    } else if (dealerHand.length === 2 && currentDealerScore === 21) {
      setGameOver(true);
      setMessage("Dealer got blackjack!");
    } else if (currentPlayerScore === 21 && currentDealerScore === 21) {
      setGameOver(true);
      setMessage("Push!");
      // setWallet(wallet + currentBet);
    } else if (currentPlayerScore === 21 && currentDealerScore !== 21) {
      setGameOver(true);
      setMessage("You got blackjack!");
      // setWallet(wallet + currentBet * 2);
    } else if (currentDealerScore === 21 && currentPlayerScore !== 21) {
      setGameOver(true);
      setMessage("Dealer got blackjack!");
    }
  }, [playerHand, dealerHand, gameOver]);
  return (
    <div
      className={`flex flex-col justify-start items-center w-[90vw] h-screen`}
    >
      <style jsx global>
        {globalStyles}
      </style>
      
      <div
        className='cardbox flex flex-col items-center space-evenly relative min-h-[450px] w-[90%] h-[70vh] lg:h-[70vh]  bg-green-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-black/20 shadow-lg
 p-4 mt-4'
      >
        <div className='absolute top-1 right-1 p-1'>
          <p className="font-light text-xs tracking-wider text-muted-foreground">Dealer</p>
          {!gameOver ? 
            <>
                {gameTurn && (
                  <>
                    {gameTurn === 'dealer' ? 
                      <>
                      <p className="font-medium text-xs text-foreground">DRAWING</p>
                      </>
                    :
                    <>
                    </>
                    }
                  </>
                )}
              </>
            :
              <>
                {(!dealerWon && !playerWon) && (
                  <>
                    <p className="font-medium text-sm text-foreground">DRAW</p>
                  </>
                )}
                {playerWon && (
                  <>
                    <p className="font-medium text-xs text-foreground">LOST</p>
                  </>
                )}
                {dealerWon && (
                  <>
                    <GameTurnPingIcon className={"absolute right-0 justify-center items-center"}/>
                    <p className="font-medium text-xs text-foreground">WIN</p>
                  </>
                )}
              </>
         }
        </div>
        <div className='absolute bottom-1 right-1 p-1'>
        {!gameOver ? 
            <>
                {gameTurn && (
                  <>
                    {gameTurn === 'player' ? 
                      <>
                        <p className="font-medium text-xs tracking-wider text-foreground">{playerOptionOpen && ("BET OPTION")}</p>
                      </>
                    :
                    <>
                        <p className="font-medium text-xs tracking-wider text-foreground">WAIT</p>
                    </>
                    }
                  </>
                )}
              </>
            :
              <>
                {(!dealerWon && !playerWon) && (
                  <>
                    <p className="font-medium text-xs text-foreground">DRAW</p>
                  </>
                )}
                {dealerWon && (
                  <>
                    <p className="font-medium text-xs text-foreground">LOST</p>
                  </>
                )}
                {playerWon && (
                  <>
                    <GameTurnPingIcon className={"absolute right-0 justify-center items-center"}/>
                    <p className="font-medium text-xs text-foreground">WIN</p>
                  </>
                )}
              </>
         }
        <p className="font-light text-xs tracking-wider text-muted-foreground">Player</p>

        </div>
        <div className='absolute bottom-1 left-1 p-1'>
          <span className="font-light text-xs tracking-tight text-foreground">Player Score</span>
          <br/>
          <span className="font-medium text-sm text-foreground">{playerCount}</span>
        </div>
          <div className='absolute top-1 left-1 p-1'>
            <span className="font-light text-xs tracking-tight text-foreground">Dealer Score</span>
            <br/>
            <span className="font-medium text-sm text-foreground">{dealerCount}</span>
          </div>
        <div className='w-full h-[2px] bg-black/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
        <div className='flex flex-col justify-evenly h-full'>
          <div className={'dealer-hand flex-col justify-center items-center ' + (playerWon ? 'opacity-25' : 'opacity-100')}>
            <DealerHand cards={dealerHand} />
          </div>
          <div className={'player-hand flex-col justify-center items-center ' + (dealerWon ? 'opacity-25' : 'opacity-100')}>
            <PlayerHand cards={playerHand} />
          </div>
        </div>
      </div>
      <Progress value={progessValueBar} />

      {/* CHIPS */}

        <div className='scores flex flex-col lg:flex-row justify-evenly  p-2 lg:p-6 items-center bg-secondary mt-4 w-[90%] lg:w-[60%] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-black/20 shadow-lg'>
          <div
            className='flex flex-col justify-center w-full lg:w-[30%] items-start
          '
          >
            <p>{websocketState}</p>
            <p className='text-white'>Round ID: {roundId}</p>
            <p className='text-white'>Your wallet: {wallet}</p>
            <p className='text-white'>Current bet: {currentBet}</p>
          </div>
          {gameStarted && (
            <div className='flex justify-center my-2'>
              <>
                {hitOptionAvailable && (
                  <Button onClick={hit} variant="outline">Hit</Button>
                )} 
                {doubleOptionAvailable && (
                  <Button onClick={stand} variant="outline">Double</Button>
                )} 
                {standOptionAvailable && (
                  <Button onClick={stand} variant="outline">Stand</Button>
                )}
              </> 
            </div>
            )
          }
          {placeBetState && (

          <div className='flex flex-row items-center justify-center space-x-4 '>
            <div
              className='relative rounded-full border-4 border-gray-400 w-16 h-16 flex items-center justify-center cursor-pointer transition duration-200 transform-gpu hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 '
              data-value='1'
              onClick={placeBet}
            >
              <div className='absolute inset-0 flex items-center justify-center'>
                <p className='text-white font-bold text-sm'>1</p>
              </div>
              <div className='rounded-full bg-red-500 w-10 h-10'></div>
            </div>
            <div
              className='relative rounded-full border-4 border-gray-400 w-16 h-16 flex items-center justify-center cursor-pointer transition duration-200 transform-gpu hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
              data-value='5'
              onClick={placeBet}
            >
              <div className='absolute inset-0 flex items-center justify-center'>
                <p className='text-white font-bold text-sm'>5</p>
              </div>
              <div className='rounded-full bg-blue-500 w-10 h-10'></div>
            </div>
            <div
              className='relative rounded-full border-4 border-gray-400 w-16 h-16 flex items-center justify-center cursor-pointer transition duration-200 transform-gpu hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
              data-value='10'
              onClick={placeBet}
            >
              <div className='absolute inset-0 flex items-center justify-center'>
                <p className='text-white font-bold text-sm'>10</p>
              </div>
              <div className='rounded-full bg-green-400 w-10 h-10'></div>
            </div>
            <div
              className='relative rounded-full border-4 border-gray-400 w-16 h-16 flex items-center justify-center cursor-pointer transition duration-200 transform-gpu hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
              data-value='25'
              onClick={placeBet}
            >
              <div className='absolute inset-0 flex items-center justify-center'>
                <p className='text-white font-bold text-sm'>25</p>
              </div>
              <div className='rounded-full bg-yellow-500 w-10 h-10'></div>
            </div>
          </div>     
          )}

        </div>
      <button
        onClick={startNewGame}
        disabled={gameStarted}
        className={`${
          gameStarted ? "hidden" : ""
        } mt-4 bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 active:from-yellow-600 active:to-yellow-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out opacity-75`}
      >
        {!gameStarted ? "New Game" : "Deal again"}
      </button>

      <div className='w-[90%] lg:w-[60%] rounded-lg  h-[4rem] my-4 flex justify-center items-center bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-black/20 shadow-lg'>
        <p className='text-white text-xl'>{message}</p>
      </div>
    </div>
  );
};
