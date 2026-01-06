import { FONTS } from "./fonts"

/**
 * Get the CSS variable name for a font by its value
 * @param fontValue - The font value (e.g., "inter", "roboto")
 * @returns The CSS variable name (e.g., "--font-inter")
 */
export function getFontVariable(fontValue: string): string {
    const font = FONTS.find((f) => f.value === fontValue)
    return font?.variable || "--font-inter" // Default to Inter
}

/**
 * Get the font family string for a font by its value
 * @param fontValue - The font value (e.g., "inter", "roboto")
 * @returns The font family string (e.g., "'Inter', sans-serif")
 */
export function getFontFamily(fontValue: string): string {
    const font = FONTS.find((f) => f.value === fontValue)
    return font?.fontFamily || "'Inter', sans-serif" // Default to Inter
}

/**
 * Apply a font to an element using CSS variables
 * @param fontValue - The font value (e.g., "inter", "roboto")
 * @returns An object with the fontFamily CSS property
 */
export function applyFont(fontValue: string) {
    return {
        fontFamily: `var(${getFontVariable(fontValue)})`,
    }
}
