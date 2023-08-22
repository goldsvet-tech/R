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

export function BannerDepositBonus() {
  return (
        <div id="deposit-bonus-card" className="w-full h-full min-h-[170px] md:min-h-[185px] mx-auto md:mx-5 rounded-lg">
            <BonusCard className="min-h-[170px] md:min-h-[185px] bg-[url('/assets/bonus/deposit-bonus.png')] bg-right bg-no-repeat bg-contain">
            <BonusCardHeader className="flex flex-start items-end pb-2">
                <BonusCardTitle className="text-xs text-shadow tracking-wider font-medium -mt-3">
                </BonusCardTitle>
            </BonusCardHeader>
            <BonusCardContent>
                <div className="mt-0 text-md text-white font-medium tracking-tight">Double Deposit Bonus </div>
                <div className="mt-0 text-2xl text-white font-semibold">We match first deposits up to 500$ </div>
                <p className="hidden md:flex text-xs mt-1 drop-shadow-md text-gray-200">
                Unlock your deposit on a 50x wager requirement, read terms for more info.
                </p>
                <div className="mt-2">
                    <Button
                            variant="default"
                            size="sm"
                            className="text-xs rounded-xl"
                        >
                        <Mail className="mr-2 h-2 w-2" /> Use Bonus
                    </Button>
                </div>
            </BonusCardContent>
            </BonusCard>
        </div>
  )
}

