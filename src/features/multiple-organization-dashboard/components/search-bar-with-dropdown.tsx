import { Search, ArrowRight, Calendar, Users, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

interface Event {
    id: string;
    title: string;
    date: string;
    attendees: number;
    logoUrl: string;
}

interface Organization {
    id: string;
    name: string;
    members: number;
    logoUrl: string;
}

interface SearchBarWithDropdownProps {
    events: Event[];
    organizations: Organization[];
    placeholder?: string;
}

export function SearchBarWithDropdown({
    events,
    organizations,
    placeholder = "Search for events or organizations..."
}: SearchBarWithDropdownProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Filter events and organizations based on search query
    const filteredEvents = searchQuery.trim()
        ? events.filter((event) =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const filteredOrganizations = searchQuery.trim()
        ? organizations.filter((org) =>
            org.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const hasResults = filteredEvents.length > 0 || filteredOrganizations.length > 0;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleEventClick = () => {
        navigate("/event-dashboard");
        setIsOpen(false);
        setSearchQuery("");
    };

    const handleOrgClick = () => {
        navigate("/organization-dashboard");
        setIsOpen(false);
        setSearchQuery("");
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto" ref={searchRef}>
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary z-10" />
                <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-6 text-base bg-card border-2 border-border rounded-xl
                     focus:border-primary focus:ring-2 focus:ring-primary/20
                     transition-all duration-300 ease-out
                     hover:border-primary/50 hover:shadow-lg
                     placeholder:text-muted-foreground"
                />
            </div>

            {/* Dropdown Results */}
            {isOpen && searchQuery.trim() && (
                <div className="absolute top-full mt-2 w-full bg-card border-2 border-border rounded-xl shadow-2xl overflow-hidden z-[9999] max-h-[500px] overflow-y-auto">
                    {hasResults ? (
                        <div className="p-2">
                            {/* Events Section */}
                            {filteredEvents.length > 0 && (
                                <div className="mb-2">
                                    <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">
                                        Events
                                    </div>
                                    {filteredEvents.map((event) => (
                                        <button
                                            key={event.id}
                                            onClick={() => handleEventClick()}
                                            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-accent transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <img
                                                    src={event.logoUrl}
                                                    alt={event.title}
                                                    className="w-6 h-6 object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 text-left min-w-0">
                                                <div className="font-medium text-foreground truncate">
                                                    {event.title}
                                                </div>
                                                <div className="text-sm text-muted-foreground flex items-center gap-3">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {event.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-3 w-3" />
                                                        {event.attendees} attendees
                                                    </span>
                                                </div>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Organizations Section */}
                            {filteredOrganizations.length > 0 && (
                                <div>
                                    <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">
                                        Organizations
                                    </div>
                                    {filteredOrganizations.map((org) => (
                                        <button
                                            key={org.id}
                                            onClick={() => handleOrgClick()}
                                            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-accent transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <img
                                                    src={org.logoUrl}
                                                    alt={org.name}
                                                    className="w-8 h-8 object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 text-left min-w-0">
                                                <div className="font-medium text-foreground truncate">
                                                    {org.name}
                                                </div>
                                                <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <Building2 className="h-3 w-3" />
                                                    {org.members} members
                                                </div>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>No results found for "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
