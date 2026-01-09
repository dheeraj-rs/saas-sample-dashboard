import EventDashboardLayout from "../../layouts/dashboard-layout"
import UnderDevelopmentPage from "@/components/common/reusing-pages/under-development-page"

export default function SessionsPage() {
    return (
        <EventDashboardLayout>
            <UnderDevelopmentPage pageName="Sessions" />
        </EventDashboardLayout>
    )
}
