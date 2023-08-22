"use client"
import React, { useEffect, useState } from 'react';
import { ColumnDef } from "@tanstack/react-table"
import { Task } from "./data-schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import moment from 'moment';
import { labels, priorities, statuses } from "./datas"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from 'next/image'
import { PopoverGame } from "@/components/casino/game-details-popover"
const outcomeClass = (amount) => {
  if(amount > 0) {
    return 'text-green-600';
  }
  if(amount < 0) {
    return 'text-red-400';
  }
  if(amount === 0) {
    return 'text-orange-500';
  }
};

const getDate = (date) => {
  const dateTime = new Date(date * 1000);
  return moment(dateTime).fromNow();
};

const tinyGameImage = (gameslug) => {
  const [src, setSrc] = useState("/thumb/s3/" + gameslug + ".png");
  return (
    <Image
      src={src}
      alt={gameslug}
      quality={50}
      width={"27"}
      height={"27"}
      onError={() => setSrc("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsBAMAAACLU5NGAAAAA3NCSVQICAjb4U/gAAAAAXNSR0IArs4c6QAAACdQTFRFAAAAFRUVKioqQEBAVVVVampqgICAlZWVqqqqv7+/1dXV6urq////97xb/AAAAA10Uk5TDAwMDAwMDAwMDAwMDEAYGtUAAALPSURBVBgZ7cG/b1tVAAXg8+w4bgqD1YFWlOF1pHgIggqkeojEmsEssHhIJGBAHsKPBSlDQIgBMqS7h1AkFjzQigEkD03iKLbf+aNo+u67z4XEW3XPcL4PZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmavWnbrXgdasgff/cHn/vnpXcjIPhgz+n0TGpq/cFmxCwVvTPgfXyO92xP+z1dIbZ1XKLaQ1tqYV7lAUtkhr/YIKT3kNRYdpNPmtY6QTDbitWZI5j5X6COVu1zhFKmscYU5khlxhS2k0uUKx0hlnZX5Z+/du/XgZy45QzJjln5E6UPWZkimx0vFLipvs9ZBKm1e2kVtyGgLqWRjkt9jyTqjPSTzDvkbXrLPyjGSyT79Fi+7y8ozCGmxcgIlEwZnUHLIYAolQwZTKBkwOIeSHoNzKNlmMIWSbQZTKBkyOIWSQwYnUDJh8CeENFg5gpA2KzsQ0mVlE0JGDAoIabFyASFdVk6hIxuzcgAdbzLKISMbsTKDjvuMnkBGc8KoDxkDRjPIuMPar1DRGDMqOlAxYO0pVNxhrcghojFm7TFUPGRt3oGINS7Zg4oea39BRXPCaJFDxU3WDiBjn9EUMhqMFjlk3GD0CDpeZ2UGIT1W9iBkm8EMSgYMnkDJNoM+lPQYQEqXpTmkvMXSBaS8xtI5pNxk6QxSNlg6gZQ2S88gZZ2lY0hpsXQAKWss7UBKg6UtSMlYyqGFJYj55ItLn8PMzMzMTED2/kc55LRGZPENxLQmvPQDtOzzhWITSjYYTKFkn0GRQ0eT0TF0bDCaQkeX0QI6hqzlkDFirQ8ZE9Z2IINLDiBjwtoeZIxZ24GMEWt9yBiy1oGMLqM5dNxgdAYdDUZHEDJgUHQgpM3gKaQM+MIih5TmiM8VuxDT/JL8+2PoyTowMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM3v1/gWXPOuoOu9EhAAAAABJRU5ErkJggg==")}
      sizes="auto"
      className="object-cover bg-accent shadow-xl transition-all rounded-full hover:scale-105"
    />
  )
};

const charMax = (text,count) => {
  return text.slice(0, count) + (text.length > count ? "..." : "");
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "game_slug",
    header: ({ column }) => (
      <div className="w-[20px]">
      <DataTableColumnHeader column={column} title="" />
      </div>
    ),
    cell: ({ row }) => <div className="flex ml-2 p-1">
          {tinyGameImage(row.getValue("game_slug"))}
      </div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tx_id",
    header: ({ column }) => (
      <div className="hidden sm:flex">
      <DataTableColumnHeader column={column} title="Round ID" />
      </div>
    ),
    cell: ({ row }) => <div className="flex space-x-2">
      <span className="hidden sm:flex text-xs md:text-sm font-light text-muted-foreground">{row.getValue("tx_id")}</span>
      </div>,
    enableSorting: false,
    enableHiding: false,
    
  },
  {
    accessorKey: "game_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Game" />
    ),
    cell: ({ row }) => <div className="flex space-x-2">
      <span className="text-xs md:text-sm font-light text-muted-foreground">  
        <PopoverGame 
                  popover_text={charMax(row.getValue("game_title"), 7)}
                  image_url={"/thumb/s3/" + row.getValue("game_slug") + ".png"}
                  game_name={row.getValue("game_title")}
                  game_provider={'none'}
                  game_slug={row.getValue("game_slug")}
                /></span>
      </div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Player" />
    ),
    cell: ({ row }) => <div className="text-xs md:text-sm font-light text-muted-foreground">{charMax(row.getValue("user"), 10)}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "outcome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Outcome" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("outcome")
      )

      if (!status) {
        return null
      }


      return (
        <div className="flex items-center">
          {status.icon && (
            <>
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                  <status.icon className={"mr-1 h-4 w-4 text-muted-foreground"} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{row.getValue("play_currency")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              </>
          )}
          <span className={"text-xs md:text-sm font-medium tracking-tight " +  outcomeClass(row.getValue("winLose"))}>{status.label}{row.getValue("winLose")}</span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ts",
    header: ({ column }) => (
      <div className="hidden sm:flex">
      <DataTableColumnHeader column={column} title="Date" />
      </div>
    ),
    cell: ({ row }) => <div className="hidden sm:flex text-xs md:text-sm font-light tracking-tight text-muted-foreground sm:space-x-2">{getDate(row.getValue("ts"))}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "winLose",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="/" />
    ),
    cell: ({ row }) => <div className="none hidden text-xs md:text-sm"></div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "play_currency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="/" />
    ),
    cell: ({ row }) => <div className="none hidden text-xs md:text-sm"></div>,
    enableSorting: false,
    enableHiding: false,
  },
]
