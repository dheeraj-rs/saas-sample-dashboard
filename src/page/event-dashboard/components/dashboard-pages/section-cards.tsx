import { IconCategory, IconCreditCard, IconUsers, IconUsersGroup } from "@tabler/icons-react"

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

  const totalEvents = events.length
  const totalRegistrations = events.reduce((sum, e) => sum + e.registered, 0)
  const avgRegistrations = totalEvents > 0 ? Math.round(totalRegistrations / totalEvents) : 0
  const categories = new Set(events.map(e => e.event_type)).size
  const totalUsers = 1250
  const activeUsers = 890

  return (
    <div className="grid grid-cols-1 gap-3 px-2 sm:gap-4 sm:px-4 lg:px-6 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-default">Total Registrations</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalRegistrations.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUsersGroup className="size-3" />
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
          <CardDescription className="text-default">Event Categories</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {categories}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCategory className="size-3" />
              Types
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Diverse event portfolio
          </div>
          <div className="text-muted-foreground">
            Conferences, Summits, Workshops etc.
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-default">Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalUsers.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUsers className="size-3" />
              Platform
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {activeUsers} Active Users
          </div>
          <div className="text-muted-foreground">
            registered on the platform
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-default">Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${(totalRegistrations * 150).toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconCreditCard className="size-3" />
              Est.
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Revenue Generated
          </div>
          <div className="text-muted-foreground">
            Based on current registrations
          </div>
        </CardFooter>
      </Card>

    </div >
  )
}
