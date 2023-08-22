import * as React from 'react';
import { StyleSwitcher } from "@/components/style-switcher"
import {BannerDepositBonus} from "@/components/casino/bonus/banner-deposit-bonus"
import {VipRanks, VipProgress} from "@/components/casino/bonus/vip-ranks"

export default function BonusPage() {
  
  return (
    <div className="container relative pb-10">
        <StyleSwitcher />
        <section className="flex w-full mt-5 items-center justify-center">
          <BannerDepositBonus />
        </section>
        <section className="flex w-full mt-5 items-center justify-center">
          <div className="px-auto w-[90%]">
            <VipProgress className="rounded-none h-1" />
          </div>
        </section>
        <section className="flex w-full mt-5 items-center justify-center">
          <VipRanks />
        </section>
     </div>
  )
}



