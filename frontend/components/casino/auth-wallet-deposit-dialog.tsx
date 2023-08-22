"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/auth"
import { 
  X,
  DollarSign,
  Router,
} from "lucide-react"
import { AuthBalance } from "@/components/casino/auth-balance";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { LineSpacer } from "@/components/ui/line-spacer";
import { Icons } from "@/components/icons"
import { Menubar, MenubarSeparator, MenubarCheckboxItem, MenubarContent, MenubarSub, MenubarSubTrigger, MenubarSubContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { useRouter } from 'next/navigation'

export function WalletDepositDialog({open, openCurrency}) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('Select currency..')
  const [currencies, setCurrencies] = useState([])
  const [cryptoMethodActive, setCryptoMethodActive] = useState(false)
  const [cryptoMethodDepositAddress, setCryptoMethodDepositAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [depositAddress, setDepositAddress] = useState('...')
  const { user, paymentDeposit, paymentGenerateAddress } = useAuth({ 
    middleware: "user"
  });

  const changeCurrency = (newCurrency) => {
    setCryptoMethodActive(false);
    currencies.forEach(function(elem){
      if (elem.symbol === newCurrency) {
        if(elem.crypto !== false) {
          console.log("Crypto deposit method active");
          setCryptoMethodActive(true);
          setCryptoMethodDepositAddress(elem.crypto.deposit_address);
        }
      }
    });
    setSelectedCurrency(newCurrency);
  }

  const depositCall = async() => {
    await paymentDeposit({
      setErrors,
      setStatus,
    });
  }

  
  const generateAddress = async() => {
    await setIsLoading(true);
    await paymentGenerateAddress({
      setErrors,
      setCryptoMethodDepositAddress,
      currency: selectedCurrency,
     });
     await depositCall();
     await setIsLoading(false);
  }
  

  useEffect(() => {
    if(status.length !== 0) {
      setCurrencies(status.data);
    }
  }, [status]);

  


  useEffect(() => {
    if(open === true) {
      setCryptoMethodDepositAddress('');
      setCurrencies([]);
      setSelectedCurrency("Select currency..");
      setCurrentPage(true);
      depositCall();
    }
}, [open]);

return (
  <Dialog open={currentPage}>
  <DialogContent 
      forceMount={true}
      onInteractOutside={event => setCurrentPage(false)}
      onCloseAutoFocus={event => setCurrentPage(false)}
      onPointerDownOutside={event => setCurrentPage(false)}
      onEscapeKeyDown={event => setCurrentPage(false)}
      className="sm:max-w-[525px]"
    >
    <DialogHeader>
      <div 
        className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        onClick={event => setCurrentPage(false)}
        >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </div>
      <DialogTitle>Deposit</DialogTitle>
      <DialogDescription 
      >
    <Card className="border-0">
      <CardHeader className="p-0">
        <CardDescription className="mb-5">
          Deposit funds into your casino account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <LineSpacer
          className="mt-1"
          text={"Currency"} 
        />
        <div className="flex items-center justify-center">
        <Menubar>
          <MenubarMenu value={selectedCurrency}>
            <MenubarTrigger>
                <MenubarShortcut className="ml-1 font-medium text-sm">{selectedCurrency}</MenubarShortcut>
            </MenubarTrigger>
            <MenubarContent>
              {currencies.length > 1 && (
                <>
                {currencies.map((currency) => (
                  <MenubarItem key={'wallet-deposit-'+currency.symbol} onClick={event => changeCurrency(currency.symbol)}>
                    {currency.symbol}
                  </MenubarItem>
                ))}
                </>
              )}
            </MenubarContent>
            </MenubarMenu>
            </Menubar>
        </div>
        {cryptoMethodActive ?
        <>
        <LineSpacer
          className="mt-2"
          text={"Payment Details"} 
        />
        <div className="grid gap-2">
          {cryptoMethodDepositAddress ? 
          <>
          <Label htmlFor="deposit_address">Deposit Address</Label>
          <Input id="deposit_address" className="justify-center items-center" value={cryptoMethodDepositAddress} disabled />
          </>
            :
            <Button onClick={event => generateAddress()} className="w-full">
              {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
               )}
              Generate Deposit Address
              </Button>
        }
        </div>
        </>
        :
        <>
          {selectedCurrency !== 'Select currency..' && (
          <div className="flex items-center justify-center">
            <p className="text-xs text-muted-foreground tracking-widest uppercase">No payment method available.</p>
          </div>
          )}
        </>
      }

      </CardContent>
    </Card>
      
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button 
        type="submit"
        variant="default"
        onClick={event => (router.push('/support'))}
      >
        Support
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
);
}
