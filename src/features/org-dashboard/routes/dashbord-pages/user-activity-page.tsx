import OrgDashboardLayout from "../../layouts/dashboard-layout"
import UnderDevelopmentPage from "@/components/common/reusing-pages/under-development-page"

export default function UserActivityPage() {
    return (
        <OrgDashboardLayout>
            <UnderDevelopmentPage pageName="User Activity" />
        </OrgDashboardLayout>
    )
}
