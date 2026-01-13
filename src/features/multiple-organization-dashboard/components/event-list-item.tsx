import { Calendar, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

interface EventListItemProps {
    title: string;
    date: string;
    attendees: number;
    logoUrl: string;
    description?: string;
}

export function EventListItem({ title, date, attendees, logoUrl, description }: EventListItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/event-dashboard");
    };

    return (
        <div
            onClick={handleClick}
            className="group flex items-center gap-4 p-4 bg-card border border-border rounded-xl
                 cursor-pointer transition-all duration-300 ease-out
                 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5
                 active:scale-[0.99]"
        >
            {/* Event Logo */}
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 
                      flex items-center justify-center flex-shrink-0
                      group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <img
                    src={logoUrl}
                    alt={title}
                    className="w-8 h-8 object-contain"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200">
                    {title}
                </h3>
                {description && (
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                        {description}
                    </p>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        <span>{attendees} attendees</span>
                    </div>
                </div>
            </div>

            {/* Arrow Icon */}
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary 
                             group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
        </div>
    );
}
