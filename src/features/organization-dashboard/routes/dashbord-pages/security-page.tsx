import OrgDashboardLayout from "../../layouts/dashboard-layout"
import UnderDevelopmentPage from "@/components/common/reusing-pages/under-development-page"

export default function SecurityPage() {
    return (
        <OrgDashboardLayout>
            <UnderDevelopmentPage pageName="Security" />
        </OrgDashboardLayout>
    )
}
