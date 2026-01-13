export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center bg-rose-50 p-4 md:p-8">
            <div className="absolute top-0 left-0 right-0 h-[0.3rem] bg-gradient-to-r from-[#014799] via-[#014799]/90 to-[#014799]/80 z-10"></div>

            {/* Logo outside the card */}
            <div className="flex items-center justify-center h-12 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <img
                    src="/cp-logo-name.png"
                    alt="Conference Prime"
                    className="h-full w-auto object-contain"
                />
            </div>

            <div className="w-full max-w-[450px]">
                {children}
            </div>
        </div>
    )
}
