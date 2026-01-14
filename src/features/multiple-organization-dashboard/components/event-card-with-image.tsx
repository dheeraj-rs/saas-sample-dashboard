import { Calendar, ArrowRight, Building2 } from "lucide-react";
import { useNavigate } from "react-router";

type EventType = "active" | "upcoming" | "past";

interface EventCardWithImageProps {
    title: string;
    date: string;
    imageUrl: string;
    description?: string;
    eventType: EventType;
    organizationName: string;
}

const eventTypeBadgeStyles: Record<EventType, { bg: string; text: string; label: string }> = {
    active: {
        bg: "bg-blue-600",
        text: "text-white",
        label: "Active"
    },
    upcoming: {
        bg: "bg-green-600",
        text: "text-white",
        label: "Upcoming"
    },
    past: {
        bg: "bg-gray-500",
        text: "text-white",
        label: "Past"
    }
};

export function EventCardWithImage({ title, date, imageUrl, eventType, organizationName }: EventCardWithImageProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/event-dashboard");
    };

    return (
        <div
            onClick={handleClick}
            className="group relative overflow-hidden rounded-xl bg-card border border-border
                 cursor-pointer transition-all duration-300 ease-out
                 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10
                 active:scale-[0.99] flex flex-col"
        >
            <div className="relative h-32 overflow-hidden bg-muted">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out
                     group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
                        opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Event Type Badge */}
                <div className="absolute top-3 left-3">
                    <div className={`${eventTypeBadgeStyles[eventType].bg} ${eventTypeBadgeStyles[eventType].text} 
                                   px-3 py-1.5 rounded-sm text-xs font-medium shadow-lg
                                   relative after:content-[''] after:absolute after:right-0 after:top-1/2 
                                   after:-translate-y-1/2 after:translate-x-full 
                                   after:border-[6px] after:border-transparent 
                                   after:border-l-current`}
                        style={{
                            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)'
                        }}>
                        {eventTypeBadgeStyles[eventType].label}
                    </div>
                </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-base text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors duration-200">
                    {title}
                </h3>

                <div className="flex items-center justify-between gap-2 mt-auto text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{organizationName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{date}</span>
                    </div>
                </div>
            </div>

            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm
                      flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-4 w-4 text-primary" />
            </div>

            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
