import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CalculationResults } from '@/utils/calculations';

interface ResultsCardProps {
  results: CalculationResults | null;
  accountCurrency: string;
}

const formatNumber = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

const formatCurrency = (value: number, currency: string): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'JPY' ? 'JPY' : 'USD',
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
};

export default function ResultsCard({ results, accountCurrency }: ResultsCardProps) {
  if (!results) {
    return (
      <Card className="border-2 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Calculation Results
          </CardTitle>
          <CardDescription>Your lot size will appear here</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-20 text-muted-foreground">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Enter trade parameters to calculate</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getRiskLevel = (lotSize: number): { label: string; color: string } => {
    if (lotSize < 0.01) {
      return { label: 'Very Conservative', color: 'bg-blue-500/20 text-blue-500 border-blue-500/50' };
    }
    if (lotSize < 0.05) {
      return { label: 'Conservative', color: 'bg-green-500/20 text-green-500 border-green-500/50' };
    }
    if (lotSize < 0.2) {
      return { label: 'Moderate', color: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' };
    }
    return { label: 'Aggressive', color: 'bg-red-500/20 text-red-500 border-red-500/50' };
  };

  const riskLevel = getRiskLevel(results.lotSize);

  return (
    <Card className="border-2 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          Calculation Results
        </CardTitle>
        <CardDescription>Recommended position sizing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary/30">
            <p className="text-sm text-muted-foreground mb-2">Recommended Lot Size</p>
            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-bold text-primary">{formatNumber(results.lotSize, 3)}</p>
              <Badge variant="outline" className={`${riskLevel.color} border`}>
                {riskLevel.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Standard lots (1 lot = {formatNumber(results.pipValue, 0)} units)
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50 border border-muted">
              <p className="text-xs text-muted-foreground mb-1">Risk Amount</p>
              <p className="text-lg font-semibold">
                {formatCurrency(results.riskAmount, accountCurrency)}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-muted/50 border border-muted">
              <p className="text-xs text-muted-foreground mb-1">Stop Loss (Pips)</p>
              <p className="text-lg font-semibold">{formatNumber(results.slPips, 2)}</p>
            </div>

            <div className="p-3 rounded-lg bg-muted/50 border border-muted">
              <p className="text-xs text-muted-foreground mb-1">Risk per Pip</p>
              <p className="text-lg font-semibold">
                {formatCurrency(results.riskPerPip, results.quoteCurrency)}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-muted/50 border border-muted">
              <p className="text-xs text-muted-foreground mb-1">Pip Value</p>
              <p className="text-lg font-semibold">
                {formatCurrency(results.pipValue, results.quoteCurrency)}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2 text-sm bg-muted/30 p-3 rounded-lg">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mini Lots (0.1):</span>
              <span className="font-semibold">{formatNumber(results.miniLots, 3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Micro Lots (0.01):</span>
              <span className="font-semibold">{formatNumber(results.microLots, 3)}</span>
            </div>
          </div>

          <Separator />

          <Alert className="border-blue-500/50 bg-blue-500/10">
            <AlertCircle className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-xs">
              <strong>Reminder:</strong> Always verify calculations independently and maintain strict risk management discipline. Past performance does not guarantee future results.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}
