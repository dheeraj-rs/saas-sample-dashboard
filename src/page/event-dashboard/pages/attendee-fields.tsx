import { UnderDevelopment } from "@/components/custum-ui/reusing-pages/under-development"
import EventDashboardLayout from "../layout"

export default function AttendeeFieldsPage() {
    return (
        <EventDashboardLayout>
            <div className="flex h-full w-full flex-col items-center justify-center min-h-[calc(100vh-100px)]">
                <UnderDevelopment pageName="Attendee Fields" />
            </div>
        </EventDashboardLayout>
    )
}
