import { IconCalendar, IconTicket, IconTrendingUp, IconUsers } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
}

interface SectionCardsProps {
  events: Event[]
}

export function SectionCards({ events }: SectionCardsProps) {
  // Calculate statistics from events data
  const totalEvents = events.length
  const activeEvents = events.filter(e => e.status === "active").length
  const upcomingEvents = events.filter(e => e.status === "upcoming").length
  const totalRegistrations = events.reduce((sum, e) => sum + e.registered, 0)

  // Calculate average registrations per event
  const avgRegistrations = totalEvents > 0 ? Math.round(totalRegistrations / totalEvents) : 0

  // Calculate percentage of active events
  const activePercentage = totalEvents > 0 ? ((activeEvents / totalEvents) * 100).toFixed(1) : "0"

  return (
    <div className="grid grid-cols-1 gap-3 px-2 sm:gap-4 sm:px-4 lg:px-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-default">Total Events</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalEvents}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCalendar className="size-3" />
              All Time
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {activeEvents} Active Events
          </div>
          <div className="text-muted-foreground">
            {upcomingEvents} upcoming events scheduled
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-default">Active Events</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {activeEvents}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="size-3" />
              {activePercentage}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Currently running events
          </div>
          <div className="text-muted-foreground">
            {activePercentage}% of total events are active
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-default">Total Registrations</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalRegistrations.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUsers className="size-3" />
              All Events
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong attendance across events
          </div>
          <div className="text-muted-foreground">
            Avg {avgRegistrations} registrations per event
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-default">Upcoming Events</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {upcomingEvents}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTicket className="size-3" />
              Scheduled
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Events in the pipeline
          </div>
          <div className="text-muted-foreground">
            Ready for attendee registration
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
