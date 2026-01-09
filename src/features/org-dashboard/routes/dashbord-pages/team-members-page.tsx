import OrgDashboardLayout from "../../layouts/dashboard-layout"
import UnderDevelopmentPage from "@/components/common/reusing-pages/under-development-page"

export default function TeamMembersPage() {
    return (
        <OrgDashboardLayout>
            <UnderDevelopmentPage pageName="Team Members" />
        </OrgDashboardLayout>
    )
}
