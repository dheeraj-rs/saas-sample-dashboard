import OrgDashboardLayout from "./layout"
import ImportantToast from "../../components/custum-ui/toast/importent-tost"
import SamplePage from "./components/sample-page/sample-page"

export default function OrgDashboardPage() {
    return (
        <OrgDashboardLayout>
            <ImportantToast />
            <SamplePage />
        </OrgDashboardLayout>
    )
}
