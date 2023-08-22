"use client"

import React, { useEffect, useState } from 'react';
import {
    BonusCard,
    BonusCardContent,
    BonusCardDescription,
    BonusCardHeader,
    BonusCardTitle,
  } from "@/components/ui/bonus-card"
import { Button } from "@/components/ui/button"
import { Centrifuge } from 'centrifuge';
import { useWebsocketProvider } from "@/components/websocket-provider";
import { DataTable } from "@/components/ui/data-table-component/data-table"
import { columns } from "@/components/ui/data-table-component/columns"


export function PubWebsocket() {
    const [websocketState, setWebsocketState] = useState("");
    const [websocketDataEvent, setWebsocketDataEvent] = useState([]);
    const [websocketNewDataEvent, setWebsocketNewDataEvent] = useState([]);
    const [websocketDataNew, setWebsocketDataNew] = useState([]);
    const [gameState, setGameState] = useState("");
    const [websocketData, setWebsocketData] = useWebsocketProvider();

    useEffect(() => {
        async function connectWebsocket() {
          await setWebsocketState("connecting");
          if(websocketState !== "connected") {
          const client = new Centrifuge("wss://"+process.env.NEXT_PUBLIC_WEBSOCKET+"/connection/websocket");
          const sub = client.newSubscription('pubstates');
          sub.on('publication', function(ctx) {
              var tempData = ctx.data;
              setWebsocketData(tempData);
          });

          client.on("connected", function (ctx) {
            setWebsocketState("connected");
            console.log("Connected to websocket..");
          });
    
          client.on("disconnected", function (ctx) {
            setWebsocketState("disconnected");
            console.log("Disconnected to websocket..");
          });
    
          client.on("error", function (ctx) {
            setWebsocketState("error");
            console.log(ctx);
          });
          
          client.on('publication', function(ctx) {
            const channel = ctx.channel;
            const payload = JSON.stringify(ctx.data);
        });
            sub.subscribe();
            client.connect();
        }
        }
        connectWebsocket();
      }, []);


  return (
    <></>
  )
}