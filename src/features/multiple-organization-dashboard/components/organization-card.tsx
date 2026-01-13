import { Building2, Users } from "lucide-react";
import { useNavigate } from "react-router";

interface OrganizationCardProps {
    id: string;
    name: string;
    members: number;
    logoUrl: string;
}

export function OrganizationCard({ name, members, logoUrl }: OrganizationCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/organization-dashboard");
    };

    return (
        <div
            onClick={handleClick}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border
                 cursor-pointer transition-all duration-300 ease-out
                 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50
                 active:scale-[0.98]"
        >
            {/* Logo Container */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center p-8">
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
            <div className="p-5 space-y-3">
                <div className="flex items-start gap-2">
                    <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                        {name}
                    </h3>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{members} members</span>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
