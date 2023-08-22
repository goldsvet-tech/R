"use client";

import { Progress } from "@/components/ui/progress"
 
export default function VIPprogress({currentPercent}) {
  return (
    <div className="flex h-full w-full">
       <Progress value={currentPercent} className="w-[60%] absolute inset-0 mx-auto flex items-center justify-center font-display text-sm text-green-500" />
    </div>
  );
}