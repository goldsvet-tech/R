"use client"
import { PopoverGame } from "@/components/casino/game-details-popover"
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { vipLevels } from "@/config/site"
import { Progress } from "@/components/ui/progress"
import { cn, formatNumber } from "@/lib/utils"
import { useAuth } from "@/hooks/auth"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const charMax = (text,count) => {
  return text.slice(0, count) + (text.length > count ? "..." : "");
};

export function VipProgress({
  className
}: 
  any
) {
  const [progress, setProgress] = React.useState(0)
  const [currentLevel, setCurrentLevel] = React.useState('0')
  const [pointsToNext, setPointsToNext] = React.useState(0)
  const [currentPoints, setCurrentPoints] = React.useState(0)
  const [menuLoaded, setMenuLoaded] = React.useState(false)

  const { user} = useAuth({
    middleware: 'guest'
  });
  
  const getVipData = (level) => {
    return vipLevels[level];
  };

  useEffect(() => {
    setPointsToNext(vipLevels[1].vip_points);
  }, [])

  useEffect(() => {
    setProgress((formatNumber((pointsToNext / currentPoints), 2)));
  }, [currentPoints])

  useEffect(() => {
    if(user) {
      setCurrentPoints(user.vip_points);
      vipLevels.forEach(function(level) {
        if(level.vip_id !== "0") {
          if(user.vip_points > level.vip_points) {
            setPointsToNext(level.vip_points);
            setCurrentLevel(level.vip_id);
          }
        }
      });
      if(!menuLoaded) {
        setMenuLoaded(true);
      }
    }
  }, [user])
  
  return (
     <div className={cn("flex w-full items-center justify-center", className)}>
      {menuLoaded ? 
      <>
      <VipProgressMenu currentLevel={currentLevel} progression={formatNumber((progress), 2)} />
      <Progress className={cn("", className)} value={progress} />
      <span className="absolute text-xs tracking-wider font-thin -pt-1 text-[9px] opacity-75">{progress > 0 ? progress + '%' : ''}</span>
      </>
      : 
      <>
      <span className="text-xs font-light tracking-tight text-muted-foreground">Loyalty</span>
      </>
      }
    </div> 
  );
}

export function VipProgressMenu({
  currentLevel,
  progression,
}: 
  any
) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="text-xs font-light tracking-tight text-muted-foreground">Your Loyalty</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="hidden lg:block lg:row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="hidden lg:flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-0 lg:p-6 no-underline outline-none focus:shadow-md"
                    href="#"
                  >
                    <div className="lg:mb-2 lg:mt-4 text-md font-light">
                      Loyalty Program
                    </div>
                    <p className="text-xs leading-tight text-muted-foreground">
                      Get rewarded based on your Loyalty Rank.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="#" title="Rank">
                <span className="text-xs">Your reward level is <b>{currentLevel}</b>.</span>
              </ListItem>
              <ListItem href="#" title="Progress">
                <span className="text-xs">Your progress is {progression}% towards next level.</span>
              </ListItem>
              <ListItem href="#" title="Unclaimed Rewards">
                <span className="text-xs">Claim your Loyalty rewards.</span>               
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
 
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
export function VipRanksMap() {
  return (
    <div className="overflow-hidden">
        {vipLevels.map((vipLevel) => (
          <div className="flex items-center justify-between mb-4 space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={vipLevel.vip_img}/>
                <AvatarFallback>{vipLevel.vip_id}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">{vipLevel.vip_rank} <span className="text-xs opacity-75 font-light tracking-tight">Reward Level {vipLevel.vip_id}</span></p>
                <p className="text-sm text-muted-foreground mb-1">{vipLevel.vip_short_desc}</p>
                {vipLevel.vip_freespins && (
                <p className="text-xs text-muted-foreground">
                  - {vipLevel.vip_freespins}x free spins on <PopoverGame 
                    popover_text={charMax(vipLevel.vip_freespins_slot[1], 25)}
                    image_url={vipLevel.vip_freespins_slot[0]}
                    game_name={vipLevel.vip_freespins_slot[1]}
                    game_provider={vipLevel.vip_freespins_slot[2]}
                    game_slug={vipLevel.vip_freespins_slot[3]}
                  />.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
        }
      </div>
  );
}

export function VipRanks() {
  return (
    <Card className="w-full mx-auto md:mx-5 rounded-lg">
      <CardHeader>
        <CardTitle>Loyalty Program</CardTitle>
        <CardDescription>
          Get your Loyalty Rank up by placing bets. All real-money games are eligible.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <VipRanksMap />
      </CardContent>
    </Card>
  )
}
