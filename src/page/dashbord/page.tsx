import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/page/dashbord/components/app-sidebar"
import { ChartAreaInteractive } from "@/page/dashbord/components/chart-area-interactive"
import { DataTable } from "@/page/dashbord/components/data-table"
import { SectionCards } from "@/page/dashbord/components/section-cards"
import { SiteHeader } from "@/page/dashbord/components/site-header"


import data from "./data.json"
import ImportantToast from "./components/importent-tost"

export default function Page() {
  return (
    <SidebarProvider
      className="flex"
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 64)",
          "--header-height": "calc(var(--spacing) * 12 + 1px)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="sidebar" />
      <SidebarInset>
        <SiteHeader />
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
      </SidebarInset>
    </SidebarProvider>
  )
}
