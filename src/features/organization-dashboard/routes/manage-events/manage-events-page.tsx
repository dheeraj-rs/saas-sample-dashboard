import { useState } from "react"
import { Plus, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import OrgDashboardLayout from "../../layouts/dashboard-layout"
import { EventCardWithImage } from "@/features/multiple-organization-dashboard/components/event-card-with-image"
import { CreateEventModal } from "../../components/modals/create-event-modal"

const MOCK_EVENTS = [
    {
        id: "1",
        title: "Future Forward 2024 - Tech Innovation Conference",
        date: "March 15, 2024",
        attendees: 1250,
        imageUrl: "/images/events/event1.png",
        description: "Join industry leaders for cutting-edge tech insights and networking",
        status: "upcoming",
        type: "conference"
    },
    {
        id: "2",
        title: "Innovate Global Summit - Business Leadership",
        date: "April 22, 2024",
        attendees: 850,
        imageUrl: "/images/events/event2.png",
        description: "Empowering business leaders with strategies for global success",
        status: "upcoming",
        type: "summit"
    },
    {
        id: "3",
        title: "Flow Startup Summit - Networking & Collaboration",
        date: "May 10, 2024",
        attendees: 420,
        imageUrl: "/images/events/event3.png",
        description: "Connect with innovative startups and venture capitalists",
        status: "upcoming",
        type: "summit"
    },
    {
        id: "4",
        title: "Digital Transformation Workshop 2024",
        date: "June 5, 2024",
        attendees: 320,
        imageUrl: "/images/events/event1.png",
        description: "Hands-on workshop for digital transformation strategies",
        status: "upcoming",
        type: "workshop"
    },
    {
        id: "5",
        title: "AI & Machine Learning Conference",
        date: "July 18, 2024",
        attendees: 980,
        imageUrl: "/images/events/event2.png",
        description: "Explore the latest in AI and ML technologies",
        status: "active",
        type: "conference"
    },
    {
        id: "6",
        title: "Cloud Computing Summit",
        date: "August 12, 2024",
        attendees: 670,
        imageUrl: "/images/events/event3.png",
        description: "Deep dive into cloud infrastructure and services",
        status: "draft",
        type: "summit"
    },
]

export default function ManageEventsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")

    const filteredEvents = MOCK_EVENTS.filter(event => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || event.status === statusFilter
        const matchesType = typeFilter === "all" || event.type === typeFilter

        return matchesSearch && matchesStatus && matchesType
    })

    const headerActions = (
        <CreateEventModal
            trigger={
                <Button size="sm">
                    <Plus className="size-4 mr-2" />
                    Create Event
                </Button>
            }
        />
    )

    return (
        <OrgDashboardLayout headerActions={headerActions}>
            <div className="space-y-6 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Recent Events</h1>
                        <p className="text-muted-foreground">
                            Manage your organization's events and conferences.
                        </p>
                    </div>

                    <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center md:w-auto md:flex-none">
                        <div className="relative flex-1 sm:max-w-[300px] md:w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search events..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[145px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="past">Past</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-[145px]">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="conference">Conference</SelectItem>
                                    <SelectItem value="summit">Summit</SelectItem>
                                    <SelectItem value="workshop">Workshop</SelectItem>
                                </SelectContent>
                            </Select>

                            {(searchTerm || statusFilter !== "all" || typeFilter !== "all") && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setSearchTerm("")
                                        setStatusFilter("all")
                                        setTypeFilter("all")
                                    }}
                                    title="Clear filters"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {filteredEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-muted p-4">
                            <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No events found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search or filters.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredEvents.map((event) => (
                            <EventCardWithImage
                                key={event.id}
                                {...event}
                            />
                        ))}
                    </div>
                )}
            </div>
        </OrgDashboardLayout>
    )
}
