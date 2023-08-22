"use client";

import { useAuth } from "@/hooks/auth"
import React, { useState, useEffect } from 'react';
import { AuthDialog } from "@/components/casino/auth-dialog";
import { defaultCurrencies, defaultSelectedCurrency, playCurrencies } from "@/config/currency"
import { Menubar, MenubarSeparator, MenubarCheckboxItem, MenubarContent, MenubarSub, MenubarSubTrigger, MenubarSubContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { LineSpacer } from "@/components/ui/line-spacer";
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { apiRequest } from '@/lib/axios'
import { useGamedata } from '@/hooks/gamedata'

export function Gameiframe() {
    const { user } = useAuth({middleware: 'guest'})
    const [slugId, setSlugId] = useState('unset');
    const [loadStatus, setLoadStatus] = useState("Loading..")
    const [initLoad, setInitLoad] = useState(false);
    const [gameEntryUrl, setGameEntryUrl] = useState(null)
    const [iframeLoad, setIframeLoad] = useState(false);
    const [loadAuthButtons, setLoadAuthButtons] = useState(false);
    const [gameOptions, setGameOptions] = useState(true);
    const [debitCurrency, setDebitCurrency] = useState('');
    const [playCurrency, setPlayCurrency] = useState('');
    const [IsLoading, setIsLoading] = useState(false);
    const [authLoader, setAuthLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const [gamesData, setGamesData] = useState([]);
    const [gameMode, setGameMode] = useState('demo');

    const waitAuthLoader = () => new Promise((resolve) => setTimeout(resolve, 1500));
    const waitModalToggle = () => new Promise((resolve) => setTimeout(resolve, 755));
    const {gameInfo } = useGamedata();


   const startGame = (modus) => new Promise((resolve) => {
        setGameMode(modus);
        setGameOptions(false);
    });


    useEffect(() => {
       if(!IsLoading) {
        setIsLoading(true);
        waitModalToggle().then(() => setIsLoading(false));
       }
    }, [playCurrency, debitCurrency])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search) // id=123
        if(params.get('slug')) {
          setSlugId(params.get('slug')) // 123
          gameInfo({
              slugId,
              setGamesData,
              setErrors,
          });
          var retrieveDebitCurrency = localStorage.getItem("selected_currency");
          if(retrieveDebitCurrency) {
            setDebitCurrency(retrieveDebitCurrency);
          } else {
            setDebitCurrency(defaultSelectedCurrency);
          }
          setPlayCurrency("USD");
        } else {
          setLoadStatus("Game not specified.");
        }
        waitAuthLoader().then(() => setAuthLoader(true));
      }, [])
      
    useEffect(() => {
        if(!gameOptions) {
            if(!initLoad) {
                setInitLoad(true);
                apiRequest.get('/casino/auth/start-game?mode='+gameMode+'&preloader_theme=darkblue&currency='+playCurrency+'&debit_currency='+debitCurrency+'&slug=' + slugId)
                .then(function(response){
                    if(response.data.session_url) {
                    setGameEntryUrl(response.data.session_url);
                    setIframeLoad(true);
                    setLoadStatus("Loaded");
                    } else {
                      console.log(response.data);
                      setLoadStatus("An unknown error occured..");
                    }
                })
                .catch(function(error){
                    if(error.response) {
                      if(error.response.status === 401) {
                        if(!user) {
                          setLoadAuthButtons(true);
                          setLoadStatus(null);
                        }
                      }
                      if(error.response.statusText) {
                          setLoadStatus(error.response.statusText);
                      } else {
                        console.log(error);
                        if(error.response.status === 401) {
                        setLoadStatus("Please login:  ");
                        } else {
                        setLoadStatus("An unknown error occured..");
                        }
                      }
                    } else {
                      console.log(error);
                      setLoadStatus("An unknown error occured..");
                    }
                });
            }
        }
    }, [gameOptions])

  return (
    <>
      <section key="game-page-container" className="container grid my-4 md:my-6 md:px-6">
      {user ?
          <div>
            <div className="flex h-[75vh] w-[100%] md:h-[70vh] md:max-h-[550px] shrink-0 items-center justify-center dark:bg-black rounded-md border border-dashed border-slate-200 dark:border-slate-700">
                {gameOptions ?
                <>
                    <>
                    <div className="px-1 md:px-4">
                      <LineSpacer
                        className="mt-1 mb-4 text-muted-foreground tracking-wider"
                        text={gamesData.name} 
                      />
                      <div className="flex items-center justify-center">
                          <Menubar>
                            <MenubarMenu value={debitCurrency}>
                              <MenubarTrigger>
                              <MenubarShortcut className="ml-1 text-sm"><span className="text-xs">Balance:</span> {debitCurrency}</MenubarShortcut>
                              </MenubarTrigger>
                              <MenubarContent>
                                {defaultCurrencies.length > 1 && (
                                  <>
                                  {defaultCurrencies.map((currency) => (
                                    <MenubarItem key={currency.symbol} onClick={event => setDebitCurrency(currency.symbol)}>
                                      {currency.symbol}
                                    </MenubarItem>
                                  ))}
                                  </>
                                )}
                              </MenubarContent>
                              </MenubarMenu>
                            </Menubar>
                      <Menubar className="ml-2">
                      <MenubarMenu value={playCurrency}>
                        <MenubarTrigger>
                            <MenubarShortcut className="ml-1 text-sm"><span className="text-xs">Fiat:</span> {playCurrency}</MenubarShortcut>
                        </MenubarTrigger>
                        <MenubarContent>
                          {playCurrencies.length > 1 && (
                            <>
                            {playCurrencies.map((currency) => (
                              <MenubarItem onClick={event => setPlayCurrency(currency.symbol)}>
                                {currency.symbol}
                              </MenubarItem>
                            ))}
                            </>
                          )}
                        </MenubarContent>
                        </MenubarMenu>
                        </Menubar>
                        </div>
                      <div className="flex items-center justify-center">
                      <Button 
                        onClick={event => startGame('real')}
                        className="mr-2"
                        variant="default"
                        size="sm"
                        disabled={IsLoading}
                        >
                        {IsLoading && (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Play!
                      </Button>
                      <Button 
                        onClick={event => startGame('demo')}
                        className="ml-2"
                        size="sm"
                        variant="default"
                        disabled={IsLoading}
                        >
                        {IsLoading && (
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Demo
                      </Button>
                      </div>
                 </div>
                 </>
                </>
               :
                <>
                {iframeLoad ? 
                  <iframe 
                    frameBorder="0"
                    className="h-full w-full rounded-md"
                    src={gameEntryUrl}
                    sandbox="allow-forms allow-top-navigation-by-user-activation allow-popups	allow-same-origin allow-scripts"
                    />
                :
                <div className="pl-4 pr-4"> {loadStatus} </div>
                }
                {loadAuthButtons ?
                  <AuthDialog />
                :
                <div></div>
                }
                </>
                }
            </div>
          </div>
                 :
                 <div className="flex h-[75vh] w-[100%] md:h-[70vh] md:max-h-[550px] shrink-0 items-center justify-center dark:bg-black rounded-md border border-dashed border-slate-200 dark:border-slate-700">
                    {authLoader && (
                    <AuthDialog />
                    )}
                 </div>
                }
      </section>
    </>
  )
}
