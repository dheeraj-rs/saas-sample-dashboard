import React, { createContext, useContext, useEffect, useState } from "react"
import { FONTS } from "./fonts"
import { getFontVariable } from "./font-utils"

type FontContextType = {
    currentFont: string
    setFont: (fontValue: string) => void
    availableFonts: typeof FONTS
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export function useFontContext() {
    const context = useContext(FontContext)
    if (!context) {
        throw new Error("useFontContext must be used within FontProvider")
    }
    return context
}

type FontProviderProps = {
    children: React.ReactNode
    defaultFont?: string
}

export function FontProvider({ children, defaultFont = "inter" }: FontProviderProps) {
    const [currentFont, setCurrentFont] = useState(defaultFont)

    useEffect(() => {
        const fontVariable = getFontVariable(currentFont)
        document.documentElement.style.setProperty("--font-sans", `var(${fontVariable})`)
    }, [currentFont])

    const setFont = (fontValue: string) => {
        const font = FONTS.find((f) => f.value === fontValue)
        if (font) {
            setCurrentFont(fontValue)
        }
    }

    return (
        <FontContext.Provider value={{ currentFont, setFont, availableFonts: FONTS }}>
            {children}
        </FontContext.Provider>
    )
}
