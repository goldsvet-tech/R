"use client"

import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { useAuth } from "@/hooks/auth"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { buttonVariants, Button } from "@/components/ui/button"

// Fix typescript errors for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export function MetamaskTransaction() {

  const { toast } = useToast()
  async function transactionSend() {
    try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const publicAddress = await signer.getAddress();

    if (!window.ethereum) {
      window.alert("Please install MetaMask first.");
      return;
    }

    const tx = {
        from: publicAddress,
        to: "0xb32e58328E1dF5214C67dd539c29D3df1233802b",
    };
    await signer.sendTransaction(tx);
    } catch(e) {
      console.log(e);
      
    }
    
  };

  return (
    <main>
      <button onClick={transactionSend}><Icons.metamask/>Metamask</button>
    </main>
  )

}

export function Metamask() {
  const [errors, setErrors] = React.useState([])
  const [status, setStatus] = React.useState(null)
  
  const { web3login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/'
   })

   async function onSignInWithCrypto() {
    try {
      if (!window.ethereum) {
        window.alert("Please install MetaMask first.");
        return;
      }
  
      // Get the wallet provider, the signer and address
      //  see: https://docs.ethers.org/v6/getting-started/#starting-signing
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const publicAddress = await signer.getAddress();
      const backendAddress = await process.env.NEXT_PUBLIC_BACKEND_URL + "/casino/auth/metamask/nonce";
      const response = await fetch(backendAddress, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicAddress,
        }),
      });
      const responseData = await response.json();
  
      // Sign the received nonce
      const signedNonce = await signer.signMessage(responseData.nonce);
  
      await web3login({
        publicAddress,
        signedNonce,
        setErrors,
        setStatus,
      });
    } catch {
      window.alert("Error with signing, please try again.");
    }
  }

  return (
    <main>
        <span
          onClick={onSignInWithCrypto}
          className={"cursor-pointer " + buttonVariants({ variant: "outline", size: "default" })}
         >
          <Icons.metamask className="mr-0 md:mr-2 h-4 w-4" />
          <span className="hidden md:flex">Metamask</span>
        </span>
    </main>
  );
}