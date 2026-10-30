////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : page.tsx
// Module       : User Dashboard
// Description  : Main dashboard displayed after login
//                or successful account registration.
//
////////////////////////////////////////////////////////////

import Link from "next/link";

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-[#080d1c] text-white p-8">

            <div className="max-w-6xl mx-auto">

                {/* Dashboard Header */}
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold">
                            CodeTutor
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Your AI-powered coding workspace
                        </p>
                    </div>

                    <span className="text-sm text-green-400">
                        ● Account Active
                    </span>
                </header>

                {/* Welcome Section */}
                <section className="mb-12">
                    <h2 className="text-4xl font-bold mb-3">
                        Welcome to CodeTutor!
                    </h2>

                    <p className="text-gray-400">
                        Learn, build and understand code with your AI mentor.
                    </p>
                </section>

                {/* Dashboard Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <DashboardCard
                        title="Code Workspace"
                        description="Write, execute and understand your code."
                        href="/workspace"
                    />

                    <DashboardCard
                        title="AI Code Explanation"
                        description="Understand code line by line."
                        href="/workspace?action=Explain%20Code"
                    />

                    <DashboardCard
                        title="Visual Execution"
                        description="Visualize algorithms and program execution."
                        href="/workspace?view=visual"
                    />

                </section>

            </div>

        </main>
    );
}

// Reusable dashboard card component.
function DashboardCard({
    title,
    description,
    href,
}: {
    title: string;
    description: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
        >
            <h3 className="text-xl font-semibold mb-3">
                {title}
            </h3>

            <p className="text-gray-400 text-sm">
                {description}
            </p>

            <p className="text-indigo-400 mt-6">
                Open Workspace →
            </p>
        </Link>
    );
}