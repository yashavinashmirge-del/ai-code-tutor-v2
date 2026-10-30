
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : page.tsx
// Module       : User Signup Page
// Description  : Provides email/password registration and
//                Google and GitHub signup options.
//
////////////////////////////////////////////////////////////

"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {

    // Store form input values.
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Store loading and error messages.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle email and password registration.
    async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        setLoading(true);

        try {
            const result = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message || "Signup failed.");
            }
        } catch {
            setError("Unable to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // Handle Google and GitHub signup.
    async function handleSocialSignup(provider: "google" | "github") {
        setError("");

        try {
            await authClient.signIn.social({
                provider,
                callbackURL: "/dashboard",
            });
        } catch {
            setError(`${provider} signup failed. Please try again.`);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10 text-white">

            <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Start learning and understanding code with AI.
                    </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    />

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

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
                    />

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
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-700" />
                    <span className="text-sm text-slate-500">OR</span>
                    <div className="h-px flex-1 bg-slate-700" />
                </div>

                <div className="space-y-3">

                    <button
                        onClick={() => handleSocialSignup("google")}
                        className="w-full rounded-lg border border-slate-700 py-3 hover:bg-slate-800"
                    >
                        Continue with Google
                    </button>

                    <button
                        onClick={() => handleSocialSignup("github")}
                        className="w-full rounded-lg border border-slate-700 py-3 hover:bg-slate-800"
                    >
                        Continue with GitHub
                    </button>

                </div>

                <p className="mt-6 text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-blue-400 hover:text-blue-300">
                        Login
                    </Link>
                </p>

            </section>

        </main>
    );
}
