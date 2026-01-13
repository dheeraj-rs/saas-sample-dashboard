import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search for events or organizations..." }: SearchBarProps) {
    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-6 text-base bg-card border-2 border-border rounded-xl
                     focus:border-primary focus:ring-2 focus:ring-primary/20
                     transition-all duration-300 ease-out
                     hover:border-primary/50 hover:shadow-lg
                     placeholder:text-muted-foreground"
                />
            </div>
        </div>
    );
}
