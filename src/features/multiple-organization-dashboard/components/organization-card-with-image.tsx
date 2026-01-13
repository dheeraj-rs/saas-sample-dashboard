import { Building2, Users, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

interface OrganizationCardWithImageProps {
    id?: string;
    name: string;
    members: number;
    logoUrl: string;
    description?: string;
}

export function OrganizationCardWithImage({ id, name, members, logoUrl, description }: OrganizationCardWithImageProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(!id ? `/org-dashboard/${id}` : "/organization-dashboard");
    };

    return (
        <div
            onClick={handleClick}
            className="group relative overflow-hidden rounded-xl bg-card border border-border
                 cursor-pointer transition-all duration-300 ease-out
                 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20
                 active:scale-[0.99] flex flex-col h-full"
        >
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl
                                group-hover:bg-primary/20 transition-all duration-500" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl
                                group-hover:bg-accent/20 transition-all duration-500" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-20 h-20 rounded-xl bg-background/80 backdrop-blur-sm 
                                    border border-border/50 p-3 shadow-lg
                                    group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/20
                                    transition-all duration-300">
                        <img
                            src={logoUrl}
                            alt={name}
                            className="w-full h-full object-contain"
                        />
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary 
                                        flex items-center justify-center opacity-0 group-hover:opacity-100
                                        transition-opacity duration-300 shadow-lg">
                            <Sparkles className="h-3 w-3 text-primary-foreground" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 flex-1 flex flex-col bg-gradient-to-b from-card to-card/50">
                <div className="flex items-start gap-2 mb-1.5">
                    <Building2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <h3 className="font-semibold text-base text-foreground line-clamp-2 leading-tight
                                   group-hover:text-primary transition-colors duration-300">
                        {name}
                    </h3>
                </div>
                {description && (
                    <p className="text-sm text-muted-foreground line-clamp-1 mb-2 flex-1">
                        {description}
                    </p>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-border/50 mt-auto">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span className="font-medium">{members}</span>
                        <span className="text-xs">members</span>
                    </div>
                    <div className="flex items-center justify-center w-7 h-7 rounded-full 
                                    bg-primary/10 group-hover:bg-primary group-hover:shadow-lg
                                    transition-all duration-300">
                        <ArrowRight className="h-4 w-4 text-primary group-hover:text-primary-foreground 
                                               group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
