import { type Icon } from "@tabler/icons-react"

export interface NavItem {
    title: string
    url: string
    icon: Icon
}

export interface NavDocumentItem {
    name: string
    url: string
    icon: Icon
}

export interface NavItemWithChildren {
    title: string
    url: string
    icon: Icon
    isActive?: boolean
    items: {
        title: string
        url: string
    }[]
}

export interface SidebarConfig {
    user: {
        name: string
        email: string
        avatar: string
    }
    logo?: {
        icon?: Icon
        text?: string
        href?: string
    }
    navMain: NavItem[]
    navClouds?: NavItemWithChildren[]
    navSecondary: NavItem[]
    documents?: NavDocumentItem[]
}

export interface HeaderConfig {
    title: string
    quickCreateButton?: {
        label: string
        onClick: () => void
    }
}

export interface DashboardLayoutProps {
    sidebarConfig: SidebarConfig
    headerConfig: HeaderConfig
    children: React.ReactNode
    className?: string
}
