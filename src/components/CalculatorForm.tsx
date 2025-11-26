import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { DollarSign, TrendingUp } from 'lucide-react';
import SymbolSelector from './SymbolSelector';
import RiskQuickButtons from './RiskQuickButtons';

interface CalculatorFormProps {
  onCalculate: (data: FormData) => void;
}

export interface FormData {
  accountCurrency: string;
  accountBalance: number;
  riskType: 'percentage' | 'fixed';
  riskValue: number;
  symbol: string;
  entryPrice: number;
  stopLossPrice: number;
}

const ACCOUNT_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'NZD'];

export default function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [formData, setFormData] = useState<FormData>({
    accountCurrency: 'USD',
    accountBalance: 10000,
    riskType: 'percentage',
    riskValue: 1,
    symbol: 'EURUSD',
    entryPrice: 1.1000,
    stopLossPrice: 1.0950,
  });

  useEffect(() => {
    onCalculate(formData);
  }, []);

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string | number) => {
      const updatedData = { ...formData, [field]: value };
      setFormData(updatedData);
      onCalculate(updatedData);
    },
    [formData, onCalculate]
  );

  const handleRiskSelect = (value: number) => {
    handleInputChange('riskValue', value);
  };

  return (
    <Card className="border-2 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Calculator Input
        </CardTitle>
        <CardDescription>Enter your trade parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="accountCurrency">Account Currency</Label>
          <Select value={formData.accountCurrency} onValueChange={(value) => handleInputChange('accountCurrency', value)}>
            <SelectTrigger id="accountCurrency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ACCOUNT_CURRENCIES.map(curr => (
                <SelectItem key={curr} value={curr}>
                  {curr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accountBalance">Account Balance</Label>
          <Input
            id="accountBalance"
            type="number"
            step="1"
            min="0"
            value={formData.accountBalance}
            onChange={(e) => handleInputChange('accountBalance', parseFloat(e.target.value) || 0)}
            placeholder="10000"
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <Label>Risk Type</Label>
          <Tabs
            value={formData.riskType}
            onValueChange={(value) => handleInputChange('riskType', value as 'percentage' | 'fixed')}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="percentage">% of Account</TabsTrigger>
              <TabsTrigger value="fixed">Fixed Amount</TabsTrigger>
            </TabsList>

            <TabsContent value="percentage" className="space-y-2 mt-3">
              <Label htmlFor="riskPercent">Risk Percentage (%)</Label>
              <Input
                id="riskPercent"
                type="number"
                step="0.1"
                min="0"
                value={formData.riskValue}
                onChange={(e) => handleInputChange('riskValue', parseFloat(e.target.value) || 0)}
                placeholder="1"
              />
              <RiskQuickButtons
                riskType={formData.riskType}
                onRiskSelect={handleRiskSelect}
              />
            </TabsContent>

            <TabsContent value="fixed" className="space-y-2 mt-3">
              <Label htmlFor="riskFixed">Risk Amount ({formData.accountCurrency})</Label>
              <Input
                id="riskFixed"
                type="number"
                step="1"
                min="0"
                value={formData.riskValue}
                onChange={(e) => handleInputChange('riskValue', parseFloat(e.target.value) || 0)}
                placeholder="100"
              />
            </TabsContent>
          </Tabs>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="symbol">Symbol</Label>
          <SymbolSelector
            value={formData.symbol}
            onChange={(value) => handleInputChange('symbol', value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="entryPrice">Entry Price</Label>
            <Input
              id="entryPrice"
              type="number"
              step="0.0001"
              min="0"
              value={formData.entryPrice}
              onChange={(e) => handleInputChange('entryPrice', parseFloat(e.target.value) || 0)}
              placeholder="1.1000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stopLoss">Stop Loss Price</Label>
            <Input
              id="stopLoss"
              type="number"
              step="0.0001"
              min="0"
              value={formData.stopLossPrice}
              onChange={(e) => handleInputChange('stopLossPrice', parseFloat(e.target.value) || 0)}
              placeholder="1.0950"
            />
          </div>
        </div>

        <div className="p-3 rounded-lg bg-muted/50 border border-muted">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>
              Stop Loss Distance: <strong>{Math.abs(formData.entryPrice - formData.stopLossPrice).toFixed(4)}</strong>
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
