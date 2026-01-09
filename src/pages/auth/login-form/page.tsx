import { LoginForm } from "./login-form"
import { GalleryVerticalEnd } from "lucide-react"

export default function LoginFormPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2 border-t-[0.2rem] border-primary">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <img
                            src="/cp-logo-with-name.png"
                            alt="Conference Prime"
                            className="h-8 w-auto"
                        />
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <img
                    src="/placeholder.svg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
