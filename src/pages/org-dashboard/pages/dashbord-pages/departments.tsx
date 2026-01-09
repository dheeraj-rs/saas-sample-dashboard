import OrgDashboardLayout from "../../layout"

export default function DepartmentsPage() {
    return (
        <OrgDashboardLayout>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 md:gap-6 md:py-6 md:px-0">
                        <div className="px-2 sm:px-4 lg:px-6">
                            <h1 className="text-2xl font-bold mb-4">Departments</h1>
                            <p className="text-muted-foreground">Organize teams into departments</p>
                        </div>
                    </div>
                </div>
            </div>
        </OrgDashboardLayout>
    )
}
