import { symbolsByCategory, type Symbol } from '@/config/symbolsConfig';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SymbolSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SymbolSelector({ value, onChange }: SymbolSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select symbol" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(symbolsByCategory).map(([category, symbols]) => (
          <div key={category}>
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              {category}
            </div>
            {symbols.map((symbol: Symbol) => (
              <SelectItem key={symbol.id} value={symbol.id}>
                {symbol.label}
              </SelectItem>
            ))}
          </div>
        ))}
      </SelectContent>
    </Select>
  );
}
