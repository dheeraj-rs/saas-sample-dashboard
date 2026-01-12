import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { EventSidebar } from "../components/event-layout/event-sidebar"
import { EventHeader } from "../components/event-layout/event-header"
import ImportantToast from "@/components/common/toast/important-toast"

export default function EventDashboardLayout({
    children,
    headerActions
}: {
    children: React.ReactNode
    headerActions?: React.ReactNode
}) {
    return (
        <DashboardLayout
            sidebar={<EventSidebar />}
            header={<EventHeader actions={headerActions} />}
        >
            <ImportantToast />
            {children}
        </DashboardLayout>
    )
}
