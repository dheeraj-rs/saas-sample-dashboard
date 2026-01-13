import OrgDashboardLayout from "../../layouts/dashboard-layout"
import UnderDevelopmentPage from "@/components/common/reusing-pages/under-development-page"

export default function DepartmentsPage() {
    return (
        <OrgDashboardLayout>
            <UnderDevelopmentPage pageName="Departments" />
        </OrgDashboardLayout>
    )
}
