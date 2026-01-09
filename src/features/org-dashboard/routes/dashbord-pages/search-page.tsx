import OrgDashboardLayout from "../../layouts/dashboard-layout"
import UnderDevelopmentPage from "@/components/common/reusing-pages/under-development-page"

export default function SearchPage() {
    return (
        <OrgDashboardLayout>
            <UnderDevelopmentPage pageName="Search" />
        </OrgDashboardLayout>
    )
}
