import {
    IconBuilding,
    IconChartPie,
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
} from "@tabler/icons-react"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { SidebarConfig, HeaderConfig } from "@/components/layouts/dashboard-layout.types"
import { useAppConfigStore } from "@/store/app-config.store"

const sidebarConfig: SidebarConfig = {
    logo: {
        icon: IconBuilding,
        text: "OrgManager Pro",
        href: "#",
    },
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

export default function OrgDashboardLayout({ children }: { children: React.ReactNode }) {
    const { showToast } = useAppConfigStore()

    const headerConfig: HeaderConfig = {
        title: "Organization Management",
        quickCreateButton: {
            label: "New Employee",
            onClick: () => {
                showToast('Add new employee to the organization', 'info')
            },
        },
    }

    return (
        <DashboardLayout sidebarConfig={sidebarConfig} headerConfig={headerConfig}>
            {children}
        </DashboardLayout>
    )
}
