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
        name: "organization-dashboard",
        list: "/organization-dashboard",
        meta: {
            label: "Organization Dashboard",
        },
    },
    {
        name: "org-events",
        list: "/organization-dashboard/events",
        meta: {
            label: "Manage Events",
            parent: "organization-dashboard",
        },
    },
    {
        name: "org-users",
        list: "/organization-dashboard/users",
        meta: {
            label: "Manage Users",
            parent: "organization-dashboard",
        },
    },
    {
        name: "invite-users",
        list: "/organization-dashboard/invite-users",
        meta: {
            label: "Invite Users",
            parent: "organization-dashboard",
        },
    },
    {
        name: "team-members",
        list: "/organization-dashboard/team-members",
        meta: {
            label: "Team Members",
            parent: "organization-dashboard",
        },
    },
    {
        name: "roles-permissions",
        list: "/organization-dashboard/roles-permissions",
        meta: {
            label: "Roles & Permissions",
            parent: "organization-dashboard",
        },
    },
    {
        name: "departments",
        list: "/organization-dashboard/departments",
        meta: {
            label: "Departments",
            parent: "organization-dashboard",
        },
    },
    {
        name: "organization-settings",
        list: "/organization-dashboard/organization-settings",
        meta: {
            label: "Organization Settings",
            parent: "organization-dashboard",
        },
    },
    {
        name: "branding",
        list: "/organization-dashboard/branding",
        meta: {
            label: "Branding",
            parent: "organization-dashboard",
        },
    },
    {
        name: "integrations",
        list: "/organization-dashboard/integrations",
        meta: {
            label: "Integrations",
            parent: "organization-dashboard",
        },
    },
    {
        name: "subscription-plans",
        list: "/organization-dashboard/subscription-plans",
        meta: {
            label: "Subscription Plans",
            parent: "organization-dashboard",
        },
    },
    {
        name: "payment-methods",
        list: "/organization-dashboard/payment-methods",
        meta: {
            label: "Payment Methods",
            parent: "organization-dashboard",
        },
    },
    {
        name: "invoices",
        list: "/organization-dashboard/invoices",
        meta: {
            label: "Invoices",
            parent: "organization-dashboard",
        },
    },
    {
        name: "event-analytics",
        list: "/organization-dashboard/event-analytics",
        meta: {
            label: "Event Analytics",
            parent: "organization-dashboard",
        },
    },
    {
        name: "user-activity",
        list: "/organization-dashboard/user-activity",
        meta: {
            label: "User Activity",
            parent: "organization-dashboard",
        },
    },
    {
        name: "revenue-reports",
        list: "/organization-dashboard/revenue-reports",
        meta: {
            label: "Revenue Reports",
            parent: "organization-dashboard",
        },
    },
    {
        name: "org-notifications",
        list: "/organization-dashboard/notifications",
        meta: {
            label: "Notifications",
            parent: "organization-dashboard",
        },
    },
    {
        name: "security",
        list: "/organization-dashboard/security",
        meta: {
            label: "Security",
            parent: "organization-dashboard",
        },
    },
    {
        name: "org-support",
        list: "/organization-dashboard/support",
        meta: {
            label: "Help & Support",
            parent: "organization-dashboard",
        },
    },
    {
        name: "org-search",
        list: "/organization-dashboard/search",
        meta: {
            label: "Search",
            parent: "organization-dashboard",
        },
    },
    {
        name: "profile",
        list: "/organization-dashboard/profile",
        meta: {
            label: "Profile",
            parent: "organization-dashboard",
        },
    },
];
