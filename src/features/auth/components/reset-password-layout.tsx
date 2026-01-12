export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-background p-4 md:p-8">
            <div className="absolute top-0 left-0 right-0 h-[0.3rem] bg-gradient-to-l from-[#014799] via-[#014799]/95 to-[#014799]/5 z-10"></div>
            <div className="w-full max-w-[400px]">
                {children}
            </div>
        </div>
    )
}
