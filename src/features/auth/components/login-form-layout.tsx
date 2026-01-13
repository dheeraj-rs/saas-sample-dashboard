export default function LoginFormLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-svh w-full">
            <div className="grid min-h-svh lg:grid-cols-2 w-full">
                <div className="relative hidden lg:flex flex-col bg-slate-900 text-white p-10 justify-between overflow-hidden">
                    <img
                        src="/login-illustration-pro.png"
                        alt="Conference Prime Event"
                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/10 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-blue-900/30 mix-blend-overlay"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 mb-6 border border-white/20">
                            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                            <span className="text-xs font-medium text-blue-100">Conference Prime v2.0</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight text-white">
                            The Complete Platform for Enterprise Events
                        </h2>
                        <p className="text-blue-100/90 text-lg leading-relaxed max-w-md">
                            Empower your organization with a unified platform for multi-event orchestration, real-time revenue analytics, and seamless attendee engagement.
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
                                    <p className="text-base font-semibold text-white mb-2">Global Event Intelligence</p>
                                    <p className="text-sm text-blue-200/80 leading-relaxed">
                                        "Conference Prime transformed how we scale our global summits. The ability to manage multiple organizations and visualize revenue streams in real-time is a game changer."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-rose-50/50 dark:bg-zinc-950">
                    {/* Logo outside the form */}
                    {/* <div className="w-full max-w-[400px] mx-auto flex items-center justify-start h-12 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <img
                            src="/cp-logo-name.png"
                            alt="Conference Prime"
                            className="h-full w-auto object-contain"
                        />
                    </div> */}

                    <div className="w-full max-w-[400px] mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
