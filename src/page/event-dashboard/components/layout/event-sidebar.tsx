import * as React from "react"
import {
    IconDashboard,
    IconClipboardList,
    IconHeadset,
    IconMapPin,
    IconCalendarEvent,
    IconCurrencyDollar,
    IconTicket,
    IconDiscount,
    IconPuzzle,
    IconForms,
    IconLock,
    IconCreditCard,
    IconRefresh,
    IconBell,
    IconSettings,
    IconHelp,
    IconSearch,
    IconCalendar,
    IconUser,
} from "@tabler/icons-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { NavClouds } from "@/components/custum-ui/sidebar-list/nav-clouds"
import { NavMain } from "@/components/custum-ui/sidebar-list/nav-main"
import { NavSecondary } from "@/components/custum-ui/sidebar-list/nav-secondary"
import { NavUser } from "@/components/custum-ui/sidebar-list/nav-user"
import { EventSwitcher } from "@/components/custum-ui/sidebar-list/event-switcher"

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
            title: "Users List",
            url: "/event-dashboard/users",
            icon: IconUser,
        },
        {
            title: "App Support",
            url: "/event-dashboard/support",
            icon: IconHeadset,
        },
    ],
    navClouds: [
        {
            title: "Registration & Attendees",
            icon: IconClipboardList,
            isActive: true,
            url: "#",
            items: [
                {
                    title: "Registration",
                    url: "/event-dashboard/registration",
                },
                {
                    title: "Attendee Fields",
                    url: "/event-dashboard/attendee-fields",
                },
                {
                    title: "Restrictions",
                    url: "/event-dashboard/restrictions",
                },
            ],
        },
        {
            title: "Event Setup",
            icon: IconCalendarEvent,
            url: "#",
            items: [
                {
                    title: "Location",
                    url: "/event-dashboard/location",
                },
                {
                    title: "Sessions",
                    url: "/event-dashboard/sessions",
                },
            ],
        },
        {
            title: "Pricing & Tickets",
            icon: IconTicket,
            url: "#",
            items: [
                {
                    title: "Price Slabs",
                    url: "/event-dashboard/price-slabs",
                },
                {
                    title: "Tickets",
                    url: "/event-dashboard/tickets",
                },
                {
                    title: "Discounts",
                    url: "/event-dashboard/discounts",
                },
                {
                    title: "Add-ons",
                    url: "/event-dashboard/add-ons",
                },
            ],
        },
        {
            title: "Settings & Payments",
            icon: IconCreditCard,
            url: "#",
            items: [
                {
                    title: "Payment Settings",
                    url: "/event-dashboard/payment-settings",
                },
                {
                    title: "Refund Settings",
                    url: "/event-dashboard/refund-settings",
                },
                {
                    title: "Notifications",
                    url: "/event-dashboard/notifications",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "/event-dashboard/settings",
            icon: IconSettings,
        },
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
    return (
        <Sidebar collapsible="icon" className="h-screen border-r z-50" variant="sidebar">
            <SidebarHeader className="h-(--header-height) border-b">
                <EventSwitcher events={sidebarData.events || []} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={sidebarData.navMain} />
                {sidebarData.navClouds && sidebarData.navClouds.length > 0 && (
                    <NavClouds items={sidebarData.navClouds} />
                )}
                <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={sidebarData.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
