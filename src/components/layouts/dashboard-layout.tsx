import * as React from "react"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { DashboardLayoutProps } from "./dashboard-layout.types"

export function DashboardLayout({
    sidebar,
    header,
    children,
    className,
}: DashboardLayoutProps) {
    return (
        <SidebarProvider
            className={`flex ${className || ""}`}
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 64)",
                    "--header-height": "calc(var(--spacing) * 14 + 1px)",
                } as React.CSSProperties
            }
        >
            {sidebar}
            <SidebarInset>
                {header}
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
