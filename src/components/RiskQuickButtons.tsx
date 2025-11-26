import { Button } from '@/components/ui/button';

interface RiskQuickButtonsProps {
  riskType: 'percentage' | 'fixed';
  onRiskSelect: (value: number) => void;
}

export default function RiskQuickButtons({ riskType, onRiskSelect }: RiskQuickButtonsProps) {
  if (riskType === 'fixed') return null;

  const riskValues = [0.5, 1, 2, 3];

  return (
    <div className="flex gap-2 flex-wrap">
      <span className="text-xs text-muted-foreground w-full mb-1">Quick preset:</span>
      {riskValues.map(value => (
        <Button
          key={value}
          variant="outline"
          size="sm"
          onClick={() => onRiskSelect(value)}
          className="text-xs"
        >
          {value}%
        </Button>
      ))}
    </div>
  );
}
