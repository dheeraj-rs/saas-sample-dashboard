import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { EventSidebar } from "@/pages/event-dashboard/components/event-layout/event-sidebar"
import { EventHeader } from "@/pages/event-dashboard/components/event-layout/event-header"
import ImportantToast from "@/components/common/toast/important-toast"

export default function EventDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout
            sidebar={<EventSidebar />}
            header={<EventHeader />}
        >
            <ImportantToast />
            {children}
        </DashboardLayout>
    )
}
