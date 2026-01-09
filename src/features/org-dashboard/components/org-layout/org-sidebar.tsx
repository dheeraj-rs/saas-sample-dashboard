import {
    IconDashboard,
    IconCalendarEvent,
    IconUsers,
    IconUsersGroup,
    IconSettings,
    IconCreditCard,
    IconChartBar,
    IconBell,
    IconShield,
    IconHelp,
    IconSearch,
    IconBuilding,
    IconFolders,
    IconTrendingUp,
    IconCalendar,
} from "@tabler/icons-react"
import { useLocation } from "react-router"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { NavCloudList } from "@/components/common/sidebar-listing-models/nav-cloud-list"
import { NavMainList } from "@/components/common/sidebar-listing-models/nav-main-list"
import { NavSecondaryList } from "@/components/common/sidebar-listing-models/nav-secondary-list"
import { UserProfile } from "@/components/common/sidebar-listing-models/user-profile"
import { OrgSwitchDropdown } from "./org-switch-dropdown"

const sidebarData = {
    organizations: [
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
    events: [
        {
            name: "Tech Conference",
            logo: IconCalendar,
            plan: "Active",
        },
        {
            name: "Annual Summit",
            logo: IconCalendar,
            plan: "Draft",
        },
        {
            name: "Workshop Series",
            logo: IconCalendar,
            plan: "Completed",
        },
    ],
    user: {
        name: "John Manager",
        email: "john@orgmanager.com",
        avatar: "/avatars/manager.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/org-dashboard",
            icon: IconDashboard,
        },
        {
            title: "Manage Events",
            url: "/org-dashboard/events",
            icon: IconCalendarEvent,
        },
        {
            title: "Manage Users",
            url: "/org-dashboard/users",
            icon: IconUsers,
        },
    ],
    navClouds: [
        {
            title: "Teams & Roles",
            icon: IconUsersGroup,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Team Members",
                    url: "/org-dashboard/team-members",
                },
                {
                    title: "Roles & Permissions",
                    url: "/org-dashboard/roles-permissions",
                },
                {
                    title: "Departments",
                    url: "/org-dashboard/departments",
                },
            ],
        },
        {
            title: "Settings & Configuration",
            icon: IconSettings,
            url: "#",
            items: [
                {
                    title: "Organization Settings",
                    url: "/org-dashboard/organization-settings",
                },
                {
                    title: "Branding",
                    url: "/org-dashboard/branding",
                },
                {
                    title: "Integrations",
                    url: "/org-dashboard/integrations",
                },
            ],
        },
        {
            title: "Billing & Subscription",
            icon: IconCreditCard,
            url: "#",
            items: [
                {
                    title: "Subscription Plans",
                    url: "/org-dashboard/subscription-plans",
                },
                {
                    title: "Payment Methods",
                    url: "/org-dashboard/payment-methods",
                },
                {
                    title: "Invoices",
                    url: "/org-dashboard/invoices",
                },
            ],
        },
        {
            title: "Analytics & Reports",
            icon: IconChartBar,
            url: "#",
            items: [
                {
                    title: "Event Analytics",
                    url: "/org-dashboard/event-analytics",
                },
                {
                    title: "User Activity",
                    url: "/org-dashboard/user-activity",
                },
                {
                    title: "Revenue Reports",
                    url: "/org-dashboard/revenue-reports",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Notifications",
            url: "/org-dashboard/notifications",
            icon: IconBell,
        },
        {
            title: "Security",
            url: "/org-dashboard/security",
            icon: IconShield,
        },
        {
            title: "Help & Support",
            url: "/org-dashboard/support",
            icon: IconHelp,
        },
        {
            title: "Search",
            url: "/org-dashboard/search",
            icon: IconSearch,
        },
    ],
}

export function OrgSidebar() {
    const location = useLocation()
    const pathname = location.pathname

    const navMain = sidebarData.navMain.map((item) => ({
        ...item,
        isActive: pathname === item.url,
    }))

    const navClouds = sidebarData.navClouds.map((item) => {
        const items = item.items?.map((subItem) => ({
            ...subItem,
            isActive: pathname === subItem.url,
        }))
        const isChildActive = items?.some((subItem) => subItem.isActive)
        return {
            ...item,
            isActive: isChildActive,
            items,
        }
    })

    const navSecondary = sidebarData.navSecondary.map((item) => ({
        ...item,
        isActive: pathname === item.url,
    }))

    return (
        <Sidebar collapsible="icon" className="h-screen border-r z-50" variant="sidebar">
            <SidebarHeader className="h-(--header-height) border-b">
                <OrgSwitchDropdown organizations={sidebarData.organizations || []} events={sidebarData.events || []} />
            </SidebarHeader>
            <SidebarContent>
                <NavMainList items={navMain} />
                {navClouds && navClouds.length > 0 && (
                    <NavCloudList items={navClouds} />
                )}
                <NavSecondaryList items={navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <UserProfile user={sidebarData.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
