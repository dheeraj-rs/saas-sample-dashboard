import OrgDashboardLayout from "../../layouts/dashboard-layout"
import UnderDevelopmentPage from "@/components/common/reusing-pages/under-development-page"

export default function EventAnalyticsPage() {
    return (
        <OrgDashboardLayout>
            <UnderDevelopmentPage pageName="Sessions" />
        </OrgDashboardLayout>
    )
}
