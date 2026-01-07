import * as React from "react"
import {
    IconBuilding,
    IconBriefcase,
    IconCoin,
    IconUserCheck,
    IconHelp,
    IconSearch,
    IconSettings,
    IconUsers,
    IconCalendar,
    IconClipboardList,
    IconFolders,
    IconReportAnalytics,
    IconTrendingUp,
    IconChartPie,
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
            name: "Global Operations",
            logo: IconBuilding,
            plan: "Enterprise",
        },
        {
            name: "Regional Office",
            logo: IconFolders,
            plan: "Professional",
        },
        {
            name: "Startup Hub",
            logo: IconTrendingUp,
            plan: "Business",
        },
    ],
    user: {
        name: "John Manager",
        email: "john@orgmanager.com",
        avatar: "/avatars/manager.jpg",
    },
    navMain: [
        {
            title: "Overview",
            url: "#",
            icon: IconChartPie,
        },
        {
            title: "Workforce",
            url: "#",
            icon: IconUsers,
        },
    ],
    navClouds: [
        {
            title: "Human Resources",
            icon: IconUserCheck,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Employees",
                    url: "#",
                },
                {
                    title: "Recruitment",
                    url: "#",
                },
                {
                    title: "Onboarding",
                    url: "#",
                },
            ],
        },
        {
            title: "Finance",
            icon: IconCoin,
            url: "#",
            items: [
                {
                    title: "Budget Planning",
                    url: "#",
                },
                {
                    title: "Expenses",
                    url: "#",
                },
                {
                    title: "Payroll",
                    url: "#",
                },
            ],
        },
        {
            title: "Projects",
            icon: IconBriefcase,
            url: "#",
            items: [
                {
                    title: "Active Projects",
                    url: "#",
                },
                {
                    title: "Completed",
                    url: "#",
                },
                {
                    title: "Planning",
                    url: "#",
                },
            ],
        },
        {
            title: "Departments",
            icon: IconFolders,
            url: "#",
            items: [
                {
                    title: "Engineering",
                    url: "#",
                },
                {
                    title: "Marketing",
                    url: "#",
                },
                {
                    title: "Sales",
                    url: "#",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Admin Settings",
            url: "#",
            icon: IconSettings,
        },
        {
            title: "Support Center",
            url: "#",
            icon: IconHelp,
        },
        {
            title: "Global Search",
            url: "#",
            icon: IconSearch,
        },
    ],
    documents: [
        {
            name: "Task Manager",
            url: "#",
            icon: IconClipboardList,
        },
        {
            name: "Performance Reports",
            url: "#",
            icon: IconReportAnalytics,
        },
        {
            name: "Company Calendar",
            url: "#",
            icon: IconCalendar,
        },
    ],
}

export function OrgSidebar() {
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
