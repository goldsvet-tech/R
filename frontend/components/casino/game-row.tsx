"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useGamedata } from '@/hooks/gamedata'
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  PlusCircle,
  PlayCircle,
  PinIcon,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
interface Game {
  id: any
  slug: string
  title: string
  provider: string
}
interface GameCategory {
  popular: object
  new: object
  table_games: object
}
interface GameData {
  id: any
  slug: string
  title: string
  provider: string
}
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

export function GameRow({gamesKey, imageType, headerTitle, subHeader}) {
  const router = useRouter()
  const [gamesFromStorage, setGamesFromStorage] = useState([]);
  const [gamesDataRewardFront, setGamesDataRewardFront] = useState<GameData[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadType, setLoadType] = useState(null);
  const [loadTries, setLoadTries] = useState(1);
  const storageRefreshTimerSeconds = 180;
  const [gamesData, setGamesData] = useState([]);
  const {rowGameData, gameInfo } = useGamedata();
  const [errors, setErrors] = useState(null);
  const [recentErrored, setRecentErrored] = useState(false);
  const [erroredBefore, setErroredBefore] = useState(false);
  const [debugModeActivated, setDebugModeActivated] = useState(false);
  const [failedTries, setFailedTries] = useState(0);

  const { toast } = useToast()

  const waitError = () => new Promise((resolve) => setTimeout(resolve, (Math.floor(Math.random() * (950 - 500) ) + 500)));
  const waitFetch = () => new Promise((resolve) => setTimeout(resolve, (Math.floor(Math.random() * (950 - 500) ) + 500)));
  
  const maxFailedTries = 3;

  const localStorageKey = gamesKey+"_row";
  const localStorageKeyTest = localStorageKey+"_storage_test";

  async function debugMode() {
    try {
    const params = new URLSearchParams(window.location.search); // id=123
    var debugModeStorage = await localStorage.getItem("debugMode");

    if(params.get('debugReload')) {
      if(!debugModeStorage) {
        toast({
          title: "Debug: ACTIVE",
          description: "Debug window available.",
        });
        localStorage.setItem("debugMode", 1);
        setDebugModeActivated(true);
      }
    }
    if(debugModeStorage && debugModeStorage === '1') {
      toast({
        title: "Debug: ACTIVE",
        description: "Debug window available.",
      });
      setDebugModeActivated(true);
    }
    } catch(e) {
      toast({
        title: "Debug: ERROR",
        description: "Error loading debug mode",
      });
    }
  }

  useEffect(() => {
    try {
      localStorage.setItem(localStorageKeyTest, "passed");
      var testOutcome = localStorage.getItem(localStorageKeyTest);
      if(testOutcome === "passed") {
        var gamesRetrieve = localStorage.getItem(localStorageKey);
        if(!gamesRetrieve) {
          setLoadType("set_storage");
          debugMode();
          localStorage.removeItem(localStorageKeyTest);
        } else {
            setLoadType("load_storage");
            debugMode();
            localStorage.removeItem(localStorageKeyTest);
        }
      }
    } catch(e) {
        console.error("Local storage mode: 'failed_storage'.");
        setLoadType("failed_storage");
    }
    }, []);

    async function fetchData() {
      await setRecentErrored(false);
        await waitFetch().then(() =>
          rowGameData({
            gamesKey,
            setGamesData,
            setErrors,
        })
        );
    }


    async function removeLocalStorage() {
      await localStorage.removeItem(localStorageKey);
      await localStorage.removeItem(localStorageKey+"_stored_at");
    }

    async function debugAction(action) {
        try {
      if(action === 'removeStorage') {
        await localStorage.removeItem(localStorageKey);
        await localStorage.removeItem(localStorageKey+"_stored_at");
        toast({
          title: "Debug Action: removed "+localStorageKey+" local storage",
          description: "Reloading page..",
        });
        await waitFetch().then(() =>
          router.push('/?debugReload='+Math.floor(Date.now() / 1000))
        );
      }
      if(action === 'deactivateDebug') {
        await localStorage.removeItem('debugMode');
        toast({
          title: "Debug Action: remove debugMode key from your local storage",
          description: "Reloading page..",
        });
        await waitFetch().then(() =>
          router.push('/?reload='+Math.floor(Date.now() / 1000))
        );
      }   
     } catch(e) {
        console.error("Local storage mode: 'failed_storage'.");
        setLoadType("failed_storage");
    }
    }

    useEffect(() => {
        if(errors) {
          if(failedTries < maxFailedTries) {
            if(!erroredBefore) {
              setErroredBefore(true);
            }
            if(!recentErrored) {
                setFailedTries((failedTries + 1))
                setRecentErrored(true);
                if(debugModeActivated) {
                  toast({
                    title: "Error: Failed to retrieve games row",
                    description: "Will retry to load '"+gamesKey+"'. ("+failedTries+"). ",
                  });
                }
                waitError().then(() => fetchData());
            }
          }

          if(failedTries === maxFailedTries) {
            toast({
              title: "Error: Failed to retrieve games row",
              description: "Stopped trying to load '"+gamesKey+"'.",
            });
          } 
        }
    }, [errors]);
      
    useEffect(() => {
          if(gamesData.success) {
            if(loadType === "set_storage") {
              localStorage.setItem(localStorageKey, JSON.stringify(gamesData));
              localStorage.setItem(localStorageKey+"_stored_at", Math.floor(Date.now() / 1000));
            }
            setGamesFromStorage(gamesData);
            setLoaded(true);
            if(erroredBefore) {
              toast({
                title: "Success: Loaded games",
                description: "Loaded games succesfully.",
              });
              setErroredBefore(false);
            }
          }
      }, [gamesData]);
        
    useEffect(() => {
        if(!loaded) {
          var time_now = Math.floor(Date.now() / 1000);
          if(loadType === "set_storage") {
            fetchData();
          }
          if(loadType === "load_storage") {
            var value = localStorage.getItem(localStorageKey);
            if(!value) {
              console.log("Games not found, local storage mode: 'set_storage'.");
              setLoadType("set_storage");
            } else {
              var stored_at = localStorage.getItem(localStorageKey+"_stored_at");
              if(!stored_at) {
                console.log("Stored at missing.");
                setLoadType("set_storage");
              } else {
                var storage_difference = time_now - stored_at;
                if(storage_difference > storageRefreshTimerSeconds) {
                  removeLocalStorage();
                  setLoadType("set_storage");
                  console.log("Refreshing games list local storage because it was set > "+storageRefreshTimerSeconds+" seconds ago.");
                } else {
                var games = !!value ? JSON.parse(value) : [];
                console.log("Games loaded from local storage, valid for another "+(storageRefreshTimerSeconds - storage_difference)+" seconds.");
                setGamesFromStorage(games);
                setLoaded(true);
                }
              }
            }
          }

          if(loadType === "failed_storage") {
                fetchData();
          }
          if(!loaded) {
            //setLoadTries((loadTries+1));
          }
        }
      }, [loadType, loadTries]);

    useEffect(() => {
        if(gamesFromStorage.data) {
          setGamesDataRewardFront(gamesFromStorage.data);
        }
    }, [gamesFromStorage])

  return (
    <div className="col-span-2 overflow-hidden">
    {failedTries === maxFailedTries ? 
        <>
        </>
        :
        <>
        <div className="mt-12 space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {headerTitle ?? "Games"}
            {debugModeActivated && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 mr-2 rounded-full p-[2px]">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Open popover</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Debug Window</h4>
                  </div>
                </div>
                <div className="grid gap-4 mt-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Row Info
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="gamesKey" className="text-xs">ID</Label>
                    <Input
                      id="gamesKey"
                      defaultValue={(gamesKey ?? '?')}
                      disabled
                      className="col-span-2 h-8"
                    />
                  </div>
                <div className="mt-2 grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="load_method" className="text-xs">Load Method</Label>
                    <Input
                      id="load_method"
                      defaultValue={(loadType ?? '?')}
                      disabled
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid gap-4 mt-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Row Actions
                    </p>
                  </div>
                </div>
                  <div className="grid items-center gap-4">
                    <div className="flex text-xs">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={(e) => debugAction('removeStorage')}
                        >
                          Remove Local Storage
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={(e) => debugAction('deactivateDebug')}
                        >
                          Deactivate Debug
                      </Button>
                    </div>
                  </div>
                  </div>
              </PopoverContent>
            </Popover>
            )}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subHeader ?? ""}
          </p>
        </div>
        <Separator className="my-4" />
        <div className="relative">
          <ScrollArea>
            <div className="relative flex space-x-4 mb-5">
              {gamesFromStorage?.data ? 
                gamesDataRewardFront.map((game) => (
                  <div key={"single-game"+ game.slug + gamesKey}                  >
                    <Link
                      href={"/game/external?slug="+game.slug+"&name="+game.title+"&provider="+game.provider}
                      key={"single-game"+ game.slug + gamesKey}
                      className="cursor-pointer" 
                    > 
                      <SingleGame
                        game={game}
                        key={"single-game"+ game.slug + gamesKey}
                        imageAlt={game.id + "-row-2"}
                        imageType={imageType}
                        className="w-[150px]"
                        aspectRatio={1 / 1}
                      />
                    </Link>
                    </div>
                  ))
                  :
                  <>
                    <SkeletonGame key={"skeleton-1"} aspectRatio={1/1} />
                    <SkeletonGame key={"skeleton-2"} aspectRatio={1/1} />
                    <SkeletonGame key={"skeleton-3"} aspectRatio={1/1} />
                    <SkeletonGame key={"skeleton-4"} aspectRatio={1/1} />
                    <SkeletonGame key={"skeleton-5"} aspectRatio={1/1} />
                    <SkeletonGame key={"skeleton-6"} aspectRatio={1/1} />
                    <SkeletonGame key={"skeleton-7"} aspectRatio={1/1} />
                    <SkeletonGame key={"skeleton-8"} aspectRatio={1/1} />
                    <SkeletonGame key={"skeleton-9"} aspectRatio={1/1} />
                  </>
              }
            </div>
            <ScrollBar className="h-2 max-w-[80vw]" orientation="horizontal" />
          </ScrollArea>
        </div>
        </>
      }
    </div>
  )
}

