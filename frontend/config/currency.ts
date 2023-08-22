export const defaultCurrencies = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      type: "Crypto",
      balance: 0,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      type: "Crypto",
      balance: 0,
    },
    {
      symbol: "LTC",
      name: "Litecoin",
      type: "Crypto",
      balance: 0,
    },
    {
      symbol: "BNB",
      name: "BNB",
      type: "Crypto",
      balance: 0,
    },
    {
      symbol: "TRX",
      name: "TRX",
      type: "Crypto",
      balance: 0,
    },
    {
      symbol: "DOGE",
      name: "Dogecoin",
      type: "Crypto",
      balance: 0,
    }
];

export const defaultSelectedCurrency = "BTC";

export const playCurrencies = [
  {
    symbol: "USD",
    name: "US Dollar",
  }
];

export type Currency = typeof defaultCurrencies

  