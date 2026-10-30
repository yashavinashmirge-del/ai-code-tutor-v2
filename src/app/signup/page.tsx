
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : page.tsx
// Module       : User Registration
//
// Description  : Provides a complete signup interface
//                for new CodeTutor users.
//
// Main Features:
//                1. Email and password registration
//                2. Google authentication
//                3. GitHub authentication
//                4. Password visibility controls
//                5. Password confirmation validation
//                6. Input validation and error handling
//                7. Animated AI Mentor slideshow
//                8. Responsive registration layout
//                9. Loading states and accessibility
//
////////////////////////////////////////////////////////////

"use client";

// React hooks and event types.
import { useState, type FormEvent } from "react";

// Next.js navigation component.
import Link from "next/link";

// AI Mentor slideshow component.
import AIMentorSlideshow from "@/components/AIMentorSlideshow";

// Better Auth frontend client.
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {

    // =====================================================
    // SECTION 1: FORM STATE MANAGEMENT
    // Stores user input and controls the signup interface.
    // =====================================================

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Controls password visibility.
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Tracks form submission and authentication errors.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =====================================================
    // SECTION 2: EMAIL SIGNUP HANDLER
    // Validates user input and registers the user through
    // Better Auth using email and password.
    // =====================================================

    const handleSignup = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        // Prevent the default browser form submission.
        event.preventDefault();

        // Clear any previous error.
        setError("");

        // Clean user input before sending it to the server.
        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        // Validate the user's name.
        if (cleanName.length < 2) {
            setError("Please enter a valid name.");
            return;
        }

        // Validate email input.
        if (!cleanEmail) {
            setError("Please enter your email address.");
            return;
        }

        // Check whether both password fields match.
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Enforce the minimum password length.
        if (password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        try {

            // Activate the loading state.
            setLoading(true);

            // Send registration details to Better Auth.
            const result = await authClient.signUp.email({
                name: cleanName,
                email: cleanEmail,
                password,
                callbackURL: "/dashboard",
            });

            // Display an authentication error if returned.
            if (result.error) {
                setError(
                    result.error.message ||
                    "Unable to create your account."
                );
            }

            // Better Auth handles successful navigation
            // through the configured callback URL.

        } catch (signupError) {

            // Log the technical error for debugging.
            console.error("Signup error:", signupError);

            // Show a user-friendly error.
            setError("Something went wrong. Please try again.");

        } finally {

            // Stop the loading state after the request.
            setLoading(false);

        }
    };

    // =====================================================
    // SECTION 3: SOCIAL SIGNUP HANDLER
    // Starts Google or GitHub OAuth authentication.
    // =====================================================

    const handleSocialSignup = async (
        provider: "google" | "github"
    ) => {

        try {

            // Clear previous error messages.
            setError("");

            // Activate the loading state.
            setLoading(true);

            // Start the selected social authentication.
            const result = await authClient.signIn.social({
                provider,
                callbackURL: "/dashboard",
            });

            // Handle errors returned by Better Auth.
            if (result.error) {

                setError(
                    result.error.message ||
                    `Unable to continue with ${provider}.`
                );

                setLoading(false);
            }

            // On successful OAuth initiation, the browser
            // is redirected to the provider's login page.

        } catch (socialError) {

            // Log the error for debugging.
            console.error(`${provider} signup error:`, socialError);

            // Display a friendly error message.
            setError(
                `Unable to continue with ${provider}. Please try again.`
            );

            setLoading(false);

        }
    };

    // =====================================================
    // SECTION 4: PAGE USER INTERFACE
    // Displays the promotional panel and registration form.
    // =====================================================

    return (

        <main className="signup-page">

            {/* =============================================
                LEFT PANEL: BRAND AND AI MENTOR
            ============================================= */}

            <section className="signup-left">

                {/* Brand logo and homepage navigation. */}
                <Link href="/" className="signup-brand">

                    <span className="signup-brand-icon">
                        <span>⌘</span>
                    </span>

                    <span className="signup-brand-text">
                        <strong>CodeTutor</strong>
                        <small>Learn. Build. Understand.</small>
                    </span>

                </Link>

                {/* Decorative background glow effects. */}
                <div className="signup-glow signup-glow-one" />
                <div className="signup-glow signup-glow-two" />

                {/* Promotional introduction. */}
                <div className="signup-intro">

                    <div className="signup-eyebrow">
                        <span className="online-indicator" />
                        YOUR AI-POWERED CODING COMPANION
                    </div>

                    <h1>
                        Don't just write code.
                        <span>Understand it.</span>
                    </h1>

                    <p>
                        Learn programming, understand complex logic,
                        debug errors and visualize algorithms with
                        your personal AI coding tutor.
                    </p>

                    {/* Main platform benefits. */}
                    <div className="signup-benefits">

                        <div>
                            <span>✦</span>
                            Learn step by step
                        </div>

                        <div>
                            <span>⌘</span>
                            Debug intelligently
                        </div>

                        <div>
                            <span>◈</span>
                            Visualize algorithms
                        </div>

                    </div>

                </div>

                {/* Animated AI Mentor slideshow. */}
                <div className="signup-mentor-wrapper">
                    <AIMentorSlideshow />
                </div>

                {/* Promotional panel footer. */}
                <div className="signup-left-footer">

                    <span>© 2026 CodeTutor</span>
                    <span>Learn. Build. Understand.</span>

                </div>

            </section>


            {/* =============================================
                RIGHT PANEL: REGISTRATION FORM
            ============================================= */}

            <section className="signup-right">

                <div className="signup-form-container">

                    {/* Registration heading. */}
                    <div className="form-heading">

                        <span className="form-label">
                            GET STARTED TODAY
                        </span>

                        <h2>Create your account</h2>

                        <p>
                            Join CodeTutor and start learning smarter.
                        </p>

                    </div>


                    {/* =====================================
                        EMAIL AND PASSWORD REGISTRATION
                    ===================================== */}

                    <form
                        className="signup-form"
                        onSubmit={handleSignup}
                        noValidate
                    >

                        {/* Full name input. */}
                        <div className="form-group">

                            <label htmlFor="signup-name">
                                Full name
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon" aria-hidden="true">
                                    ♙
                                </span>

                                <input
                                    id="signup-name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    autoComplete="name"
                                    required
                                    disabled={loading}
                                    minLength={2}
                                />

                            </div>

                        </div>


                        {/* Email address input. */}
                        <div className="form-group">

                            <label htmlFor="signup-email">
                                Email address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon" aria-hidden="true">
                                    ✉
                                </span>

                                <input
                                    id="signup-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    autoComplete="email"
                                    required
                                    disabled={loading}
                                />

                            </div>

                        </div>


                        {/* Password input with visibility control. */}
                        <div className="form-group">

                            <label htmlFor="signup-password">
                                Password
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon" aria-hidden="true">
                                    ♧
                                </span>

                                <input
                                    id="signup-password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    autoComplete="new-password"
                                    minLength={8}
                                    required
                                    disabled={loading}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword((current) => !current)
                                    }
                                    disabled={loading}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                            <span className="field-hint">
                                Use at least 8 characters.
                            </span>

                        </div>


                        {/* Confirm password input. */}
                        <div className="form-group">

                            <label htmlFor="signup-confirm-password">
                                Confirm password
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon" aria-hidden="true">
                                    ♧
                                </span>

                                <input
                                    id="signup-confirm-password"
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
                                    disabled={loading}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (current) => !current
                                        )
                                    }
                                    disabled={loading}
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide confirm password"
                                            : "Show confirm password"
                                    }
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>

                            </div>

                        </div>


                        {/* Display authentication and validation errors. */}
                        {error && (

                            <div
                                className="signup-error"
                                role="alert"
                                aria-live="polite"
                            >
                                <span>!</span>
                                {error}
                            </div>

                        )}


                        {/* Main registration button. */}
                        <button
                            type="submit"
                            className="signup-submit"
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


                    {/* =====================================
                        SOCIAL AUTHENTICATION
                    ===================================== */}

                    <div className="social-divider">
                        <span />
                        <p>OR CONTINUE WITH</p>
                        <span />
                    </div>

                    <div className="social-buttons">

                        {/* Google signup button. */}
                        <button
                            type="button"
                            className="social-button"
                            onClick={() => handleSocialSignup("google")}
                            disabled={loading}
                        >
                            <span className="google-icon">G</span>
                            Google
                        </button>

                        {/* GitHub signup button. */}
                        <button
                            type="button"
                            className="social-button"
                            onClick={() => handleSocialSignup("github")}
                            disabled={loading}
                        >

                            <svg
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.91.1-.72.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.6 10.6 0 0 1 5.57 0c2.12-1.45 3.06-1.15 3.06-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.61 5.25-5.1 5.53.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                            </svg>

                            GitHub

                        </button>

                    </div>


                    {/* Navigation to the login page. */}
                    <div className="login-prompt">

                        Already have an account?

                        <Link href="/login">
                            Sign in
                        </Link>

                    </div>


                    {/* Terms and privacy information. */}
                    <p className="signup-terms">

                        By creating an account, you agree to our{" "}

                        <Link href="/terms">
                            Terms of Service
                        </Link>

                        {" "}and{" "}

                        <Link href="/privacy">
                            Privacy Policy
                        </Link>.

                    </p>

                </div>

            </section>


            {/* =============================================
                SECTION 5: PAGE STYLING
                Defines the two-column layout, form design,
                colors, buttons, animations and responsiveness.
            ============================================= */}

            <style jsx>{`

                /* Main page layout. */
                .signup-page {
                    display: grid;
                    grid-template-columns: minmax(0, 1.08fr) minmax(0, .92fr);
                    min-height: 100vh;
                    background: #090d1b;
                    color: #f8fafc;
                }

                /* Left promotional panel. */
                .signup-left {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    min-height: 100vh;
                    overflow: hidden;
                    padding: 30px 7% 20px;
                    border-right: 1px solid rgba(255,255,255,.06);
                    background:
                        radial-gradient(circle at 15% 20%, rgba(91,49,174,.25), transparent 45%),
                        linear-gradient(145deg,#17132f,#10132a 75%,#15123a);
                    isolation: isolate;
                }

                /* Brand logo. */
                .signup-brand {
                    position: relative;
                    z-index: 2;
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    width: fit-content;
                    color: #fff;
                    text-decoration: none;
                }

                .signup-brand-icon {
                    display: grid;
                    width: 43px;
                    height: 43px;
                    place-items: center;
                    border-radius: 13px;
                    background: linear-gradient(135deg,#8b5cf6,#4f46e5);
                    box-shadow: 0 8px 25px rgba(124,58,237,.3);
                }

                .signup-brand-icon span {
                    font-size: 22px;
                    font-weight: 800;
                }

                .signup-brand-text {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .signup-brand-text strong {
                    font-size: 17px;
                }

                .signup-brand-text small {
                    color: #9ba7c0;
                    font-size: 10px;
                }

                /* Decorative background glows. */
                .signup-glow {
                    position: absolute;
                    z-index: -1;
                    width: 350px;
                    height: 350px;
                    border-radius: 50%;
                    filter: blur(110px);
                    opacity: .2;
                    pointer-events: none;
                }

                .signup-glow-one {
                    top: 20%;
                    left: -200px;
                    background: #7c3aed;
                }

                .signup-glow-two {
                    right: -200px;
                    bottom: 5%;
                    background: #4f46e5;
                }

                /* Promotional introduction. */
                .signup-intro {
                    position: relative;
                    z-index: 1;
                    max-width: 650px;
                    margin-top: clamp(45px,8vh,90px);
                }

                .signup-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;
                    padding: 10px 14px;
                    border: 1px solid rgba(167,139,250,.25);
                    border-radius: 30px;
                    background: rgba(139,92,246,.1);
                    color: #c4b5fd;
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: 1.4px;
                }

                .online-indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #34d399;
                    box-shadow: 0 0 10px #34d399;
                }

                .signup-intro h1 {
                    max-width: 590px;
                    margin: 25px 0 18px;
                    color: #fff;
                    font-size: clamp(34px,3.6vw,54px);
                    font-weight: 850;
                    line-height: 1.12;
                    letter-spacing: -2px;
                }

                .signup-intro h1 span {
                    display: block;
                    background: linear-gradient(100deg,#a78bfa,#60a5fa);
                    background-clip: text;
                    -webkit-background-clip: text;
                    color: transparent;
                }

                .signup-intro > p {
                    max-width: 550px;
                    margin: 0;
                    color: #a5b4cc;
                    font-size: 14px;
                    line-height: 1.9;
                }

                /* Platform benefit list. */
                .signup-benefits {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-top: 27px;
                }

                .signup-benefits div {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: #dbe4f4;
                    font-size: 11px;
                    font-weight: 650;
                }

                .signup-benefits span {
                    color: #a78bfa;
                    font-size: 18px;
                }

                /* AI Mentor slideshow container. */
                .signup-mentor-wrapper {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    max-width: 480px;
                    margin: auto auto 15px;
                }

                /* Left panel footer. */
                .signup-left-footer {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    justify-content: space-between;
                    gap: 12px;
                    padding-top: 17px;
                    border-top: 1px solid rgba(255,255,255,.09);
                    color: #8995b0;
                    font-size: 10px;
                }

                /* Right registration panel. */
                .signup-right {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 0;
                    padding: 55px 8%;
                    background: #090d1b;
                }

                .signup-form-container {
                    width: 100%;
                    max-width: 460px;
                }

                /* Form heading. */
                .form-heading {
                    margin-bottom: 30px;
                }

                .form-label {
                    color: #a78bfa;
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: 1.8px;
                }

                .form-heading h2 {
                    margin: 13px 0 8px;
                    color: #f8fafc;
                    font-size: clamp(27px,3vw,36px);
                    font-weight: 850;
                    letter-spacing: -1px;
                }

                .form-heading p {
                    margin: 0;
                    color: #91a0bb;
                    font-size: 13px;
                    line-height: 1.7;
                }

                /* Registration form layout. */
                .signup-form {
                    display: flex;
                    flex-direction: column;
                    gap: 17px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 9px;
                }

                .form-group label {
                    color: #e2e8f0;
                    font-size: 11px;
                    font-weight: 750;
                }

                /* Input field containers. */
                .input-wrapper {
                    display: flex;
                    align-items: center;
                    min-height: 52px;
                    padding: 0 14px;
                    border: 1px solid #27324b;
                    border-radius: 10px;
                    background: #11182b;
                    transition: border-color .2s,box-shadow .2s;
                }

                .input-wrapper:focus-within {
                    border-color: #8b5cf6;
                    box-shadow: 0 0 0 3px rgba(139,92,246,.12);
                }

                .input-icon {
                    flex-shrink: 0;
                    margin-right: 12px;
                    color: #94a3b8;
                    font-size: 16px;
                }

                .input-wrapper input {
                    width: 100%;
                    min-width: 0;
                    height: 49px;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #f8fafc;
                    font-size: 12px;
                }

                .input-wrapper input::placeholder {
                    color: #71809e;
                }

                .input-wrapper input:disabled {
                    opacity: .6;
                }

                /* Password visibility controls. */
                .password-toggle {
                    flex-shrink: 0;
                    padding: 7px;
                    border: 0;
                    background: transparent;
                    color: #a78bfa;
                    font-size: 10px;
                    font-weight: 750;
                    cursor: pointer;
                }

                .password-toggle:hover {
                    color: #ddd6fe;
                }

                .password-toggle:disabled {
                    cursor: not-allowed;
                    opacity: .5;
                }

                .field-hint {
                    color: #71809e;
                    font-size: 9px;
                }

                /* Authentication error message. */
                .signup-error {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 12px;
                    border: 1px solid rgba(248,113,113,.25);
                    border-radius: 9px;
                    background: rgba(127,29,29,.15);
                    color: #fca5a5;
                    font-size: 11px;
                    line-height: 1.5;
                }

                .signup-error span {
                    display: grid;
                    flex-shrink: 0;
                    width: 19px;
                    height: 19px;
                    place-items: center;
                    border-radius: 50%;
                    background: rgba(248,113,113,.18);
                    font-weight: 800;
                }

                /* Main registration button. */
                .signup-submit {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    width: 100%;
                    min-height: 52px;
                    margin-top: 2px;
                    border: 0;
                    border-radius: 10px;
                    background: linear-gradient(105deg,#7c3aed,#5b5ce2);
                    color: #fff;
                    font-size: 12px;
                    font-weight: 800;
                    cursor: pointer;
                    box-shadow: 0 10px 25px rgba(99,102,241,.18);
                    transition: transform .2s,box-shadow .2s;
                }

                .signup-submit:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 13px 30px rgba(99,102,241,.3);
                }

                .signup-submit:disabled {
                    opacity: .65;
                    cursor: not-allowed;
                }

                /* Loading spinner. */
                .button-spinner {
                    width: 15px;
                    height: 15px;
                    border: 2px solid rgba(255,255,255,.35);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin .7s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* Social authentication separator. */
                .social-divider {
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    margin: 25px 0 19px;
                }

                .social-divider span {
                    flex: 1;
                    height: 1px;
                    background: #29334b;
                }

                .social-divider p {
                    margin: 0;
                    color: #8290a9;
                    font-size: 9px;
                    font-weight: 750;
                    letter-spacing: 1.3px;
                    white-space: nowrap;
                }

                /* Google and GitHub buttons. */
                .social-buttons {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .social-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    min-height: 49px;
                    border: 1px solid #29334b;
                    border-radius: 10px;
                    background: #11182b;
                    color: #e2e8f0;
                    font-size: 11px;
                    font-weight: 750;
                    cursor: pointer;
                    transition: border-color .2s,background .2s;
                }

                .social-button:hover:not(:disabled) {
                    border-color: #8b5cf6;
                    background: #171b35;
                }

                .social-button:disabled {
                    opacity: .6;
                    cursor: not-allowed;
                }

                .google-icon {
                    color: #60a5fa;
                    font-size: 19px;
                    font-weight: 900;
                }

                /* Login page navigation. */
                .login-prompt {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 5px;
                    margin-top: 26px;
                    color: #94a3b8;
                    font-size: 11px;
                }

                .login-prompt a {
                    color: #a78bfa;
                    font-weight: 750;
                    text-decoration: none;
                }

                .login-prompt a:hover {
                    color: #c4b5fd;
                }

                /* Terms and privacy links. */
                .signup-terms {
                    margin: 25px 0 0;
                    color: #64748b;
                    font-size: 9px;
                    line-height: 1.8;
                    text-align: center;
                }

                .signup-terms a {
                    color: #9ba8c1;
                    text-decoration: none;
                }

                .signup-terms a:hover {
                    color: #c4b5fd;
                }

                /* Tablet responsive layout. */
                @media (max-width: 1050px) {

                    .signup-page {
                        grid-template-columns: minmax(0,1fr) minmax(0,1fr);
                    }

                    .signup-left {
                        padding-right: 5%;
                        padding-left: 5%;
                    }

                    .signup-right {
                        padding-right: 6%;
                        padding-left: 6%;
                    }

                    .signup-benefits {
                        gap: 12px;
                    }

                }

                /* Mobile responsive layout. */
                @media (max-width: 760px) {

                    .signup-page {
                        grid-template-columns: 1fr;
                    }

                    .signup-left {
                        min-height: auto;
                        padding: 24px 6% 15px;
                    }

                    .signup-intro {
                        margin-top: 48px;
                    }

                    .signup-intro h1 {
                        font-size: clamp(34px,8vw,48px);
                    }

                    .signup-mentor-wrapper {
                        margin-top: 25px;
                    }

                    .signup-left-footer {
                        margin-top: 10px;
                    }

                    .signup-right {
                        padding: 55px 7%;
                    }

                    .signup-form-container {
                        max-width: 500px;
                    }

                }

                /* Small mobile devices. */
                @media (max-width: 420px) {

                    .signup-benefits {
                        flex-direction: column;
                        gap: 10px;
                    }

                    .signup-left-footer {
                        flex-direction: column;
                        align-items: center;
                    }

                    .social-buttons {
                        grid-template-columns: 1fr;
                    }

                    .signup-right {
                        padding: 45px 6%;
                    }

                }

                /* Accessibility: respect reduced-motion settings. */
                @media (prefers-reduced-motion: reduce) {

                    .signup-submit,
                    .input-wrapper,
                    .social-button {
                        transition: none;
                    }

                    .button-spinner {
                        animation: none;
                    }

                }

            `}</style>

        </main>
    );
}
