export interface SymbolConfig {
  pipSize: number;
  contractSize: number;
  quoteCurrency: string;
}

export interface Symbol {
  id: string;
  label: string;
  category: string;
}

export const symbolsConfig: Record<string, SymbolConfig> = {
  EURUSD: { pipSize: 0.0001, contractSize: 100000, quoteCurrency: 'USD' },
  GBPUSD: { pipSize: 0.0001, contractSize: 100000, quoteCurrency: 'USD' },
  AUDUSD: { pipSize: 0.0001, contractSize: 100000, quoteCurrency: 'USD' },
  NZDUSD: { pipSize: 0.0001, contractSize: 100000, quoteCurrency: 'USD' },
  USDCHF: { pipSize: 0.0001, contractSize: 100000, quoteCurrency: 'CHF' },
  USDJPY: { pipSize: 0.01, contractSize: 100000, quoteCurrency: 'JPY' },
  USDCAD: { pipSize: 0.0001, contractSize: 100000, quoteCurrency: 'CAD' },
  EURJPY: { pipSize: 0.01, contractSize: 100000, quoteCurrency: 'JPY' },
  EURGBP: { pipSize: 0.0001, contractSize: 100000, quoteCurrency: 'GBP' },
  GBPJPY: { pipSize: 0.01, contractSize: 100000, quoteCurrency: 'JPY' },
  AUDJPY: { pipSize: 0.01, contractSize: 100000, quoteCurrency: 'JPY' },
  CHFJPY: { pipSize: 0.01, contractSize: 100000, quoteCurrency: 'JPY' },
  XAUUSD: { pipSize: 0.1, contractSize: 100, quoteCurrency: 'USD' },
  XAGUUSD: { pipSize: 0.001, contractSize: 5000, quoteCurrency: 'USD' },
  BTCUSD: { pipSize: 1, contractSize: 1, quoteCurrency: 'USD' },
  ETHUSD: { pipSize: 0.1, contractSize: 10, quoteCurrency: 'USD' },
  US30: { pipSize: 1, contractSize: 1, quoteCurrency: 'USD' },
  NAS100: { pipSize: 0.1, contractSize: 20, quoteCurrency: 'USD' },
  SPX500: { pipSize: 0.1, contractSize: 50, quoteCurrency: 'USD' },
  GER40: { pipSize: 1, contractSize: 1, quoteCurrency: 'EUR' },
};

export const symbolsByCategory: Record<string, Symbol[]> = {
  'Forex Majors': [
    { id: 'EURUSD', label: 'EUR/USD', category: 'Forex Majors' },
    { id: 'GBPUSD', label: 'GBP/USD', category: 'Forex Majors' },
    { id: 'AUDUSD', label: 'AUD/USD', category: 'Forex Majors' },
    { id: 'NZDUSD', label: 'NZD/USD', category: 'Forex Majors' },
    { id: 'USDCHF', label: 'USD/CHF', category: 'Forex Majors' },
    { id: 'USDJPY', label: 'USD/JPY', category: 'Forex Majors' },
    { id: 'USDCAD', label: 'USD/CAD', category: 'Forex Majors' },
  ],
  'Forex Minors': [
    { id: 'EURJPY', label: 'EUR/JPY', category: 'Forex Minors' },
    { id: 'EURGBP', label: 'EUR/GBP', category: 'Forex Minors' },
    { id: 'GBPJPY', label: 'GBP/JPY', category: 'Forex Minors' },
    { id: 'AUDJPY', label: 'AUD/JPY', category: 'Forex Minors' },
    { id: 'CHFJPY', label: 'CHF/JPY', category: 'Forex Minors' },
  ],
  'Metals': [
    { id: 'XAUUSD', label: 'Gold (XAU/USD)', category: 'Metals' },
    { id: 'XAGUUSD', label: 'Silver (XAG/USD)', category: 'Metals' },
  ],
  'Crypto': [
    { id: 'BTCUSD', label: 'Bitcoin (BTC/USD)', category: 'Crypto' },
    { id: 'ETHUSD', label: 'Ethereum (ETH/USD)', category: 'Crypto' },
  ],
  'Indices': [
    { id: 'US30', label: 'US 30 (Dow Jones)', category: 'Indices' },
    { id: 'NAS100', label: 'NAS 100 (Nasdaq)', category: 'Indices' },
    { id: 'SPX500', label: 'SPX 500 (S&P 500)', category: 'Indices' },
    { id: 'GER40', label: 'GER 40 (DAX)', category: 'Indices' },
  ],
};

export const allSymbols: Symbol[] = Object.values(symbolsByCategory).flat();
