export const FONTS = [
  {
    name: "Inter",
    value: "inter",
    variable: "--font-inter",
    fontFamily: "'Inter', sans-serif",
    type: "sans",
  },
  {
    name: "Noto Sans",
    value: "noto-sans",
    variable: "--font-noto-sans",
    fontFamily: "'Noto Sans', sans-serif",
    type: "sans",
  },
  {
    name: "Nunito Sans",
    value: "nunito-sans",
    variable: "--font-nunito-sans",
    fontFamily: "'Nunito Sans', sans-serif",
    type: "sans",
  },
  {
    name: "Figtree",
    value: "figtree",
    variable: "--font-figtree",
    fontFamily: "'Figtree', sans-serif",
    type: "sans",
  },
  {
    name: "Roboto",
    value: "roboto",
    variable: "--font-roboto",
    fontFamily: "'Roboto', sans-serif",
    type: "sans",
  },
  {
    name: "Raleway",
    value: "raleway",
    variable: "--font-raleway",
    fontFamily: "'Raleway', sans-serif",
    type: "sans",
  },
  {
    name: "DM Sans",
    value: "dm-sans",
    variable: "--font-dm-sans",
    fontFamily: "'DM Sans', sans-serif",
    type: "sans",
  },
  {
    name: "Public Sans",
    value: "public-sans",
    variable: "--font-public-sans",
    fontFamily: "'Public Sans', sans-serif",
    type: "sans",
  },
  {
    name: "Outfit",
    value: "outfit",
    variable: "--font-outfit",
    fontFamily: "'Outfit', sans-serif",
    type: "sans",
  },
  {
    name: "JetBrains Mono",
    value: "jetbrains-mono",
    variable: "--font-jetbrains-mono",
    fontFamily: "'JetBrains Mono', monospace",
    type: "mono",
  },
] as const

export type Font = (typeof FONTS)[number]
