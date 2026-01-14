import { useState, useMemo } from "react";
import { SearchBarWithDropdown } from "../components/search-bar-with-dropdown";
import { EventCardWithImage } from "../components/event-card-with-image";
import { OrganizationCardWithImage } from "../components/organization-card-with-image";
import { ChevronRight } from "lucide-react";
import { allEvents } from "@/data/events";
import { organizations } from "@/data/organizations";
import { currentUser } from "@/data/users";

export default function MultiOrganizationLandingPage() {
    const [showAllEvents, setShowAllEvents] = useState(false);
    const [showAllOrganizations, setShowAllOrganizations] = useState(false);

    // Filter events based on user's accessible event IDs
    const userEvents = useMemo(() => {
        const accessibleEventIds = currentUser.event_ids || [];
        return allEvents
            .filter(event => accessibleEventIds.includes(event.id))
            .map(event => ({
                id: event.id,
                title: event.name,
                date: new Date(event.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                imageUrl: event.imageUrl || event.logoUrl || "/images/events/event1.png",
                logoUrl: event.logoUrl || "/images/events/event1.png",
                description: event.description || "",
                eventType: event.status,
                organizationName: event.organizationName,
                type: event.eventType,
                attendees: event.registered || 0
            }))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, []);

    // Filter organizations based on user's accessible organization IDs
    const userOrganizations = useMemo(() => {
        const accessibleOrgIds = currentUser.organization_ids || [];
        return organizations
            .filter(org => accessibleOrgIds.includes(org.id))
            .map(org => ({
                id: org.id,
                name: org.name,
                members: 0, // You can add member count to organization data later
                logoUrl: org.logo || "/images/organizations/org1.png",
                description: `${org.plan} Plan`
            }));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                            Choose organization or event to work with
                        </h1>
                        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                            Select from your events and organizations or search for something specific
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-3 mb-10">
                <div className="relative z-[1000]">
                    <SearchBarWithDropdown
                        events={userEvents}
                        organizations={userOrganizations}
                        placeholder="Search for events or organizations..."
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-10">
                <section className="space-y-5">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                            Recent Events
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        {!showAllEvents && userEvents.length > 4 && (
                            <button
                                onClick={() => setShowAllEvents(true)}
                                className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                View All
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        )}
                        {showAllEvents && (
                            <button
                                onClick={() => setShowAllEvents(false)}
                                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Show Less
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {(showAllEvents ? userEvents : userEvents.slice(0, 4)).map((event) => (
                            <EventCardWithImage key={event.id} {...event} />
                        ))}
                    </div>
                </section>

                <section className="space-y-5">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                            Recent Organizations
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        {!showAllOrganizations && userOrganizations.length > 4 && (
                            <button
                                onClick={() => setShowAllOrganizations(true)}
                                className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                View All
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        )}
                        {showAllOrganizations && (
                            <button
                                onClick={() => setShowAllOrganizations(false)}
                                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Show Less
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {(showAllOrganizations ? userOrganizations : userOrganizations.slice(0, 4)).map((org) => (
                            <OrganizationCardWithImage key={org.id} {...org} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

