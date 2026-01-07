import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { EventSidebar } from "@/page/event-dashboard/components/layout/event-sidebar"
import { EventHeader } from "@/page/event-dashboard/components/layout/event-header"

export default function EventDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout
            sidebar={<EventSidebar />}
            header={<EventHeader />}
        >
            {children}
        </DashboardLayout>
    )
}
