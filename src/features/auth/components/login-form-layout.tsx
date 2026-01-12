export default function LoginFormLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-svh">
            <div className="absolute top-0 left-0 right-0 h-[0.3rem] bg-gradient-to-l from-[#014799] via-[#014799]/95 to-[#014799]/5 z-10"></div>

            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="relative hidden lg:flex flex-col overflow-hidden bg-primary">
                    <img
                        src="/login-illustration-pro.png"
                        alt="Conference Prime - Professional conference management platform"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/35 via-primary/15 to-primary/25"></div>
                    <div className="relative z-10 flex flex-col justify-end p-12 h-full">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                        <div className="relative max-w-xl space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold leading-tight text-blue-50">
                                    Streamline Your Conference Management
                                </h1>
                                <p className="text-lg text-blue-100/90 leading-relaxed">
                                    Conference Prime empowers organizers to create exceptional events with powerful tools for registration, scheduling, and attendee engagement.
                                </p>
                            </div>
                            <div className="space-y-3 pt-2">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100/20 flex items-center justify-center mt-1">
                                        <svg className="w-3 h-3 text-blue-100" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-blue-50">Seamless Registration</h3>
                                        <p className="text-sm text-blue-100/80">Effortless attendee registration and payment processing</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100/20 flex items-center justify-center mt-1">
                                        <svg className="w-3 h-3 text-blue-100" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-blue-50">Smart Scheduling</h3>
                                        <p className="text-sm text-blue-100/80">Intelligent session planning and conflict resolution</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100/20 flex items-center justify-center mt-1">
                                        <svg className="w-3 h-3 text-blue-100" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-blue-50">Real-time Analytics</h3>
                                        <p className="text-sm text-blue-100/80">Comprehensive insights and engagement metrics</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 p-6 md:p-10 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
