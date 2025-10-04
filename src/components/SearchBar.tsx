import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onFilterClick?: () => void;
}

export const SearchBar = ({ value, onChange, onFilterClick }: SearchBarProps) => {
  return (
    <div className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="text"
          placeholder="Город, район или адрес..."
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="pl-10 h-12 bg-background border-input"
        />
      </div>
      <Button 
        variant="outline" 
        size="icon"
        className="h-12 w-12 shrink-0"
        onClick={onFilterClick}
      >
        <Icon name="SlidersHorizontal" size={20} />
      </Button>
    </div>
  );
};
