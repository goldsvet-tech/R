"use client"

import React, { useState, useEffect } from 'react';
import { Menubar, MenubarSeparator, MenubarCheckboxItem, MenubarContent, MenubarSub, MenubarSubTrigger, MenubarSubContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { defaultCurrencies, defaultSelectedCurrency } from "@/config/currency"
import {MetamaskTransaction} from "@/components/casino/metamask"
import {WalletDepositDialog} from "@/components/casino/auth-wallet-deposit-dialog"

import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {
  Check,
} from "lucide-react"
export function AuthBalance({ userLoad, walletActionsEnabled, displayActionsEnabled }) {
  const defaultCurrency = defaultSelectedCurrency;
  const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);
  const [balanceLoaded, setBalanceLoaded] = useState(false);
  const [balanceUpdate, setBalanceUpdate] = useState(null);
  const [currentBalance, setCurrentBalance] = useState("0.00");
  const [showFiatBalance, setShowFiatBalance] = useState(null);
  const [currentBalanceFiat, setCurrentBalanceFiat] = useState("0.00");
  const [hideLowBalances, setHideLowBalances] = useState(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const waitModalToggle = () => new Promise((resolve) => setTimeout(resolve, 55));

  const { toast } = useToast();

  useEffect(() => {
    const storage = localStorage.getItem("selected_currency") ?? defaultCurrency;
    setSelectedCurrency(storage);
    setBalanceLoaded(true);
    var showFiatConversions = localStorage.getItem("show_fiat_conversions") ?? null;
    setShowFiatBalance(showFiatConversions);
    setHideLowBalances((localStorage.getItem("hide_low_balances") ? true : null));
  }, [userLoad]);


  useEffect(() => {
    try {
      if(showFiatBalance) {
      setCurrentBalanceFiat(userLoad.balance[selectedCurrency][showFiatBalance.toLowerCase()]['value']);
      }
      setCurrentBalance(userLoad.balance[selectedCurrency]['nice']);
    } catch(error) {
      if(localStorage.getItem("selected_currency")) {
        localStorage.removeItem("selected_currency");
        setSelectedCurrency(defaultCurrency);
        console.log(error);
      }
    }
  }, [userLoad, balanceLoaded, selectedCurrency]);

  useEffect(() => {
    setCurrentBalance(balanceUpdate);
    localStorage.removeItem("balanceUpdate");
  }, [balanceUpdate]);

  const changeCurrency = (value) => {
    setSelectedCurrency(value);
    setCurrentBalance(userLoad.balance[value]['nice']);
    localStorage.setItem("selected_currency", value);
  }
  const disableFiatDisplay = () => {
    if(localStorage.getItem("show_fiat_conversions")) {
      localStorage.removeItem("show_fiat_conversions");
    }
    setShowFiatBalance(null);
    toast({
      title: "Stopped showing balance in fiat",
      description: "Showing all balances in it's native value.",
    })
  }

  const enableFiatDisplay = (value) => {
      localStorage.setItem("show_fiat_conversions", value);
      setCurrentBalanceFiat(userLoad.balance[selectedCurrency][value.toLowerCase()]['value']);
      setShowFiatBalance(value);
      var toastMessage = "Please note that this is an estimate converted rate.";
      toast({
        title: "Showing all balances in fiat: " + value + ".",
        description: toastMessage,
      })
  }
  
  const disableHideLowBalance = () => {
    localStorage.removeItem("hide_low_balances");
    setHideLowBalances(null);
    toast({
      title: "Setting changed!",
      description: "Showing all balances again.",
      action: <ToastAction altText="Undo" onClick={event => localStorage.setItem("hide_low_balances", true) & disableHideLowBalance()}>Undo</ToastAction>,
    })
  }

  const openModal = (value) => {
    if(value === "deposit") {
        setWalletModalOpen(true);
        waitModalToggle().then(() => setWalletModalOpen(false));
    }
  }

  const enableHideLowBalance = () => {
    localStorage.setItem("hide_low_balances", true);
    setHideLowBalances(true);
    toast({
      title: "Balance display settings changed!",
      description: "Hiding all low balance in list.",
      action: <ToastAction altText="Undo" onClick={event => enableHideLowBalance()}>Undo</ToastAction>,
    })
  }

  if (!userLoad || !userLoad.balance || userLoad.balance.length === 0) {
    return <></>;
  }

  return (
    <>
        <WalletDepositDialog 
           open={walletModalOpen}
           openCurrency={selectedCurrency}
        />
    <Menubar>
      <MenubarMenu value={selectedCurrency}>
        <MenubarTrigger>
            {showFiatBalance === null ?
                <span className="font-bold text-sm">{currentBalance}</span>
            :
                <span className="font-bold text-sm">{userLoad.balance[selectedCurrency][showFiatBalance.toLowerCase()]['sign']}{currentBalanceFiat}</span>
            }
            <MenubarShortcut className="ml-1 font-light text-xs">{selectedCurrency}</MenubarShortcut>
        </MenubarTrigger>
        <MenubarContent>
        {walletActionsEnabled && (
          <>
            <MenubarItem disabled className="text-xs font-semibold">Balance Actions</MenubarItem>
            <MenubarItem 
              onClick={event => openModal('deposit')}
            >
              Deposit
            </MenubarItem>
            <MenubarItem 
              onClick={event => openModal('withdraw')}
            >
              Withdraw
            </MenubarItem>
          </>
        )}
        <MenubarItem disabled className="text-xs font-semibold">Select Balance</MenubarItem>
          {defaultCurrencies.map((balance) => (
                        <div key={("balance-"+balance.symbol)}>
            {hideLowBalances !== null & userLoad.balance[balance.symbol]['usd']['value'] < "0.10" ?
            <>
              
            </>
            :
            <MenubarItem
              className={selectedCurrency === balance.symbol ? "active-balance-item disabled" : "balance-item"}
              key={balance.symbol}
              onClick={() => changeCurrency(balance.symbol)}
              value={balance.symbol}
              >
              {showFiatBalance === null ?
                  <span className="font-medium tracking-wide">{userLoad.balance[balance.symbol]['nice']}</span>
                :
                  <>
                    <span className="font-medium tracking-wide">
                      {userLoad.balance[balance.symbol][showFiatBalance.toLowerCase()]['sign']}{userLoad.balance[balance.symbol][showFiatBalance.toLowerCase()]['value']}
                    </span>
                  </>
              }
                <MenubarShortcut className="flex">
                  <span className={selectedCurrency === balance.symbol ? "active-balance-item" : "balance-item"}>{balance.symbol}</span>
                  </MenubarShortcut>
              </MenubarItem>
            }
            </div>
          ))}
      {displayActionsEnabled && (
        <>
          <MenubarItem disabled className="text-xs font-semibold">Display Settings</MenubarItem> 
            <MenubarSub>
                <MenubarSubTrigger>
                  {showFiatBalance === null ?
                      <>
                      Show Fiat

                      </>
                    :
                      <>
                      <Check className="h-4 h-4 opacity-0.1 inline-flex" />
                      Show Fiat
                      <MenubarShortcut className="flex">
                        <span className="font-thin font-xs opacity-0.5 tracking-tight">
                          {showFiatBalance}
                        </span>
                        </MenubarShortcut>
                      </>
                  }
                </MenubarSubTrigger>
                {hideLowBalances === null ?
                        <MenubarItem 
                        onClick={() => enableHideLowBalance()}
                        >
                          Hide Low Balances
                      </MenubarItem>
                    :
                    <MenubarCheckboxItem 
                      checked
                      onClick={() => disableHideLowBalance()}
                      >
                          Hide Low Balances
                    </MenubarCheckboxItem>
                    }
                <MenubarSubContent>
                    {showFiatBalance !== 'USD' ?
                        <MenubarItem 
                        onClick={() => enableFiatDisplay("USD")}
                        >
                          Show USD
                      </MenubarItem>
                    :
                    <MenubarCheckboxItem 
                      checked
                      onClick={() => disableFiatDisplay()}
                      >
                          Show USD
                    </MenubarCheckboxItem>
                    }
                    {showFiatBalance !== 'EUR' ?
                        <MenubarItem 
                        onClick={() => enableFiatDisplay("EUR")}
                        >
                          Show EUR
                      </MenubarItem>
                    :
                    <MenubarCheckboxItem 
                      checked
                      onClick={() => disableFiatDisplay()}
                      >
                          Show EUR
                    </MenubarCheckboxItem>
                    }
                    {showFiatBalance !== 'GBP' ?
                        <MenubarItem 
                        onClick={() => enableFiatDisplay("GBP")}
                        >
                          Show GBP
                      </MenubarItem>
                    :
                    <MenubarCheckboxItem 
                      checked
                      onClick={() => disableFiatDisplay()}
                      >
                          Show GBP
                    </MenubarCheckboxItem>
                    }
                    {showFiatBalance !== 'CAD' ?
                        <MenubarItem 
                        onClick={() => enableFiatDisplay("CAD")}
                        >
                          Show CAD
                      </MenubarItem>
                    :
                    <MenubarCheckboxItem 
                      checked
                      onClick={() => disableFiatDisplay()}
                      >
                          Show CAD
                    </MenubarCheckboxItem>
                    }
                </MenubarSubContent>
              </MenubarSub> 
            </>
        )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
    </>

  );
}
