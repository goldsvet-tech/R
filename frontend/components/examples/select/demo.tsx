import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Whistle Express Lift" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>What floor do you want to go?</SelectLabel>
          <SelectItem value="706">706</SelectItem>
          <SelectItem value="812">812</SelectItem>
          <SelectItem value="lobby">Lobby</SelectItem>
          <SelectItem value="brickies">Brickies</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
