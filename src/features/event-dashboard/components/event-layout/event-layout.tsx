import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import ImportantToast from "@/components/common/toast/important-toast"
import { EventSidebar } from "./event-sidebar"
import { EventHeader } from "./event-header"

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
