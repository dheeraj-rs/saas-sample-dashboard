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

    const statusColors = {
        active: "bg-emerald-50 text-emerald-700 border-emerald-200",
        inactive: "bg-slate-50 text-slate-700 border-slate-200",
        pending: "bg-amber-50 text-amber-700 border-amber-200"
    }

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
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 shadow-2xl">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
                    <div className="relative flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/organization-dashboard/users")}
                            className="hover:bg-white/20 text-white transition-all duration-200"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                User Profile
                            </h1>
                            <p className="text-violet-100 mt-1">
                                Complete overview of {user.name}'s account and activity
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <Card className="lg:col-span-4 border-0 shadow-xl bg-white overflow-hidden">
                        <div className="relative h-28 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500" />
                        <CardContent className="relative -mt-16 pb-6">
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                                        <AvatarFallback className="text-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
                                            {getInitials(user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full border-4 border-white shadow-lg ${user.status === 'active' ? 'bg-emerald-500' :
                                        user.status === 'pending' ? 'bg-amber-500' : 'bg-slate-400'
                                        }`} />
                                </div>

                                <h2 className="text-2xl font-bold mt-4 text-center">{user.name}</h2>

                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mt-2 border-2 ${statusColors[user.status as keyof typeof statusColors] || statusColors.inactive
                                    }`}>
                                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-50 hover:bg-violet-100 transition-colors">
                                    <div className="p-2 rounded-lg bg-violet-500 text-white">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm truncate">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
                                    <div className="p-2 rounded-lg bg-purple-500 text-white">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm">{user.phone}</span>
                                </div>
                            </div>

                            <Separator className="my-6" />

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-xl border-2 border-violet-100">
                                    <div className="text-xs font-semibold text-violet-600 mb-1">Member Since</div>
                                    <div className="font-bold text-sm text-slate-900">
                                        {new Date(user.joined_date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 p-4 rounded-xl border-2 border-fuchsia-100">
                                    <div className="text-xs font-semibold text-fuchsia-600 mb-1">Organizations</div>
                                    <div className="font-bold text-2xl text-fuchsia-600">{user.total_organizations}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="lg:col-span-8 space-y-6">
                        <Card className="border-0 shadow-xl">
                            <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b-2 border-violet-100">
                                <CardTitle className="text-xl font-bold flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg">
                                        <Building2 className="h-5 w-5" />
                                    </div>
                                    Organization Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-violet-600 uppercase tracking-wider">Department</label>
                                        <div className="text-lg font-bold text-slate-900">{user.department}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-purple-600 uppercase tracking-wider">Role</label>
                                        <div className="text-lg font-bold text-slate-900">{user.role}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-fuchsia-600 uppercase tracking-wider">Status</label>
                                        <div className="text-lg font-bold text-slate-900 capitalize">{user.status}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Member ID</label>
                                        <div className="font-mono text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-2 rounded-lg inline-block">
                                            {user.id}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-xl">
                            <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 border-b-2 border-cyan-100">
                                <CardTitle className="text-xl font-bold flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 text-white shadow-lg">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    Activity Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                            <Activity className="h-10 w-10 text-slate-400" />
                                        </div>
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-teal-500/30 animate-ping" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-lg text-slate-700">No Recent Activity</p>
                                        <p className="text-sm text-slate-500 mt-1">This user hasn't had any activity yet</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </OrgDashboardLayout>
    )
}