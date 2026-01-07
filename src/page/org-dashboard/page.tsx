import OrgDashboardLayout from "./layout"
import ImportantToast from "../../components/custum-ui/toast/importent-tost"
import OrgDashboard from "./components/dashboard/page"

export default function OrgDashboardPage() {
    return (
        <OrgDashboardLayout>
            <ImportantToast />
            <OrgDashboard />
        </OrgDashboardLayout>
    )
}
