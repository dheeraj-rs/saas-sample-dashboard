import EventDashboardLayout from "../../layouts/dashboard-layout"
import UnderDevelopmentPage from "@/components/common/reusing-pages/under-development-page"

export default function HelpPage() {
    return (
        <EventDashboardLayout>
            <UnderDevelopmentPage pageName="Help" />
        </EventDashboardLayout>
    )
}
