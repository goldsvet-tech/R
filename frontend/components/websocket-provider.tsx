'use client';

import React from 'react';

const WebsocketContext = React.createContext<
  [any, React.Dispatch<React.SetStateAction<any>>] | undefined
>(undefined);

export function WebsocketProvider({ children }: { children: React.ReactNode }) {
  const [websocketData, setWebsocketData] = React.useState([]);
  return (
    <WebsocketContext.Provider value={[websocketData, setWebsocketData]}>
      {children}
    </WebsocketContext.Provider>
  );
}

export function useWebsocketProvider() {
  const context = React.useContext(WebsocketContext);
  if (context === undefined) {
    throw new Error('useWebsocketProvider must be used within a WebsocketProvider');
  }
  return context;
}