import React from 'react'
import { IconPlus, IconRefresh, IconDownload, IconFilter } from "@tabler/icons-react"

function SamplePage() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-3 py-3 px-2 sm:gap-4 sm:py-4 md:gap-6 md:py-6 md:px-0">

                    {/* Action Buttons Section */}
                    <div className="px-2 sm:px-4 lg:px-6">
                        <div className="flex flex-wrap gap-3">
                            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                                <IconPlus size={18} />
                                Create New
                            </button>
                            <button className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                                <IconRefresh size={18} />
                                Refresh
                            </button>
                            <button className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                                <IconDownload size={18} />
                                Export
                            </button>
                            <button className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                                <IconFilter size={18} />
                                Filter
                            </button>
                        </div>
                    </div>

                    {/* Content Cards Section */}
                    <div className="px-2 sm:px-4 lg:px-6">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {/* Card 1 */}
                            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                                <h3 className="text-lg font-semibold mb-2">Total Teams</h3>
                                <p className="text-3xl font-bold text-primary">24</p>
                                <p className="text-sm text-muted-foreground mt-2">+3 from last month</p>
                            </div>

                            {/* Card 2 */}
                            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                                <h3 className="text-lg font-semibold mb-2">Active Members</h3>
                                <p className="text-3xl font-bold text-primary">1,284</p>
                                <p className="text-sm text-muted-foreground mt-2">+12% growth</p>
                            </div>

                            {/* Card 3 */}
                            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                                <h3 className="text-lg font-semibold mb-2">Departments</h3>
                                <p className="text-3xl font-bold text-primary">8</p>
                                <p className="text-sm text-muted-foreground mt-2">Across organization</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Content Section */}
                    <div className="px-2 sm:px-4 lg:px-6">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b">
                                    <div>
                                        <p className="font-medium">New team created: Marketing Team</p>
                                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b">
                                    <div>
                                        <p className="font-medium">Member added to Sales Division</p>
                                        <p className="text-sm text-muted-foreground">5 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <p className="font-medium">Quarterly report generated</p>
                                        <p className="text-sm text-muted-foreground">1 day ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SamplePage;