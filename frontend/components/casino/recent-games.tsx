"use client"

import React, { useEffect, useState } from 'react';
import { useWebsocketProvider } from "@/components/websocket-provider";
import { DataTable } from "@/components/ui/data-table-component/data-table"
import { columns } from "@/components/ui/data-table-component/columns"
import axios, {AxiosError} from 'axios';

  

export function RecentGames() {
  
    const [websocketState, setWebsocketState] = useState("");
    const [recentGamesData, setRecentGamesData] = useState([]);
    const [websocketData, setWebsocketData] = useWebsocketProvider();
    const axiosRequest = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
      timeout: 5000,
      withCredentials: true,
    });

    useEffect(() => {
        axiosRequest.get('/casino/data/recent-games')
        .then(function(response){
            console.log(response.data.data);
            setRecentGamesData(response.data.data);
        })
        .catch(function(error){
          console.log(error);

        });
    }, []);
    useEffect(() => {
      if(websocketData.type === "recent-games") {
        var tempData = websocketData;
        var tempData2 = recentGamesData;
        if(recentGamesData.length !== 0) {
          if(tempData2.length > 50) {
            tempData2 = tempData2.slice(0,25);
          }
          var newestWs = [tempData, ...tempData2];
          setRecentGamesData(newestWs);
        } else {
          setRecentGamesData([tempData]);
        }
      }
    }, [websocketData]);

  return (
        <div className="w-full h-full min-h-[100px] md:min-h-[100px] mx-auto my-8 rounded-lg">
            <DataTable initialPageSize={'5'} columns={columns} data={recentGamesData} />
        </div>
  )
}