import * as React from "react"
import {
    IconCamera,
    IconDatabase,
    IconFileAi,
    IconFileDescription,
    IconFileWord,
    IconFolder,
    IconHelp,
    IconListDetails,
    IconPresentation,
    IconReport,
    IconSearch,
    IconSettings,
    IconDashboard,
} from "@tabler/icons-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { NavClouds } from "@/components/custum-ui/sidebar-list/nav-clouds"
import { NavDocuments } from "@/components/custum-ui/sidebar-list/nav-documents"
import { NavMain } from "@/components/custum-ui/sidebar-list/nav-main"
import { NavSecondary } from "@/components/custum-ui/sidebar-list/nav-secondary"
import { NavUser } from "@/components/custum-ui/sidebar-list/nav-user"
import { TeamSwitcher } from "@/components/custum-ui/sidebar-list/team-switcher"

const sidebarData = {
    teams: [
        {
            name: "Acme Inc",
            logo: IconPresentation,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: IconFolder,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: IconDatabase,
            plan: "Free",
        },
    ],
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: IconDashboard,
        },
        {
            title: "Registration",
            url: "#",
            icon: IconListDetails,
        },
    ],
    navClouds: [
        {
            title: "Capture",
            icon: IconCamera,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Proposal",
            icon: IconFileDescription,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
        {
            title: "Prompts",
            icon: IconFileAi,
            url: "#",
            items: [
                {
                    title: "Active Proposals",
                    url: "#",
                },
                {
                    title: "Archived",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
        },
        {
            title: "Get Help",
            url: "#",
            icon: IconHelp,
        },
        {
            title: "Search",
            url: "#",
            icon: IconSearch,
        },
    ],
    documents: [
        {
            name: "Data Library",
            url: "#",
            icon: IconDatabase,
        },
        {
            name: "Reports",
            url: "#",
            icon: IconReport,
        },
        {
            name: "Word Assistant",
            url: "#",
            icon: IconFileWord,
        },
    ],
}

export function EventSidebar() {
    return (
        <Sidebar collapsible="icon" className="h-screen border-r z-50" variant="sidebar">
            <SidebarHeader className="h-(--header-height) border-b">
                <TeamSwitcher teams={sidebarData.teams || []} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={sidebarData.navMain} />
                {sidebarData.navClouds && sidebarData.navClouds.length > 0 && (
                    <NavClouds items={sidebarData.navClouds} />
                )}
                <NavDocuments items={sidebarData.documents || []} />
                <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={sidebarData.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
