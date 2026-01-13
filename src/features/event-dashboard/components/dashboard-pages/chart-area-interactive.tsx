import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

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

interface ChartAreaInteractiveProps {
  events: Event[]
}

const chartConfig = {
  registrations: {
    label: "Registrations",
  },
  active: {
    label: "Active Events",
    color: "var(--primary)",
  },
  upcoming: {
    label: "Upcoming Events",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive({ events }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  const chartData = React.useMemo(() => {
    const monthlyData: Record<string, { active: number; upcoming: number; total: number }> = {}
    events.forEach(event => {
      const date = new Date(event.start_date)
      const monthKey = date.toLocaleDateString("en-US", { year: "numeric", month: "short" })

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { active: 0, upcoming: 0, total: 0 }
      }

      if (event.status === "active") {
        monthlyData[monthKey].active += event.registered
      } else if (event.status === "upcoming") {
        monthlyData[monthKey].upcoming += event.registered
      }
      monthlyData[monthKey].total += event.registered
    })

    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        active: data.active,
        upcoming: data.upcoming,
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6)
  }, [events])

  const filteredData = React.useMemo(() => {
    if (timeRange === "7d") {
      return chartData.slice(-1)
    } else if (timeRange === "30d") {
      return chartData.slice(-3)
    }
    return chartData
  }, [chartData, timeRange])

  const totalRegistrations = events.reduce((sum, e) => sum + e.registered, 0)

  return (
    <Card className="@container/card h-full flex flex-col">
      <CardHeader className="">
        <CardTitle>Event Registrations</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total registrations: {totalRegistrations.toLocaleString()}
          </span>
          <span className="@[540px]/card:hidden">
            {totalRegistrations.toLocaleString()} total
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 6 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="7d">Current month</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 6 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 6 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Current month
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 flex-1 min-h-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-full w-full min-h-[250px]"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillActive" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-active)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-active)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillUpcoming" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-upcoming)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-upcoming)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 0}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="upcoming"
              type="natural"
              fill="url(#fillUpcoming)"
              stroke="var(--color-upcoming)"
              stackId="a"
            />
            <Area
              dataKey="active"
              type="natural"
              fill="url(#fillActive)"
              stroke="var(--color-active)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
