"use client"
import Link from 'next/link'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from 'next/image'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarDays } from "lucide-react"
 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
   

interface PopoverGameProps extends React.HTMLAttributes<HTMLDivElement> {
    popover_text: string
    image_url: string
    game_slug: string
    game_name: string
    game_provider: string
  }
  
  
export function HoverCardDemo({
    popover_text,
    image_url,
    game_name,
    game_slug,
    game_provider,
    ...props
  }: PopoverGameProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
      <span className="underline cursor-pointer decoration-dashed">{popover_text}</span>
      </HoverCardTrigger>
      <HoverCardContent className="max-w-[300px]">
      <div className="relative">
                <AspectRatio ratio={1 / 1} className="overflow-hidden h-[100%] w-[100%] relative rounded-md">
                    <Image
                        src={image_url}
                        alt={game_name}
                        fill
                        onError={(event => setThumbnail(defaultError))}
                        sizes="auto"
                        className="object-cover relative bg-accent shadow-xl transition-all rounded-md hover:scale-105"
                    />
                </AspectRatio>
                    <div className="grid gap-4">
                    <div className="space-y-2">
                        <p className="text-xs tracking-tight my-3 text-muted-foreground">
                            <span className="font-light text-primary">{game_name}</span> is provided by {game_provider}.
                        </p>
                        <p>                    
                            <Link
                            href={"/game/external?slug="+game_slug+"&name="+game_name+"&provider="+game_provider}
                            > 
                            <Button variant="outline" size="sm" className="max-h-[40px] tracking-tight">
                                <span className="font-medium text-xs">Play Now!</span>
                            </Button>
                            </Link>
                        </p>
                    </div>
                    </div>
             </div>
      </HoverCardContent>
    </HoverCard>
  )
}
export function PopoverGame({
    popover_text,
    image_url,
    game_name,
    game_slug,
    game_provider,
    ...props
  }: PopoverGameProps) {
    const defaultError = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsBAMAAACLU5NGAAAAA3NCSVQICAjb4U/gAAAAAXNSR0IArs4c6QAAACdQTFRFAAAAFRUVKioqQEBAVVVVampqgICAlZWVqqqqv7+/1dXV6urq////97xb/AAAAA10Uk5TDAwMDAwMDAwMDAwMDEAYGtUAAALPSURBVBgZ7cG/b1tVAAXg8+w4bgqD1YFWlOF1pHgIggqkeojEmsEssHhIJGBAHsKPBSlDQIgBMqS7h1AkFjzQigEkD03iKLbf+aNo+u67z4XEW3XPcL4PZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmavWnbrXgdasgff/cHn/vnpXcjIPhgz+n0TGpq/cFmxCwVvTPgfXyO92xP+z1dIbZ1XKLaQ1tqYV7lAUtkhr/YIKT3kNRYdpNPmtY6QTDbitWZI5j5X6COVu1zhFKmscYU5khlxhS2k0uUKx0hlnZX5Z+/du/XgZy45QzJjln5E6UPWZkimx0vFLipvs9ZBKm1e2kVtyGgLqWRjkt9jyTqjPSTzDvkbXrLPyjGSyT79Fi+7y8ozCGmxcgIlEwZnUHLIYAolQwZTKBkwOIeSHoNzKNlmMIWSbQZTKBkyOIWSQwYnUDJh8CeENFg5gpA2KzsQ0mVlE0JGDAoIabFyASFdVk6hIxuzcgAdbzLKISMbsTKDjvuMnkBGc8KoDxkDRjPIuMPar1DRGDMqOlAxYO0pVNxhrcghojFm7TFUPGRt3oGINS7Zg4oea39BRXPCaJFDxU3WDiBjn9EUMhqMFjlk3GD0CDpeZ2UGIT1W9iBkm8EMSgYMnkDJNoM+lPQYQEqXpTmkvMXSBaS8xtI5pNxk6QxSNlg6gZQ2S88gZZ2lY0hpsXQAKWss7UBKg6UtSMlYyqGFJYj55ItLn8PMzMzMTED2/kc55LRGZPENxLQmvPQDtOzzhWITSjYYTKFkn0GRQ0eT0TF0bDCaQkeX0QI6hqzlkDFirQ8ZE9Z2IINLDiBjwtoeZIxZ24GMEWt9yBiy1oGMLqM5dNxgdAYdDUZHEDJgUHQgpM3gKaQM+MIih5TmiM8VuxDT/JL8+2PoyTowMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM3v1/gWXPOuoOu9EhAAAAABJRU5ErkJggg=="
    const [thumbnail, setThumbnail] = useState(image_url);
    const [disabledHover, setDisabledHover] = useState(false);
    const waitDisabledHover = () => new Promise((resolve) => setTimeout(resolve, 15000));
    const openPopover = async(event) => {
        event.preventDefault();
        setDisabledHover(true);
        setDisabledHover(false);
    };
     return (
        <Popover>
        <PopoverTrigger onClick={event => openPopover(event)} asChild>
                <span className="underline cursor-pointer decoration-dashed">
                <HoverCardDemo 
                                popover_text={popover_text}
                                image_url={image_url}
                                game_name={game_name}
                                game_slug={game_slug}
                                game_provider={game_provider}
                            />
            </span>
        </PopoverTrigger>
        <PopoverContent className="max-w-[160px]">
        </PopoverContent>
        </Popover>
    );
};