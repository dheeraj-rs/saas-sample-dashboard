import { FONTS } from "./fonts"

export function getFontVariable(fontValue: string): string {
    const font = FONTS.find((f) => f.value === fontValue)
    return font?.variable || "--font-inter"
}

export function getFontFamily(fontValue: string): string {
    const font = FONTS.find((f) => f.value === fontValue)
    return font?.fontFamily || "'Inter', sans-serif"
}

export function applyFont(fontValue: string) {
    return {
        fontFamily: `var(${getFontVariable(fontValue)})`,
    }
}
