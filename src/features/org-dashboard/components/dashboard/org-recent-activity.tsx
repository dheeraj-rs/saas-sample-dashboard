import {
    IconAlertCircle,
    IconCheck,
    IconClock,
    IconInfoCircle,
} from "@tabler/icons-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Activity {
    id: string
    action: string
    target: string
    user: string
    date: string
    status: string
}

interface OrgRecentActivityProps {
    data: Activity[]
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "success":
            return <IconCheck className="size-4 text-green-500" />
        case "warning":
            return <IconAlertCircle className="size-4 text-amber-500" />
        case "info":
            return <IconInfoCircle className="size-4 text-blue-500" />
        default:
            return <IconClock className="size-4 text-gray-500" />
    }
}

export function OrgRecentActivity({ data }: OrgRecentActivityProps) {
    return (
        <Card className="col-span-1 lg:col-span-1">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                    Latest actions taken within your organization
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {data.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={`/avatars/${activity.user.toLowerCase().replace(' ', '-')}.png`} alt={activity.user} />
                                <AvatarFallback>{activity.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-1 flex-col gap-1">
                                <p className="text-sm font-medium leading-none">
                                    {activity.user} <span className="font-normal text-muted-foreground">performed</span> {activity.action}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {activity.target}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                {getStatusIcon(activity.status)}
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                    {new Date(activity.date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
