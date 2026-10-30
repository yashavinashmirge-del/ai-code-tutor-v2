
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : page.tsx
// Module       : User Registration Page
// Description  : Provides a professional signup page with
//                email/password registration, Google and
//                GitHub authentication, and an animated
//                AI mentor slideshow.
//
////////////////////////////////////////////////////////////

"use client";

import { useState } from "react";
import Link from "next/link";

import AIMentorSlideshow from "@/components/AIMentorSlideshow";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {

    // Store the registration form values.
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Store password visibility.
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Store loading and error states.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle email and password registration.
    const handleSignup = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();
        setError("");

        // Check whether passwords match.
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Validate minimum password length.
        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        try {
            setLoading(true);

            const result = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/dashboard",
            });

            if (result.error) {
                setError(result.error.message || "Unable to create account.");
            }

        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle Google and GitHub social authentication.
    const handleSocialSignup = async (
        provider: "google" | "github"
    ) => {

        try {
            setError("");
            setLoading(true);

            await authClient.signIn.social({
                provider,
                callbackURL: "/dashboard",
            });

        } catch {
            setError(`${provider} authentication failed.`);
            setLoading(false);
        }
    };

    return (
        <main className="signup-page">

            {/* =========================================
                LEFT SECTION - BRAND AND AI MENTOR
            ========================================= */}

            <section className="welcome-section">

                <div className="welcome-background">
                    <div className="background-orb orb-one" />
                    <div className="background-orb orb-two" />
                    <div className="background-grid" />
                </div>

                <div className="welcome-top">

                    {/* Application branding */}
                    <Link href="/" className="brand">

                        <span className="brand-icon">✦</span>

                        <span className="brand-name">
                            Code<span>Tutor</span>
                        </span>

                    </Link>

                    {/* Welcome content */}
                    <div className="welcome-content">

                        <div className="welcome-badge">
                            <span className="badge-dot" />
                            YOUR AI-POWERED CODING COMPANION
                        </div>

                        <h1>
                            Don't just write code.
                            <span> Understand it.</span>
                        </h1>

                        <p className="welcome-description">
                            Learn programming, understand complex logic,
                            debug errors and visualize algorithms with
                            your personal AI coding tutor.
                        </p>

                        {/* Platform highlights */}
                        <div className="platform-highlights">

                            <div className="highlight-item">
                                <span className="highlight-icon">✧</span>
                                <span>Learn step by step</span>
                            </div>

                            <div className="highlight-item">
                                <span className="highlight-icon">⌘</span>
                                <span>Debug intelligently</span>
                            </div>

                            <div className="highlight-item">
                                <span className="highlight-icon">◈</span>
                                <span>Visualize algorithms</span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Animated AI mentor slideshow */}
                <div className="mentor-wrapper">
                    <AIMentorSlideshow />
                </div>

                {/* Footer */}
                <footer className="welcome-footer">
                    <span>© 2026 CodeTutor</span>
                    <span>Learn. Build. Understand.</span>
                </footer>

            </section>


            {/* =========================================
                RIGHT SECTION - SIGNUP FORM
            ========================================= */}

            <section className="form-section">

                <div className="form-container">

                    {/* Mobile branding */}
                    <Link href="/" className="mobile-brand">
                        <span className="brand-icon">✦</span>
                        <span className="brand-name">
                            Code<span>Tutor</span>
                        </span>
                    </Link>

                    {/* Form heading */}
                    <div className="form-heading">

                        <div className="form-eyebrow">
                            START YOUR JOURNEY
                        </div>

                        <h2>Create your account</h2>

                        <p>
                            Join CodeTutor and start learning smarter.
                        </p>

                    </div>


                    {/* Error message */}
                    {error && (
                        <div className="error-message" role="alert">
                            <span>!</span>
                            {error}
                        </div>
                    )}


                    {/* Registration form */}
                    <form onSubmit={handleSignup}>

                        {/* Full name */}
                        <div className="form-group">

                            <label htmlFor="name">
                                Full name
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">♙</span>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    autoComplete="name"
                                    required
                                />

                            </div>

                        </div>


                        {/* Email address */}
                        <div className="form-group">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">✉</span>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    autoComplete="email"
                                    required
                                />

                            </div>

                        </div>


                        {/* Password */}
                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">♧</span>

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* Confirm password */}
                        <div className="form-group">

                            <label htmlFor="confirmPassword">
                                Confirm password
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">♧</span>

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(event) =>
                                        setConfirmPassword(event.target.value)
                                    }
                                    autoComplete="new-password"
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* Create account button */}
                        <button
                            type="submit"
                            className="signup-button"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="button-spinner" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create account
                                    <span>→</span>
                                </>
                            )}

                        </button>

                    </form>


                    {/* Divider */}
                    <div className="form-divider">
                        <span />
                        <p>OR CONTINUE WITH</p>
                        <span />
                    </div>


                    {/* Social authentication */}
                    <div className="social-buttons">

                        <button
                            type="button"
                            className="social-button"
                            disabled={loading}
                            onClick={() => handleSocialSignup("google")}
                        >
                            <span className="google-icon">G</span>
                            Google
                        </button>

                        <button
                            type="button"
                            className="social-button"
                            disabled={loading}
                            onClick={() => handleSocialSignup("github")}
                        >
                            <svg
                                width="19"
                                height="19"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.02.76 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                            </svg>
                            GitHub
                        </button>

                    </div>


                    {/* Login link */}
                    <p className="login-prompt">
                        Already have an account?
                        <Link href="/login">Sign in</Link>
                    </p>


                    {/* Terms */}
                    <p className="terms-text">
                        By creating an account, you agree to our
                        <Link href="/terms"> Terms of Service </Link>
                        and
                        <Link href="/privacy"> Privacy Policy</Link>.
                    </p>

                </div>

            </section>


            {/* =========================================
                PAGE STYLES
            ========================================= */}

            <style jsx>{`

                /* Main page layout */

                .signup-page {
                    min-height: 100vh;
                    display: grid;
                    grid-template-columns: 1fr 0.85fr;
                    background: #080b18;
                    color: #f8fafc;
                    font-family: Arial, Helvetica, sans-serif;
                }

                /* LEFT WELCOME SECTION */

                .welcome-section {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    overflow: hidden;
                    padding: 38px 7%;
                    background:
                        linear-gradient(
                            145deg,
                            #10132b 0%,
                            #11102b 50%,
                            #17113b 100%
                        );
                    border-right: 1px solid rgba(255,255,255,0.06);
                }

                .welcome-background {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                }

                .background-grid {
                    position: absolute;
                    inset: 0;
                    opacity: 0.12;
                    background-image:
                        linear-gradient(
                            rgba(167,139,250,0.12) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            rgba(167,139,250,0.12) 1px,
                            transparent 1px
                        );
                    background-size: 45px 45px;
                    mask-image: linear-gradient(
                        to bottom,
                        black,
                        transparent 85%
                    );
                }

                .background-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(90px);
                    opacity: 0.18;
                }

                .orb-one {
                    width: 400px;
                    height: 400px;
                    top: -180px;
                    left: -100px;
                    background: #7c3aed;
                }

                .orb-two {
                    width: 350px;
                    height: 350px;
                    right: -160px;
                    bottom: 0;
                    background: #4f46e5;
                }

                .welcome-top,
                .mentor-wrapper,
                .welcome-footer {
                    position: relative;
                    z-index: 1;
                }

                /* BRAND */

                .brand,
                .mobile-brand {
                    display: inline-flex;
                    align-items: center;
                    gap: 11px;
                    width: fit-content;
                    color: white;
                    text-decoration: none;
                }

                .brand-icon {
                    width: 39px;
                    height: 39px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    background: linear-gradient(
                        135deg,
                        #8b5cf6,
                        #6366f1
                    );
                    color: white;
                    font-size: 24px;
                    box-shadow: 0 5px 25px rgba(124,58,237,0.3);
                }

                .brand-name {
                    font-size: 23px;
                    font-weight: 800;
                    letter-spacing: -1px;
                }

                .brand-name span {
                    color: #a78bfa;
                }

                /* WELCOME CONTENT */

                .welcome-content {
                    max-width: 570px;
                    margin-top: 75px;
                }

                .welcome-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;
                    padding: 9px 13px;
                    border: 1px solid rgba(167,139,250,0.2);
                    border-radius: 30px;
                    background: rgba(139,92,246,0.1);
                    color: #c4b5fd;
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: 1.3px;
                }

                .badge-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #34d399;
                    box-shadow: 0 0 10px #34d399;
                }

                .welcome-content h1 {
                    margin-top: 24px;
                    color: white;
                    font-size: clamp(38px, 4.3vw, 59px);
                    font-weight: 850;
                    line-height: 1.13;
                    letter-spacing: -2.8px;
                }

                .welcome-content h1 span {
                    display: block;
                    color: #a78bfa;
                }

                .welcome-description {
                    max-width: 480px;
                    margin-top: 20px;
                    color: #a5abc2;
                    font-size: 14px;
                    line-height: 1.9;
                }

                /* PLATFORM HIGHLIGHTS */

                .platform-highlights {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 13px 22px;
                    margin-top: 28px;
                }

                .highlight-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #cbd5e1;
                    font-size: 11px;
                    font-weight: 600;
                }

                .highlight-icon {
                    color: #a78bfa;
                    font-size: 17px;
                }

                /* AI MENTOR SLIDESHOW */

                .mentor-wrapper {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    margin: 12px auto;
                }

                .mentor-wrapper :global(.mentor-slideshow) {
                    width: 100%;
                    max-width: 440px;
                    margin: 0 auto;
                }

                .mentor-wrapper :global(.mentor-character) {
                    height: 190px;
                }

                .mentor-wrapper :global(.mentor-character img) {
                    width: 180px;
                    height: 180px;
                }

                /* FOOTER */

                .welcome-footer {
                    display: flex;
                    justify-content: space-between;
                    gap: 15px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255,255,255,0.08);
                    color: #777f9b;
                    font-size: 10px;
                }

                /* RIGHT FORM SECTION */

                .form-section {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 45px 9%;
                    background:
                        radial-gradient(
                            circle at 90% 10%,
                            rgba(99,102,241,0.09),
                            transparent 35%
                        ),
                        #0b0e1c;
                }

                .form-container {
                    width: 100%;
                    max-width: 410px;
                }

                .mobile-brand {
                    display: none;
                    margin-bottom: 40px;
                }

                .form-heading {
                    margin-bottom: 30px;
                }

                .form-eyebrow {
                    margin-bottom: 12px;
                    color: #a78bfa;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 2px;
                }

                .form-heading h2 {
                    color: #f8fafc;
                    font-size: 31px;
                    font-weight: 800;
                    letter-spacing: -1.2px;
                }

                .form-heading p {
                    margin-top: 9px;
                    color: #929bb3;
                    font-size: 13px;
                }

                /* ERROR MESSAGE */

                .error-message {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 18px;
                    padding: 12px 14px;
                    border: 1px solid rgba(248,113,113,0.25);
                    border-radius: 10px;
                    background: rgba(239,68,68,0.08);
                    color: #fca5a5;
                    font-size: 12px;
                }

                .error-message span {
                    width: 19px;
                    height: 19px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: rgba(239,68,68,0.2);
                    font-weight: 800;
                }

                /* FORM INPUTS */

                .form-group {
                    margin-bottom: 18px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 9px;
                    color: #dbe2f0;
                    font-size: 12px;
                    font-weight: 650;
                }

                .input-wrapper {
                    height: 49px;
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    padding: 0 14px;
                    border: 1px solid #252b43;
                    border-radius: 10px;
                    background: #111629;
                    transition: border-color 0.25s, box-shadow 0.25s;
                }

                .input-wrapper:focus-within {
                    border-color: #8b5cf6;
                    box-shadow: 0 0 0 3px rgba(139,92,246,0.12);
                }

                .input-icon {
                    color: #929bb3;
                    font-size: 17px;
                }

                .input-wrapper input {
                    width: 100%;
                    min-width: 0;
                    height: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: white;
                    font-size: 12px;
                }

                .input-wrapper input::placeholder {
                    color: #66708a;
                }

                .password-toggle {
                    border: none;
                    background: transparent;
                    color: #a78bfa;
                    font-size: 10px;
                    font-weight: 700;
                    cursor: pointer;
                }

                /* CREATE ACCOUNT BUTTON */

                .signup-button {
                    width: 100%;
                    height: 51px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-top: 8px;
                    border: none;
                    border-radius: 10px;
                    background: linear-gradient(
                        110deg,
                        #7c3aed,
                        #6366f1
                    );
                    color: white;
                    font-size: 13px;
                    font-weight: 750;
                    cursor: pointer;
                    box-shadow: 0 8px 25px rgba(99,102,241,0.2);
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .signup-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 30px rgba(99,102,241,0.35);
                }

                .signup-button:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                .signup-button span {
                    font-size: 18px;
                }

                .button-spinner {
                    width: 15px;
                    height: 15px;
                    border: 2px solid rgba(255,255,255,0.35);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* DIVIDER */

                .form-divider {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    margin: 27px 0 20px;
                }

                .form-divider span {
                    flex: 1;
                    height: 1px;
                    background: #252b43;
                }

                .form-divider p {
                    color: #78819a;
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: 1px;
                    white-space: nowrap;
                }

                /* SOCIAL BUTTONS */

                .social-buttons {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .social-button {
                    height: 47px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    border: 1px solid #292f47;
                    border-radius: 10px;
                    background: #111629;
                    color: #e2e8f0;
                    font-size: 12px;
                    font-weight: 650;
                    cursor: pointer;
                    transition: background 0.2s, border-color 0.2s;
                }

                .social-button:hover:not(:disabled) {
                    border-color: #8b5cf6;
                    background: #191d35;
                }

                .social-button:disabled {
                    opacity: 0.55;
                    cursor: not-allowed;
                }

                .google-icon {
                    color: #60a5fa;
                    font-size: 19px;
                    font-weight: 850;
                }

                /* LOGIN AND TERMS */

                .login-prompt {
                    margin-top: 27px;
                    color: #929bb3;
                    text-align: center;
                    font-size: 12px;
                }

                .login-prompt a {
                    margin-left: 5px;
                    color: #a78bfa;
                    font-weight: 750;
                    text-decoration: none;
                }

                .login-prompt a:hover,
                .terms-text a:hover {
                    text-decoration: underline;
                }

                .terms-text {
                    margin-top: 24px;
                    color: #68728a;
                    text-align: center;
                    font-size: 10px;
                    line-height: 1.8;
                }

                .terms-text a {
                    color: #a78bfa;
                    text-decoration: none;
                }

                /* RESPONSIVE DESIGN */

                @media (max-width: 1100px) {

                    .signup-page {
                        grid-template-columns: 1fr 0.95fr;
                    }

                    .welcome-section {
                        padding-left: 6%;
                        padding-right: 6%;
                    }

                    .welcome-content h1 {
                        font-size: 43px;
                    }

                    .form-section {
                        padding-left: 7%;
                        padding-right: 7%;
                    }

                }

                @media (max-width: 900px) {

                    .signup-page {
                        grid-template-columns: 1fr;
                    }

                    .welcome-section {
                        min-height: auto;
                        padding: 30px 7% 20px;
                    }

                    .welcome-content {
                        margin-top: 55px;
                    }

                    .welcome-content h1 {
                        font-size: 46px;
                    }

                    .mentor-wrapper {
                        margin-top: 20px;
                    }

                    .form-section {
                        min-height: auto;
                        padding: 65px 8%;
                    }

                    .welcome-footer {
                        margin-top: 20px;
                    }

                }

                @media (max-width: 520px) {

                    .welcome-section {
                        padding: 25px 22px 18px;
                    }

                    .welcome-content {
                        margin-top: 43px;
                    }

                    .welcome-content h1 {
                        font-size: 37px;
                        letter-spacing: -1.8px;
                    }

                    .welcome-description {
                        font-size: 12px;
                    }

                    .platform-highlights {
                        gap: 12px;
                    }

                    .highlight-item {
                        font-size: 10px;
                    }

                    .form-section {
                        padding: 45px 22px;
                    }

                    .mobile-brand {
                        display: inline-flex;
                    }

                    .form-heading h2 {
                        font-size: 27px;
                    }

                    .welcome-footer {
                        font-size: 9px;
                    }

                }

                @media (max-width: 360px) {

                    .social-buttons {
                        grid-template-columns: 1fr;
                    }

                    .welcome-content h1 {
                        font-size: 32px;
                    }

                }

                /* Short desktop screens */

                @media (min-width: 901px) and (max-height: 760px) {

                    .welcome-section {
                        padding-top: 25px;
                        padding-bottom: 20px;
                    }

                    .welcome-content {
                        margin-top: 35px;
                    }

                    .welcome-content h1 {
                        font-size: 40px;
                    }

                    .mentor-wrapper :global(.mentor-character) {
                        height: 145px;
                    }

                    .mentor-wrapper :global(.mentor-character img) {
                        width: 140px;
                        height: 140px;
                    }

                    .form-section {
                        padding-top: 25px;
                        padding-bottom: 25px;
                    }

                    .form-group {
                        margin-bottom: 13px;
                    }

                }

                /* Accessibility: reduce motion when requested */

                @media (prefers-reduced-motion: reduce) {

                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        scroll-behavior: auto !important;
                        transition-duration: 0.01ms !important;
                    }

                }

            `}</style>

        </main>
    );
}
