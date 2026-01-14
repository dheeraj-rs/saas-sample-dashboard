import {
    IconDashboard,
    IconClipboardList,
    IconHeadset,
    IconCalendarEvent,
    IconTicket,
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
            logo: IconCalendar, // Using same icon as placeholder or suggest importing IconBuilding if available
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
            title: "Registrations",
            url: "/event-dashboard/registrations",
            icon: IconHeadset,
        },
        {
            title: "Payments",
            url: "/event-dashboard/payments",
            icon: IconUser,
        },
    ],
    navClouds: [
        // {
        //     title: "Registration & Attendees",
        //     icon: IconClipboardList,
        //     isActive: true,
        //     url: "#",
        //     items: [
        //         {
        //             title: "Registration",
        //             url: "/event-dashboard/registration",
        //         },
        //         {
        //             title: "Attendee Fields",
        //             url: "/event-dashboard/attendee-fields",
        //         },
        //         {
        //             title: "Restrictions",
        //             url: "/event-dashboard/restrictions",
        //         },
        //     ],
        // },
        // {
        //     title: "Event Setup",
        //     icon: IconCalendarEvent,
        //     url: "#",
        //     items: [
        //         {
        //             title: "Location",
        //             url: "/event-dashboard/location",
        //         },
        //         {
        //             title: "Sessions",
        //             url: "/event-dashboard/sessions",
        //         },
        //     ],
        // },
        // {
        //     title: "Pricing & Tickets",
        //     icon: IconTicket,
        //     url: "#",
        //     items: [
        //         {
        //             title: "Price Slabs",
        //             url: "/event-dashboard/price-slabs",
        //         },
        //         {
        //             title: "Tickets",
        //             url: "/event-dashboard/tickets",
        //         },
        //         {
        //             title: "Discounts",
        //             url: "/event-dashboard/discounts",
        //         },
        //         {
        //             title: "Add-ons",
        //             url: "/event-dashboard/add-ons",
        //         },
        //     ],
        // },
        {
            title: "Settings",
            icon: IconCreditCard,
            url: "#",
            items: [
                {
                    title: "Conference settings",
                    url: "/event-dashboard/conference-settings",
                },
                {
                    title: "Categories",
                    url: "/event-dashboard/categories",
                },
                {
                    title: "Coupons",
                    url: "/event-dashboard/coupons",
                },
                {
                    title: "Pricing Slabs",
                    url: "/event-dashboard/pricing-slabs",
                },
                {
                    title: "Addons",
                    url: "/event-dashboard/add-ons",
                },
                {
                    title: "Conference contacts",
                    url: "/event-dashboard/conference-contacts",
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
                    title: "Conference locations",
                    url: "/event-dashboard/conference-locations",
                },
            ],
        },
    ],
    navSecondary: [
        // {
        //     title: "Settings",
        //     url: "/event-dashboard/settings",
        //     icon: IconSettings,
        // },
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

export function ConferenceSidebar() {
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
            <SidebarContent className="gap-0">
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
