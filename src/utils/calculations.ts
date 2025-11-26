import { symbolsConfig } from '@/config/symbolsConfig';

export interface CalculationInputs {
  accountBalance: number;
  riskType: 'percentage' | 'fixed';
  riskValue: number;
  symbol: string;
  entryPrice: number;
  stopLossPrice: number;
}

export interface CalculationResults {
  riskAmount: number;
  slPips: number;
  pipValue: number;
  lotSize: number;
  miniLots: number;
  microLots: number;
  riskPerPip: number;
  quoteCurrency: string;
}

export const calculateRiskAmount = (
  balance: number,
  riskType: 'percentage' | 'fixed',
  riskValue: number
): number => {
  if (riskType === 'percentage') {
    return balance * (riskValue / 100);
  }
  return riskValue;
};

export const calculateSlPips = (
  entryPrice: number,
  stopLossPrice: number,
  pipSize: number
): number => {
  if (pipSize === 0) return 0;
  return Math.abs(entryPrice - stopLossPrice) / pipSize;
};

export const calculatePipValue = (
  contractSize: number,
  pipSize: number
): number => {
  return contractSize * pipSize;
};

export const calculateLotSize = (
  riskAmount: number,
  slPips: number,
  pipValue: number
): number => {
  if (slPips === 0 || pipValue === 0) return 0;
  return riskAmount / (slPips * pipValue);
};

export const calculateAll = (inputs: CalculationInputs): CalculationResults | null => {
  const config = symbolsConfig[inputs.symbol];

  if (!config) {
    return null;
  }

  if (
    inputs.accountBalance <= 0 ||
    inputs.riskValue <= 0 ||
    inputs.entryPrice <= 0 ||
    inputs.stopLossPrice <= 0 ||
    inputs.entryPrice === inputs.stopLossPrice
  ) {
    return null;
  }

  const riskAmount = calculateRiskAmount(inputs.accountBalance, inputs.riskType, inputs.riskValue);
  const slPips = calculateSlPips(inputs.entryPrice, inputs.stopLossPrice, config.pipSize);
  const pipValue = calculatePipValue(config.contractSize, config.pipSize);
  const lotSize = calculateLotSize(riskAmount, slPips, pipValue);
  const riskPerPip = riskAmount / slPips;

  return {
    riskAmount,
    slPips,
    pipValue,
    lotSize,
    miniLots: lotSize * 10,
    microLots: lotSize * 100,
    riskPerPip,
    quoteCurrency: config.quoteCurrency,
  };
};
