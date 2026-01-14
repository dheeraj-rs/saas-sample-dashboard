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
    IconUserPlus,
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
            url: "/organization-dashboard",
            icon: IconDashboard,
        },
        {
            title: "Manage Events",
            url: "/organization-dashboard/events",
            icon: IconCalendarEvent,
        },
        {
            title: "Manage Staff",
            url: "/organization-dashboard/users",
            icon: IconUsers,
        },
        {
            title: "Invite Users",
            url: "/organization-dashboard/invite-users",
            icon: IconUserPlus,
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
                    url: "/organization-dashboard/team-members",
                },
                {
                    title: "Roles & Permissions",
                    url: "/organization-dashboard/roles-permissions",
                },
                {
                    title: "Departments",
                    url: "/organization-dashboard/departments",
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
                    url: "/organization-dashboard/organization-settings",
                },
                {
                    title: "Branding",
                    url: "/organization-dashboard/branding",
                },
                {
                    title: "Integrations",
                    url: "/organization-dashboard/integrations",
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
                    url: "/organization-dashboard/subscription-plans",
                },
                {
                    title: "Payment Methods",
                    url: "/organization-dashboard/payment-methods",
                },
                {
                    title: "Invoices",
                    url: "/organization-dashboard/invoices",
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
                    url: "/organization-dashboard/event-analytics",
                },
                {
                    title: "User Activity",
                    url: "/organization-dashboard/user-activity",
                },
                {
                    title: "Revenue Reports",
                    url: "/organization-dashboard/revenue-reports",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Notifications",
            url: "/organization-dashboard/notifications",
            icon: IconBell,
        },
        {
            title: "Security",
            url: "/organization-dashboard/security",
            icon: IconShield,
        },
        {
            title: "Help & Support",
            url: "/organization-dashboard/support",
            icon: IconHelp,
        },
        {
            title: "Search",
            url: "/organization-dashboard/search",
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
        <Sidebar collapsible="icon" className="h-screen border-r border-sidebar-border z-50" variant="sidebar">
            <SidebarHeader className="h-(--header-height) border-b border-sidebar-border">
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
