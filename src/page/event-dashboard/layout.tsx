import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { EventSidebar } from "@/page/event-dashboard/components/event-layout/event-sidebar"
import { EventHeader } from "@/page/event-dashboard/components/event-layout/event-header"
import ImportantToast from "@/components/custum-ui/toast/important-toast"

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
