import { Check } from "lucide-react"
import { useFontContext } from "@/components/font"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function FontSelector() {
    const { currentFont, setFont, availableFonts } = useFontContext()

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="font-selector" className="text-sm font-medium">
                Font:
            </label>
            <Select value={currentFont} onValueChange={setFont}>
                <SelectTrigger id="font-selector" className="w-[180px]">
                    <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                    {availableFonts.map((font) => (
                        <SelectItem
                            key={font.value}
                            value={font.value}
                            style={{ fontFamily: font.fontFamily }}
                        >
                            <div className="flex items-center justify-between w-full">
                                <span>{font.name}</span>
                                {currentFont === font.value && (
                                    <Check className="ml-2 h-4 w-4" />
                                )}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
