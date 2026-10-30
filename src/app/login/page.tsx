
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : page.tsx
// Module       : User Login Page
// Description  : Allows users to log in using email and
//                password, Google or GitHub.
//
////////////////////////////////////////////////////////////

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {

    // Access Next.js navigation.
    const router = useRouter();

    // Store user input.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Store loading and error states.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle email and password login.
    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        setError("");
        setLoading(true);

        try {

            const result = await authClient.signIn.email({
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message || "Invalid email or password.");
                return;
            }

            // Navigate after successful login.
            router.push("/dashboard");

        } catch {

            setError("Unable to log in. Please try again.");

        } finally {

            setLoading(false);

        }
    }

    // Handle Google and GitHub login.
    async function handleSocialLogin(provider: "google" | "github") {

        setError("");

        try {

            await authClient.signIn.social({
                provider,
                callbackURL: "/dashboard",
            });

        } catch {

            setError(`${provider} login failed. Please try again.`);

        }
    }

    return (

        <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10 text-white">

            <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

                {/* Page heading */}
                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Log in to continue learning with AI.
                    </p>

                </div>

                {/* Email and password login form */}
                <form onSubmit={handleLogin} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    />

                    {/* Display login errors */}
                    {error && (

                        <p className="text-sm text-red-400">
                            {error}
                        </p>

                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* Social login separator */}
                <div className="my-6 flex items-center gap-3">

                    <div className="h-px flex-1 bg-slate-700" />

                    <span className="text-sm text-slate-500">
                        OR
                    </span>

                    <div className="h-px flex-1 bg-slate-700" />

                </div>

                {/* Google and GitHub login */}
                <div className="space-y-3">

                    <button
                        type="button"
                        onClick={() => handleSocialLogin("google")}
                        className="w-full rounded-lg border border-slate-700 py-3 hover:bg-slate-800"
                    >
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocialLogin("github")}
                        className="w-full rounded-lg border border-slate-700 py-3 hover:bg-slate-800"
                    >
                        Continue with GitHub
                    </button>

                </div>

                {/* Link to signup */}
                <p className="mt-6 text-center text-sm text-slate-400">

                    Don't have an account?{" "}

                    <Link
                        href="/signup"
                        className="font-semibold text-blue-400 hover:text-blue-300"
                    >
                        Create Account
                    </Link>

                </p>

            </section>

        </main>

    );
}
