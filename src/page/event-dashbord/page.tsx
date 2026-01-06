import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconPresentation,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { SidebarConfig, HeaderConfig } from "@/components/layouts/dashboard-layout.types"
import { ChartAreaInteractive } from "@/page/event-dashbord/components/chart-area-interactive"
import { DataTable } from "@/page/event-dashbord/components/data-table"
import { SectionCards } from "@/page/event-dashbord/components/section-cards"
import ImportantToast from "./components/importent-tost"
import { useAppConfigStore } from "@/store/app-config.store"

import data from "./data.json"

const sidebarConfig: SidebarConfig = {
  logo: {
    icon: IconPresentation,
    text: "ConferencePrime",
    href: "#",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: IconPresentation,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: IconFolder,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: IconDatabase,
      plan: "Free",
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
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Registration",
      url: "#",
      icon: IconListDetails,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export default function Page() {
  const { showToast } = useAppConfigStore()

  const headerConfig: HeaderConfig = {
    title: "Documents",
    quickCreateButton: {
      label: "Quick Create",
      onClick: () => {
        showToast('This is an important notification. Please review carefully.', 'warning')
      },
    },
  }

  return (
    <DashboardLayout sidebarConfig={sidebarConfig} headerConfig={headerConfig}>
      <ImportantToast />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 md:gap-6 md:py-6 md:px-0">
            <SectionCards />
            <div className="px-2 sm:px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
