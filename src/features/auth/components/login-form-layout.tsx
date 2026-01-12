export default function LoginFormLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-svh w-full">
            {/* Top branding bar for mobile/background */}
            {/* <div className="absolute top-0 left-0 right-0 h-[0.3rem] bg-gradient-to-r from-primary via-primary/80 to-primary/20 z-20"></div> */}

            {/* Main Container */}
            <div className="grid min-h-svh lg:grid-cols-2 w-full">
                {/* Left Side: Branding/Image */}
                <div className="relative hidden lg:flex flex-col bg-slate-900 text-white p-10 justify-between overflow-hidden">
                    {/* Background Image */}
                    <img
                        src="/login-illustration-pro.png"
                        alt="Conference Prime Event"
                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/10 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-blue-900/30 mix-blend-overlay"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 mb-6 border border-white/20">
                            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                            <span className="text-xs font-medium text-blue-100">Enterprise Edition v2.0</span>
                        </div>
                        <h2 className="text-4xl font-bold leading-tight mb-4 tracking-tight">
                            Elevate Your Corporate Events
                        </h2>
                        <p className="text-blue-100/90 text-lg leading-relaxed max-w-md">
                            Streamline your conference logistics, manage multiple organizations, and gain actionable insights with Conference Prime's all-in-one platform.
                        </p>
                    </div>

                    <div className="relative z-10 mt-auto pt-10">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-2xl">
                            <div className="flex gap-4 items-start">
                                <div className="h-12 w-12 rounded-full bg-indigo-500/30 flex items-center justify-center shrink-0 border border-white/20">
                                    <svg className="w-6 h-6 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-base font-semibold text-white mb-2">Centralized Management</p>
                                    <p className="text-sm text-blue-200/80 leading-relaxed">
                                        "Conference Prime has totally revolutionized our event workflows, from attendee management to real-time analytics. It's the command center we always needed."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white dark:bg-zinc-950">
                    <div className="w-full max-w-[400px] mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
