import { Building2, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

interface OrganizationListItemProps {
    name: string;
    members: number;
    logoUrl: string;
    description?: string;
}

export function OrganizationListItem({ name, members, logoUrl, description }: OrganizationListItemProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/organization-dashboard");
    };

    return (
        <div
            onClick={handleClick}
            className="group flex items-center gap-4 p-4 bg-card border border-border rounded-xl
                 cursor-pointer transition-all duration-300 ease-out
                 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5
                 active:scale-[0.99]"
        >
            {/* Organization Logo */}
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 
                      flex items-center justify-center flex-shrink-0 p-2
                      group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                <img
                    src={logoUrl}
                    alt={name}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200">
                        {name}
                    </h3>
                </div>
                {description && (
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                        {description}
                    </p>
                )}
                <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    <span>{members} members</span>
                </div>
            </div>

            {/* Arrow Icon */}
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary 
                             group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
        </div>
    );
}
