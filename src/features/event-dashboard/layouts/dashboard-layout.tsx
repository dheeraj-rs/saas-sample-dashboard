import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { EventSidebar } from "../components/event-layout/event-sidebar"
import { EventHeader } from "../components/event-layout/event-header"
import ImportantToast from "@/components/common/toast/important-toast"
import { ConferenceSidebar } from "../components/event-layout/conference-sidebar"
import { useCurrentContext } from "@/hooks/use-current-context"

export default function EventDashboardLayout({
    children,
    headerActions,
    eventType: eventTypeProp
}: {
    children: React.ReactNode
    headerActions?: React.ReactNode
    eventType?: string
}) {
    const { eventType: eventTypeFromStore } = useCurrentContext()
    const eventType = eventTypeFromStore || eventTypeProp || "event"

    const getSidebar = () => {
        switch (eventType) {
            case "conference":
                return <ConferenceSidebar />
            case "ticketing":
                return <EventSidebar />
            case "carnival":
                return <EventSidebar />
            case "workshop":
                return <EventSidebar />
            case "meetup":
                return <EventSidebar />
            case "exhibition":
                return <EventSidebar />
            default:
                return <EventSidebar />
        }
    }

    return (
        <DashboardLayout
            sidebar={getSidebar()}
            header={<EventHeader actions={headerActions} />}
        >
            <ImportantToast />
            {children}
        </DashboardLayout>
    )
}
