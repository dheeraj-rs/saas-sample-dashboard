import { IconCalendar, IconUsers } from "@tabler/icons-react"
import { ArrowRight, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Event {
    id: string
    name: string
    organization_name: string
    event_type: string
    status: string
    active_domain?: string
    registered: number
    description?: string
    location: string
    start_date: string
    end_date: string
    created_at: string
    updated_at: string
    logoUrl?: string
}

interface RecentEventsCardProps {
    events: Event[]
}

const statusColors = {
    active: "bg-green-500/10 text-green-700 border-green-500/20",
    upcoming: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    past: "bg-gray-500/10 text-gray-700 border-gray-500/20",
    cancelled: "bg-red-500/10 text-red-700 border-red-500/20",
}

export function RecentEventsCard({ events }: RecentEventsCardProps) {
    // Get the most recent events (sorted by created_at)
    const recentEvents = [...events]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 4)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    }

    return (
        <Card className="h-fit flex flex-col gap-0 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-semibold text-muted-foreground">Recent Events</span>
            </div>
            <div className="flex-1 min-h-0">
                <div className="space-y-3">
                    {recentEvents.map((event) => (
                        <button
                            key={event.id}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-accent/50 transition-all group text-left border border-transparent hover:border-border/50"
                        >
                            <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0 border border-border/50 shadow-sm">
                                <img
                                    src={event.logoUrl}
                                    alt={event.name}
                                    className="w-6 h-6 object-contain opacity-90"
                                />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <div className="font-semibold text-foreground truncate text-sm">
                                    {event.name}
                                </div>
                                <div className="text-[13px] text-muted-foreground flex items-center gap-3 mt-1">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5 opacity-70" />
                                        {formatDate(event.start_date)}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Users className="h-3.5 w-3.5 opacity-70" />
                                        {event.registered}
                                    </span>
                                </div>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </button>
                    ))}

                    {recentEvents.length === 0 && (
                        <div className="text-center py-4 text-muted-foreground text-xs">
                            No recent events found
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}