interface SkeletonGameProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: number
  className?: string
}
function SkeletonGame({
  aspectRatio = 1 / 1,
  className,
  ...props
}: SkeletonGameProps) {
  return (
    <div className="space-y-3 w-[150px]">
      <span data-state="closed">
        <AspectRatio ratio={aspectRatio} className="relative bg-primary opacity-[0.8] rounded-md w-full pb-[100%]" />
      </span>
      <div className="space-y-1 text-sm">
          <Skeleton className="h-3 bg-primary opacity-[0.9] w-[130px]" />
          <Skeleton className="h-2 bg-primary opacity-[0.95] w-[100px]" />
      </div>
    </div>
  )
}

interface SingleGameProps extends React.HTMLAttributes<HTMLDivElement> {
  key: string
  game: Game
  imageAlt: string
  imageType?: string
  aspectRatio?: number
  className?: string
}


function SingleGame({
  game,
  imageAlt,
  imageType,
  aspectRatio = 3 / 4,
  className,
  ...props
}: SingleGameProps) {
  const assetbaseurl = process.env.NEXT_PUBLIC_ASSETS_URL;
  const [thumbnail, setThumbnail] = useState(assetbaseurl + "/casino/thumb/"+imageType+"/" + game.slug + ".png");
  const defaultError = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsBAMAAACLU5NGAAAAA3NCSVQICAjb4U/gAAAAAXNSR0IArs4c6QAAACdQTFRFAAAAFRUVKioqQEBAVVVVampqgICAlZWVqqqqv7+/1dXV6urq////97xb/AAAAA10Uk5TDAwMDAwMDAwMDAwMDEAYGtUAAALPSURBVBgZ7cG/b1tVAAXg8+w4bgqD1YFWlOF1pHgIggqkeojEmsEssHhIJGBAHsKPBSlDQIgBMqS7h1AkFjzQigEkD03iKLbf+aNo+u67z4XEW3XPcL4PZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmavWnbrXgdasgff/cHn/vnpXcjIPhgz+n0TGpq/cFmxCwVvTPgfXyO92xP+z1dIbZ1XKLaQ1tqYV7lAUtkhr/YIKT3kNRYdpNPmtY6QTDbitWZI5j5X6COVu1zhFKmscYU5khlxhS2k0uUKx0hlnZX5Z+/du/XgZy45QzJjln5E6UPWZkimx0vFLipvs9ZBKm1e2kVtyGgLqWRjkt9jyTqjPSTzDvkbXrLPyjGSyT79Fi+7y8ozCGmxcgIlEwZnUHLIYAolQwZTKBkwOIeSHoNzKNlmMIWSbQZTKBkyOIWSQwYnUDJh8CeENFg5gpA2KzsQ0mVlE0JGDAoIabFyASFdVk6hIxuzcgAdbzLKISMbsTKDjvuMnkBGc8KoDxkDRjPIuMPar1DRGDMqOlAxYO0pVNxhrcghojFm7TFUPGRt3oGINS7Zg4oea39BRXPCaJFDxU3WDiBjn9EUMhqMFjlk3GD0CDpeZ2UGIT1W9iBkm8EMSgYMnkDJNoM+lPQYQEqXpTmkvMXSBaS8xtI5pNxk6QxSNlg6gZQ2S88gZZ2lY0hpsXQAKWss7UBKg6UtSMlYyqGFJYj55ItLn8PMzMzMTED2/kc55LRGZPENxLQmvPQDtOzzhWITSjYYTKFkn0GRQ0eT0TF0bDCaQkeX0QI6hqzlkDFirQ8ZE9Z2IINLDiBjwtoeZIxZ24GMEWt9yBiy1oGMLqM5dNxgdAYdDUZHEDJgUHQgpM3gKaQM+MIih5TmiM8VuxDT/JL8+2PoyTowMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM3v1/gWXPOuoOu9EhAAAAABJRU5ErkJggg=="
  
  return (
          <div className={cn("space-y-3", className)} {...props}>
            <ContextMenu>
              <ContextMenuTrigger>
                <AspectRatio
                  ratio={aspectRatio}
                  className="overflow-hidden rounded-md"
                  >
                  <Image
                    src={thumbnail}
                    alt={game.title}
                    fill
                    onError={(event => setThumbnail(defaultError))}
                    sizes="auto"
                    className="object-cover bg-accent shadow-xl transition-all rounded-md hover:scale-105"
                  />
                </AspectRatio>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-40">
                
                <ContextMenuItem>
                  <PlayCircle className="mr-1 h-4 w-4" /> 
                      Play
                  </ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    {game.provider}
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-48">
                    <ContextMenuItem disabled>
                      Northplay Link
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Room
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Spectate Random
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem disabled>
                      Join Rooms
                    </ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuItem><PlayCircle className="mr-2 h-4 w-4" /> Add to Queue</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem><PinIcon className="mr-2 h-4 w-4" /> Pin Game</ContextMenuItem>
                <ContextMenuItem>Share</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            <div className="space-y-1 text-sm">
              <p className="font-medium leading-none">
                {game.title}
              </p>
              <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                {game.provider}
              </p>
            </div>
          </div>
          )
}

