import { useState, useCallback } from 'react';
import { Calculator, Zap } from 'lucide-react';
import { calculateAll, CalculationInputs, CalculationResults } from '@/utils/calculations';
import CalculatorForm, { FormData } from './CalculatorForm';
import ResultsCard from './ResultsCard';
import AdSpace from './AdSpace';

// Ad slot configuration - map slot names to ad content
const adSlots: Record<string, { imgUrl: string; clickUrl: string }> = {
  'Header Banner - 728x90': {
    imgUrl: 'https://central.ck-cdn.com/vantage-fx/2024-01-23/728x90_2a981aab.png',
    clickUrl: 'https://vigco.co/la-com/mLjCT7yU'
  },
  'Middle Banner - 728x90': {
    imgUrl: 'https://central.ck-cdn.com/vantage-fx/2023-09-15/728%20x%2090_D6_EN_4e485dc4.png',
    clickUrl: 'https://vigco.co/la-com/mLjCT7yU'
  },
  'Footer Banner - 728x90': {
    imgUrl: 'https://central.ck-cdn.com/vantage-fx/2021-11-16/6%20-%20728x90_6cdf40ab.jpg',
    clickUrl: 'https://vigco.co/la-com/mLjCT7yU'
  }
};

export default function ForexCalculator() {
  const [calculationResults, setCalculationResults] = useState<CalculationResults | null>(null);
  const [accountCurrency, setAccountCurrency] = useState('USD');

  const handleCalculate = useCallback((formData: FormData) => {
    setAccountCurrency(formData.accountCurrency);

    const inputs: CalculationInputs = {
      accountBalance: formData.accountBalance,
      riskType: formData.riskType,
      riskValue: formData.riskValue,
      symbol: formData.symbol,
      entryPrice: formData.entryPrice,
      stopLossPrice: formData.stopLossPrice,
    };

    const results = calculateAll(inputs);
    setCalculationResults(results);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Pro Lot Size Calculator</h1>
                <p className="text-muted-foreground text-xs sm:text-sm mt-0.5 sm:mt-1">Professional position sizing for Forex & CFD trading</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground px-3 py-2 rounded-lg bg-muted/50">
              <Zap className="w-4 h-4" />
              <span>Live calculations</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <AdSpace 
            imgUrl={adSlots['Header Banner - 728x90'].imgUrl}
            clickUrl={adSlots['Header Banner - 728x90'].clickUrl}
            height="h-28" 
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <CalculatorForm onCalculate={handleCalculate} />
          <ResultsCard results={calculationResults} accountCurrency={accountCurrency} />
        </div>

        <div className="mt-6">
          <AdSpace 
            imgUrl={adSlots['Middle Banner - 728x90'].imgUrl}
            clickUrl={adSlots['Middle Banner - 728x90'].clickUrl}
            height="h-24" 
          />
        </div>

        <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3 sm:p-4 rounded-lg border border-muted bg-card/50">
            <h3 className="font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></span>
              Quick Start
            </h3>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              Fill in your account details, select a symbol, and enter your entry and stop loss prices. Calculations update instantly.
            </p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg border border-muted bg-card/50">
            <h3 className="font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
              Risk Management
            </h3>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              Choose between percentage-based or fixed amount risk. Use preset buttons (0.5%, 1%, 2%, 3%) for quick selection.
            </p>
          </div>
          <div className="p-3 sm:p-4 rounded-lg border border-muted bg-card/50">
            <h3 className="font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0"></span>
              Supported Assets
            </h3>
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              Forex majors & minors, metals (gold, silver), crypto (Bitcoin, Ethereum), and indices (US30, NAS100, etc).
            </p>
          </div>
        </div>

        <div className="mt-6">
          <AdSpace 
            imgUrl={adSlots['Footer Banner - 728x90'].imgUrl}
            clickUrl={adSlots['Footer Banner - 728x90'].clickUrl}
            height="h-24" 
          />
        </div>

        <footer className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-muted text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Backed by <span className="font-semibold text-foreground">40WRLD STUDIOS</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
