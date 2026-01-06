import * as React from "react"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/page/dashbord/components/app-sidebar"
import { SiteHeader } from "@/page/dashbord/components/site-header"
import { DashboardLayoutProps } from "./dashboard-layout.types"

export function DashboardLayout({
    sidebarConfig,
    headerConfig,
    children,
    className,
}: DashboardLayoutProps) {
    return (
        <SidebarProvider
            className={`flex ${className || ""}`}
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 64)",
                    "--header-height": "calc(var(--spacing) * 12 + 1px)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="sidebar" config={sidebarConfig} />
            <SidebarInset>
                <SiteHeader config={headerConfig} />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
