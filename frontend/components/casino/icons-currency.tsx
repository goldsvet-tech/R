import {
  DollarSign,
  PoundSterling,
  Euro,
  Bitcoin,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export function CurrencyIcon({value, ...props}) {
      return (
        <>
        {value === "GBP" ? <PoundSterling {...props} /> : <></>}
        {value === "USD" ? <DollarSign {...props} /> : <></>}
        {value === "EUR" ? <Euro {...props} /> : <></>}
        {value === "CAD" ? <DollarSign {...props} /> : <></>}
        {value === "BTC" ? <Bitcoin {...props} /> : <></>}

        </>
      );
    }