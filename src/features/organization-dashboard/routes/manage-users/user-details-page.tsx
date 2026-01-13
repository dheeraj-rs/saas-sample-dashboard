import { useParams, useNavigate } from "react-router"
import { ArrowLeft, Mail, Phone, Building2, Activity } from "lucide-react"
import usersData from "@/features/organization-dashboard/data/users-data.json"
import OrgDashboardLayout from "../../layouts/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function UserDetailsPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const user = usersData.find((u) => u.id === id)

    if (!user) {
        return (
            <OrgDashboardLayout>
                <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                    <h2 className="text-2xl font-bold">User not found</h2>
                    <Button onClick={() => navigate("/organization-dashboard/users")}>
                        Back to Users
                    </Button>
                </div>
            </OrgDashboardLayout>
        )
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <OrgDashboardLayout>
            <div className="flex flex-col gap-6 p-6">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate("/organization-dashboard/users")}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">User Details</h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage information for {user.name}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Left Column: User Profile Overview */}
                    <Card className="xl:col-span-1 h-fit">
                        <CardHeader className="text-center pb-2">
                            <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-muted">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                                <AvatarFallback className="text-4xl">{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-xl">{user.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span className="truncate">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span>{user.phone}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-muted/50 p-3 rounded-lg">
                                    <div className="text-xs text-muted-foreground mb-1">Joined</div>
                                    <div className="font-medium text-sm">
                                        {new Date(user.joined_date).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="bg-muted/50 p-3 rounded-lg">
                                    <div className="text-xs text-muted-foreground mb-1">Total Orgs</div>
                                    <div className="font-medium text-sm">{user.total_organizations}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="xl:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-muted-foreground" />
                                    Organization Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-muted-foreground">Department</label>
                                    <div className="font-medium">{user.department}</div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-muted-foreground">Role</label>
                                    <div className="font-medium">{user.role}</div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                                    <div className="font-medium capitalize">{user.status}</div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-muted-foreground">Member ID</label>
                                    <div className="font-medium text-sm font-mono text-muted-foreground">{user.id}</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-muted-foreground" />
                                    Activity Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground text-center py-8">
                                    No recent activity found for this user.
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </OrgDashboardLayout>
    )
}
