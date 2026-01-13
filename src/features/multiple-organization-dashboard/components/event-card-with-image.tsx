import { Calendar, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

interface EventCardWithImageProps {
    title: string;
    date: string;
    attendees: number;
    imageUrl: string;
    description?: string;
}

export function EventCardWithImage({ title, date, attendees, imageUrl, description }: EventCardWithImageProps) {
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
            </div>
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-base text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-200">
                    {title}
                </h3>

                {/* {description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {description}
                    </p>
                )} */}

                <div className="flex items-center gap-3 mt-auto text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        <span>{attendees}</span>
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
