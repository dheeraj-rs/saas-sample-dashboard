import { Building2, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

interface OrganizationCardWithImageProps {
    name: string;
    members: number;
    logoUrl: string;
    description?: string;
}

export function OrganizationCardWithImage({ name, members, logoUrl, description }: OrganizationCardWithImageProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/organization-dashboard");
    };

    return (
        <div
            onClick={handleClick}
            className="group relative overflow-hidden rounded-xl bg-card border border-border
                 cursor-pointer transition-all duration-300 ease-out
                 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10
                 active:scale-[0.99] flex flex-col"
        >
            {/* Organization Logo/Image */}
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-muted via-muted/80 to-muted/60 
                      flex items-center justify-center p-6">
                <img
                    src={logoUrl}
                    alt={name}
                    className="w-full h-full object-contain transition-transform duration-500 ease-out
                     group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                        {name}
                    </h3>
                </div>

                {description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {description}
                    </p>
                )}

                <div className="flex items-center gap-1.5 mt-auto text-sm text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    <span>{members} members</span>
                </div>
            </div>

            {/* Arrow Icon - appears on hover */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm
                      flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-4 w-4 text-primary" />
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
