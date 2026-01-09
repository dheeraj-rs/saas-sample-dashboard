import { useNavigate } from "react-router";
import { EmptyPageLayout } from "./empty-page-layout";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
            <EmptyPageLayout
                title="Page Not Found"
                description="The page you are looking for does not exist or has been moved."
                actionLabel="Go Home"
                onAction={() => navigate("/")}
                image={
                    <img
                        src="/svg/undraw_page-not-found_6wni.svg"
                        alt="Page Not Found"
                        className="h-full w-full object-contain"
                    />
                }
            />
        </div>
    )
}
