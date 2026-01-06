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
import { TeamSwitcher } from "@/page/event-dashbord/components/team-switcher"
import { SidebarConfig } from "@/components/layouts/dashboard-layout.types"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  config: SidebarConfig
}

export function AppSidebar({ config, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" className="h-screen border-r z-50" {...props}>
      <SidebarHeader className="h-(--header-height) border-b">
        <TeamSwitcher teams={config.teams || []} />
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
