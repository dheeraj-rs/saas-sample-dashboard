import { useState } from "react";
import { SearchBarWithDropdown } from "../components/search-bar-with-dropdown";
import { EventCardWithImage } from "../components/event-card-with-image";
import { OrganizationCardWithImage } from "../components/organization-card-with-image";
import { ChevronRight } from "lucide-react";

const MOCK_EVENTS = [
    {
        id: "1",
        title: "Future Forward 2024 - Tech Innovation Conference",
        date: "March 15, 2024",
        attendees: 1250,
        imageUrl: "/images/events/event1.png",
        logoUrl: "/images/events/event1.png",
        description: "Join industry leaders for cutting-edge tech insights and networking",
    },
    {
        id: "2",
        title: "Innovate Global Summit - Business Leadership",
        date: "April 22, 2024",
        attendees: 850,
        imageUrl: "/images/events/event2.png",
        logoUrl: "/images/events/event2.png",
        description: "Empowering business leaders with strategies for global success",
    },
    {
        id: "3",
        title: "Flow Startup Summit - Networking & Collaboration",
        date: "May 10, 2024",
        attendees: 420,
        imageUrl: "/images/events/event3.png",
        logoUrl: "/images/events/event3.png",
        description: "Connect with innovative startups and venture capitalists",
    },
    {
        id: "4",
        title: "Digital Transformation Workshop 2024",
        date: "June 5, 2024",
        attendees: 320,
        imageUrl: "/images/events/event1.png",
        logoUrl: "/images/events/event1.png",
        description: "Hands-on workshop for digital transformation strategies",
    },
    {
        id: "5",
        title: "AI & Machine Learning Conference",
        date: "July 18, 2024",
        attendees: 980,
        imageUrl: "/images/events/event2.png",
        logoUrl: "/images/events/event2.png",
        description: "Explore the latest in AI and ML technologies",
    },
    {
        id: "6",
        title: "Cloud Computing Summit",
        date: "August 12, 2024",
        attendees: 670,
        imageUrl: "/images/events/event3.png",
        logoUrl: "/images/events/event3.png",
        description: "Deep dive into cloud infrastructure and services",
    },
];

const MOCK_ORGANIZATIONS = [
    {
        id: "1",
        name: "Synapse Technologies",
        members: 245,
        logoUrl: "/images/organizations/org1.png",
        description: "Leading technology solutions provider",
    },
    {
        id: "2",
        name: "Aurum Business Group",
        members: 189,
        logoUrl: "/images/organizations/org2.png",
        description: "Premium business consulting and advisory",
    },
    {
        id: "3",
        name: "Aura Creative Agency",
        members: 127,
        logoUrl: "/images/organizations/org3.png",
        description: "Creative design and branding experts",
    },
    {
        id: "4",
        name: "Nexus Innovations",
        members: 312,
        logoUrl: "/images/organizations/org1.png",
        description: "Innovation and research laboratory",
    },
    {
        id: "5",
        name: "Vertex Solutions",
        members: 198,
        logoUrl: "/images/organizations/org2.png",
        description: "Enterprise software development",
    },
    {
        id: "6",
        name: "Quantum Dynamics",
        members: 156,
        logoUrl: "/images/organizations/org3.png",
        description: "Advanced computing solutions",
    },
];

export default function MultiOrganizationLandingPage() {
    const [showAllEvents, setShowAllEvents] = useState(false);
    const [showAllOrganizations, setShowAllOrganizations] = useState(false);

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
                        events={MOCK_EVENTS}
                        organizations={MOCK_ORGANIZATIONS}
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
                        {!showAllEvents && MOCK_EVENTS.length > 4 && (
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
                        {(showAllEvents ? MOCK_EVENTS : MOCK_EVENTS.slice(0, 4)).map((event) => (
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
                        {!showAllOrganizations && MOCK_ORGANIZATIONS.length > 4 && (
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
                        {(showAllOrganizations ? MOCK_ORGANIZATIONS : MOCK_ORGANIZATIONS.slice(0, 4)).map((org) => (
                            <OrganizationCardWithImage key={org.id} {...org} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

