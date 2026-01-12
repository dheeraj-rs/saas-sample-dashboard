import { ResourceProps } from "@refinedev/core";

export const EVENT_DASHBOARD_RESOURCES: ResourceProps[] = [
    {
        name: "dashboard",
        list: "/event-dashboard",
        meta: {
            label: "Event Dashboard",
        },
    },
    {
        name: "users",
        list: "/event-dashboard/users",
        meta: {
            label: "Users List",
            parent: "dashboard",
        },
    },
    {
        name: "support",
        list: "/event-dashboard/support",
        meta: {
            label: "App Support",
            parent: "dashboard",
        },
    },
    {
        name: "registration",
        list: "/event-dashboard/registration",
        meta: {
            label: "Registration",
            parent: "dashboard",
        },
    },
    {
        name: "attendee-fields",
        list: "/event-dashboard/attendee-fields",
        meta: {
            label: "Attendee Fields",
            parent: "dashboard",
        },
    },
    {
        name: "restrictions",
        list: "/event-dashboard/restrictions",
        meta: {
            label: "Restrictions",
            parent: "dashboard",
        },
    },
    {
        name: "location",
        list: "/event-dashboard/location",
        meta: {
            label: "Location",
            parent: "dashboard",
        },
    },
    {
        name: "sessions",
        list: "/event-dashboard/sessions",
        meta: {
            label: "Sessions",
            parent: "dashboard",
        },
    },
    {
        name: "price-slabs",
        list: "/event-dashboard/price-slabs",
        meta: {
            label: "Price Slabs",
            parent: "dashboard",
        },
    },
    {
        name: "tickets",
        list: "/event-dashboard/tickets",
        meta: {
            label: "Tickets",
            parent: "dashboard",
        },
    },
    {
        name: "discounts",
        list: "/event-dashboard/discounts",
        meta: {
            label: "Discounts",
            parent: "dashboard",
        },
    },
    {
        name: "add-ons",
        list: "/event-dashboard/add-ons",
        meta: {
            label: "Add-ons",
            parent: "dashboard",
        },
    },
    {
        name: "payment-settings",
        list: "/event-dashboard/payment-settings",
        meta: {
            label: "Payment Settings",
            parent: "dashboard",
        },
    },
    {
        name: "refund-settings",
        list: "/event-dashboard/refund-settings",
        meta: {
            label: "Refund Settings",
            parent: "dashboard",
        },
    },
    {
        name: "notifications",
        list: "/event-dashboard/notifications",
        meta: {
            label: "Notifications",
            parent: "dashboard",
        },
    },
    {
        name: "settings",
        list: "/event-dashboard/settings",
        meta: {
            label: "Settings",
            parent: "dashboard",
        },
    },
    {
        name: "help",
        list: "/event-dashboard/help",
        meta: {
            label: "Get Help",
            parent: "dashboard",
        },
    },
    {
        name: "search",
        list: "/event-dashboard/search",
        meta: {
            label: "Search",
            parent: "dashboard",
        },
    },
];

export const ORG_DASHBOARD_RESOURCES: ResourceProps[] = [
    {
        name: "org-dashboard",
        list: "/org-dashboard",
        meta: {
            label: "Organization Dashboard",
        },
    },
    {
        name: "org-events",
        list: "/org-dashboard/events",
        meta: {
            label: "Manage Events",
            parent: "org-dashboard",
        },
    },
    {
        name: "org-users",
        list: "/org-dashboard/users",
        meta: {
            label: "Manage Users",
            parent: "org-dashboard",
        },
    },
    {
        name: "invite-users",
        list: "/org-dashboard/invite-users",
        meta: {
            label: "Invite Users",
            parent: "org-dashboard",
        },
    },
    {
        name: "team-members",
        list: "/org-dashboard/team-members",
        meta: {
            label: "Team Members",
            parent: "org-dashboard",
        },
    },
    {
        name: "roles-permissions",
        list: "/org-dashboard/roles-permissions",
        meta: {
            label: "Roles & Permissions",
            parent: "org-dashboard",
        },
    },
    {
        name: "departments",
        list: "/org-dashboard/departments",
        meta: {
            label: "Departments",
            parent: "org-dashboard",
        },
    },
    {
        name: "organization-settings",
        list: "/org-dashboard/organization-settings",
        meta: {
            label: "Organization Settings",
            parent: "org-dashboard",
        },
    },
    {
        name: "branding",
        list: "/org-dashboard/branding",
        meta: {
            label: "Branding",
            parent: "org-dashboard",
        },
    },
    {
        name: "integrations",
        list: "/org-dashboard/integrations",
        meta: {
            label: "Integrations",
            parent: "org-dashboard",
        },
    },
    {
        name: "subscription-plans",
        list: "/org-dashboard/subscription-plans",
        meta: {
            label: "Subscription Plans",
            parent: "org-dashboard",
        },
    },
    {
        name: "payment-methods",
        list: "/org-dashboard/payment-methods",
        meta: {
            label: "Payment Methods",
            parent: "org-dashboard",
        },
    },
    {
        name: "invoices",
        list: "/org-dashboard/invoices",
        meta: {
            label: "Invoices",
            parent: "org-dashboard",
        },
    },
    {
        name: "event-analytics",
        list: "/org-dashboard/event-analytics",
        meta: {
            label: "Event Analytics",
            parent: "org-dashboard",
        },
    },
    {
        name: "user-activity",
        list: "/org-dashboard/user-activity",
        meta: {
            label: "User Activity",
            parent: "org-dashboard",
        },
    },
    {
        name: "revenue-reports",
        list: "/org-dashboard/revenue-reports",
        meta: {
            label: "Revenue Reports",
            parent: "org-dashboard",
        },
    },
    {
        name: "org-notifications",
        list: "/org-dashboard/notifications",
        meta: {
            label: "Notifications",
            parent: "org-dashboard",
        },
    },
    {
        name: "security",
        list: "/org-dashboard/security",
        meta: {
            label: "Security",
            parent: "org-dashboard",
        },
    },
    {
        name: "org-support",
        list: "/org-dashboard/support",
        meta: {
            label: "Help & Support",
            parent: "org-dashboard",
        },
    },
    {
        name: "org-search",
        list: "/org-dashboard/search",
        meta: {
            label: "Search",
            parent: "org-dashboard",
        },
    },
    {
        name: "profile",
        list: "/org-dashboard/profile",
        meta: {
            label: "Profile",
            parent: "org-dashboard",
        },
    },
];
