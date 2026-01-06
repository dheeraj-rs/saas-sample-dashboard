import * as React from "react"
import {
  IconInnerShadowTop,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavDocuments } from "@/page/event-dashbord/components/nav-documents"
import { NavMain } from "@/page/event-dashbord/components/nav-main"
import { NavSecondary } from "@/page/event-dashbord/components/nav-secondary"
import { NavUser } from "@/page/event-dashbord/components/nav-user"
import { SidebarConfig } from "@/components/layouts/dashboard-layout.types"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  config: SidebarConfig
}

export function AppSidebar({ config, ...props }: AppSidebarProps) {
  const LogoIcon = config.logo?.icon || IconInnerShadowTop
  const logoText = config.logo?.text || "Acme Inc."
  const logoHref = config.logo?.href || "#"

  return (
    <Sidebar collapsible="icon" className="h-screen border-r z-50" {...props}>
      <SidebarHeader className="h-(--header-height) border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href={logoHref}>
                <LogoIcon className="!size-5" />
                <span className="text-base font-semibold">{logoText}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={config.navMain} />
        <NavDocuments items={config.documents || []} />
        <NavSecondary items={config.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={config.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
