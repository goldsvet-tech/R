"use client"

import React, { useEffect, useState } from 'react';
import {
    BonusCard,
    BonusCardContent,
    BonusCardDescription,
    BonusCardHeader,
    BonusCardTitle,
  } from "@/components/ui/bonus-card"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BannerLuckyHoof() {
  return (
        <div id="lucky-hoof-card" className="w-full h-full min-h-[180px] md:min-h-[195px] mx-auto md:mx-5 rounded-lg">
            <BonusCard className="min-h-[180px] md:min-h-[195px] bg-[url('/luckyhoof.png')] bg-right bg-no-repeat bg-contain">
            <BonusCardHeader className="flex flex-start items-end pb-2">
                <BonusCardTitle className="text-xs text-shadow tracking-wider font-medium -mt-3">
                </BonusCardTitle>
            </BonusCardHeader>
            <BonusCardContent>
                <div className="mt-1 text-lg text-white font-medium tracking-wide">Hit the Lucky Hoof &</div>
                <div className="mt-0 text-2xl text-white font-semibold">Win $45,231.89! </div>
                <p className="hidden md:flex text-xs mt-1 drop-shadow-md text-gray-200">
                Every spin on any Bgaming slot you have a chance of a Lucky Hoof drop.
                </p>
                <div className="mt-4">
                <Button
                        variant="default"
                        size="sm"
                        className="text-xs"
                    >
                    <Mail className="mr-2 h-2 w-2" /> Read more
                </Button>
                </div>
            </BonusCardContent>
            </BonusCard>
            </div>
  )
}

