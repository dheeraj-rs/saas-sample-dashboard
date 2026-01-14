import {
    IconDashboard,
    IconClipboardList,
    IconCreditCard,
    IconSettings,
    IconHelp,
    IconSearch,
    IconCalendar,
    IconUser,
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
import { EventSwitchDropdown } from "./event-switch-dropdown"

const getEvents = () => {

}

const sidebarData = {
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
    organizations: [
        {
            name: "Conference Prime",
            logo: IconCalendar,
            plan: "Enterprise",
        },
        {
            name: "Global Operations",
            logo: IconCalendar,
            plan: "Pro",
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
            url: "/event-dashboard",
            icon: IconDashboard,
        },
        {
            title: "Users",
            url: "/event-dashboard/users",
            icon: IconUser,
        },
        {
            title: "Orders",
            url: "/event-dashboard/orders",
            icon: IconClipboardList,
        },
        {
            title: "Payments",
            url: "/event-dashboard/payments",
            icon: IconCreditCard,
        },
    ],
    navClouds: [
        {
            title: "Settings",
            icon: IconSettings,
            url: "#",
            items: [
                {
                    title: "Event settings",
                    url: "/event-dashboard/event-settings",
                },
                {
                    title: "Tickets",
                    url: "/event-dashboard/tickets",
                },
                {
                    title: "Coupons",
                    url: "/event-dashboard/coupons",
                },
                {
                    title: "Pricing slabs",
                    url: "/event-dashboard/pricing-slabs",
                },
                {
                    title: "Addons",
                    url: "/event-dashboard/add-ons",
                },
                {
                    title: "Event contacts",
                    url: "/event-dashboard/event-contacts",
                },
                {
                    title: "Leagal documents",
                    url: "/event-dashboard/leagal-documents",
                },
                {
                    title: "Website resources",
                    url: "/event-dashboard/website-resources",
                },
                {
                    title: "Event locations",
                    url: "/event-dashboard/event-locations",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Get Help",
            url: "/event-dashboard/help",
            icon: IconHelp,
        },
        {
            title: "Search",
            url: "/event-dashboard/search",
            icon: IconSearch,
        },
    ],
}

export function EventSidebar() {
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
                <EventSwitchDropdown events={sidebarData.events || []} organizations={sidebarData.organizations || []} />
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
