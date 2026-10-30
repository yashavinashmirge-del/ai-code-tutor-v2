
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : page.tsx
// Module       : Public Landing Page
//
// Description  : Introduces CodeTutor and demonstrates
//                its AI-powered programming environment.
//
// Main Features:
//                1. Professional navigation
//                2. Animated coding editor
//                3. Syntax-highlighted C++ example
//                4. Animated execution indicator
//                5. Array visualization preview
//                6. AI learning assistant preview
//                7. Platform feature cards
//                8. Three-step learning workflow
//                9. Supported programming languages
//               10. Responsive page design
//
////////////////////////////////////////////////////////////

"use client";

import Link from "next/link";

export default function Home() {

    // =====================================================
    // SECTION 1: LANDING PAGE DATA
    // Keeps repeated content organized and easy to update.
    // =====================================================

    const features = [
        {
            icon: "✦",
            title: "AI Code Explanation",
            description:
                "Understand every line of code with simple, step-by-step explanations.",
            tag: "LEARN",
        },
        {
            icon: "⌘",
            title: "Intelligent Debugging",
            description:
                "Find errors, understand their causes and learn how to fix them.",
            tag: "DEBUG",
        },
        {
            icon: "◈",
            title: "Visual Execution",
            description:
                "Watch variables, loops and conditions change while code executes.",
            tag: "VISUALIZE",
        },
        {
            icon: "↗",
            title: "Code Optimization",
            description:
                "Explore better solutions and understand time and space complexity.",
            tag: "OPTIMIZE",
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Write your code",
            description:
                "Choose a programming language and enter your code in the workspace.",
            icon: "⌨",
        },
        {
            number: "02",
            title: "Ask your AI tutor",
            description:
                "Explain, debug, optimize or visualize your program with AI.",
            icon: "✦",
        },
        {
            number: "03",
            title: "Understand and improve",
            description:
                "Learn from explanations, execution steps and generated diagrams.",
            icon: "◈",
        },
    ];

    const languages = ["C", "C++", "Java"];

    // =====================================================
    // SECTION 2: PAGE STRUCTURE
    // =====================================================

    return (
        <main className="landing-page">

            {/* =============================================
                NAVIGATION BAR
            ============================================= */}

            <header className="navbar">

                <div className="nav-container">

                    {/* Brand logo */}
                    <Link href="/" className="brand">

                        <span className="brand-icon">
                            {"</>"}
                        </span>

                        <span className="brand-name">
                            CodeTutor
                            <small>Learn. Build. Understand.</small>
                        </span>

                    </Link>

                    {/* Main navigation links */}
                    <nav className="nav-links">

                        <a href="#features">Features</a>
                        <a href="#how-it-works">How it works</a>
                        <a href="#languages">Languages</a>

                    </nav>

                    {/* Authentication navigation */}
                    <div className="nav-actions">

                        <Link href="/login" className="login-link">
                            Log in
                        </Link>

                        <Link href="/signup" className="nav-cta">
                            Get started <span>→</span>
                        </Link>

                    </div>

                </div>

            </header>


            {/* =============================================
                HERO SECTION
                Main headline and animated code editor.
            ============================================= */}

            <section className="hero-section">

                {/* Background decorative effects */}
                <div className="hero-glow hero-glow-left" />
                <div className="hero-glow hero-glow-right" />

                <div className="hero-container">

                    {/* Hero text content */}
                    <div className="hero-content">

                        <div className="hero-badge">
                            <span>✦</span>
                            AI-POWERED CODING LEARNING PLATFORM
                        </div>

                        <h1>
                            Don't just write code.
                            <span>Understand it.</span>
                        </h1>

                        <p className="hero-description">
                            Your personal AI coding mentor helps you
                            learn programming, understand errors,
                            visualize algorithms and become a better
                            developer.
                        </p>

                        {/* Hero action buttons */}
                        <div className="hero-actions">

                            <Link href="/signup" className="primary-button">
                                Start Learning Free <span>→</span>
                            </Link>

                            <Link
                                href="/workspace?language=cpp"
                                className="secondary-button"
                            >
                                Explore Workspace
                            </Link>

                        </div>

                        {/* Quick benefits */}
                        <div className="hero-highlights">

                            <span>✦ Beginner friendly</span>
                            <span>✦ Interactive learning</span>
                            <span>✦ AI assistance</span>

                        </div>

                    </div>


                    {/* =====================================
                        ANIMATED CODE EDITOR
                    ===================================== */}

                    <div className="editor-scene">

                        {/* Editor glow */}
                        <div className="editor-glow" />

                        <div className="code-editor">

                            {/* Editor title bar */}
                            <div className="editor-header">

                                <div className="window-controls">
                                    <span className="window-red" />
                                    <span className="window-yellow" />
                                    <span className="window-green" />
                                </div>

                                <span className="editor-filename">
                                    main.cpp
                                </span>

                                <span className="editor-language">
                                    C++
                                </span>

                            </div>


                            {/* Editor code area */}
                            <div className="editor-body">

                                <div className="code-line">
                                    <span className="line-number">01</span>
                                    <code>
                                        <span className="code-comment">
                                            // Find the largest array element
                                        </span>
                                    </code>
                                </div>

                                <div className="code-line">
                                    <span className="line-number">02</span>
                                    <code>
                                        <span className="code-keyword">int</span>
                                        {" data[] = "}
                                        <span className="code-number">
                                            {"{4, 9, 2, 7};"}
                                        </span>
                                    </code>
                                </div>

                                <div className="code-line">
                                    <span className="line-number">03</span>
                                    <code>
                                        <span className="code-keyword">int</span>
                                        {" largest = data[0];"}
                                    </code>
                                </div>

                                <div className="code-line animated-line line-four">
                                    <span className="line-number">04</span>
                                    <code>
                                        <span className="code-keyword">for</span>
                                        {" (int i = 1; i < 4; i++) {"}
                                    </code>
                                </div>

                                <div className="code-line animated-line line-five">
                                    <span className="line-number">05</span>
                                    <code>
                                        {"    "}
                                        <span className="code-keyword">if</span>
                                        {" (data[i] > largest) {"}
                                    </code>
                                </div>

                                <div className="code-line animated-line line-six">
                                    <span className="line-number">06</span>
                                    <code>
                                        {"        largest = "}
                                        <span className="code-variable">data[i]</span>
                                        {";"}
                                    </code>
                                </div>

                                <div className="code-line">
                                    <span className="line-number">07</span>
                                    <code>{"    }"}</code>
                                </div>

                                <div className="code-line">
                                    <span className="line-number">08</span>
                                    <code>{"}"}</code>
                                </div>

                                {/* Animated execution cursor */}
                                <div className="execution-cursor">
                                    <span />
                                    Executing code...
                                </div>

                            </div>


                            {/* =================================
                                VISUAL EXECUTION PREVIEW
                            ================================= */}

                            <div className="visual-preview">

                                <div className="preview-heading">

                                    <strong>
                                        <span>◈</span>
                                        Visual Execution Preview
                                    </strong>

                                    <span className="example-badge">
                                        LIVE EXAMPLE
                                    </span>

                                </div>

                                <p className="memory-label">
                                    Array memory · data
                                </p>

                                {/* Array index labels */}
                                <div className="array-indexes">
                                    <span>[0]</span>
                                    <span>[1]</span>
                                    <span>[2]</span>
                                    <span>[3]</span>
                                </div>

                                {/* Array values */}
                                <div className="array-values">

                                    <div className="array-cell">
                                        4
                                    </div>

                                    <div className="array-cell active-cell">
                                        9
                                    </div>

                                    <div className="array-cell">
                                        2
                                    </div>

                                    <div className="array-cell">
                                        7
                                    </div>

                                </div>

                                <div className="array-result">
                                    <span>
                                        largest = <strong>9</strong>
                                    </span>

                                    <span className="result-status">
                                        ● Example state
                                    </span>
                                </div>

                            </div>


                            {/* =================================
                                AI LEARNING ASSISTANT
                            ================================= */}

                            <div className="ai-assistant">

                                <div className="assistant-icon">
                                    ✦
                                </div>

                                <div>
                                    <strong>AI Learning Assistant</strong>

                                    <p>
                                        The largest element found so far is 9.
                                    </p>
                                </div>

                                <span className="assistant-status">
                                    READY
                                </span>

                            </div>

                        </div>

                        {/* Floating feature labels */}
                        <div className="floating-label floating-label-top">
                            <span>✦</span>
                            AI Explanation
                        </div>

                        <div className="floating-label floating-label-bottom">
                            <span>◈</span>
                            Visual Learning
                        </div>

                    </div>

                </div>

            </section>


            {/* =============================================
                FEATURES SECTION
            ============================================= */}

            <section className="features-section" id="features">

                <div className="section-container">

                    <div className="section-heading">

                        <span className="section-eyebrow">
                            WHAT MAKES CODETUTOR DIFFERENT
                        </span>

                        <h2>
                            Everything you need to
                            <span> master programming.</span>
                        </h2>

                        <p>
                            More than a code editor. A learning
                            environment designed to help you understand
                            how programming works.
                        </p>

                    </div>


                    {/* Feature cards */}
                    <div className="feature-grid">

                        {features.map((feature) => (

                            <article
                                className="feature-card"
                                key={feature.title}
                            >

                                <div className="feature-card-top">

                                    <span className="feature-icon">
                                        {feature.icon}
                                    </span>

                                    <span className="feature-tag">
                                        {feature.tag}
                                    </span>

                                </div>

                                <h3>{feature.title}</h3>

                                <p>{feature.description}</p>

                                <span className="feature-arrow">
                                    Explore feature →
                                </span>

                            </article>

                        ))}

                    </div>

                </div>

            </section>


            {/* =============================================
                HOW IT WORKS SECTION
            ============================================= */}

            <section
                className="workflow-section"
                id="how-it-works"
            >

                <div className="section-container">

                    <div className="section-heading">

                        <span className="section-eyebrow">
                            YOUR LEARNING JOURNEY
                        </span>

                        <h2>
                            From writing code to
                            <span> understanding code.</span>
                        </h2>

                        <p>
                            Follow a simple learning process with
                            your personal AI programming assistant.
                        </p>

                    </div>


                    {/* Three learning steps */}
                    <div className="workflow-grid">

                        {steps.map((step) => (

                            <article
                                className="workflow-card"
                                key={step.number}
                            >

                                <span className="workflow-number">
                                    {step.number}
                                </span>

                                <div className="workflow-icon">
                                    {step.icon}
                                </div>

                                <h3>{step.title}</h3>

                                <p>{step.description}</p>

                            </article>

                        ))}

                    </div>

                </div>

            </section>


            {/* =============================================
                PROGRAMMING LANGUAGES
            ============================================= */}

            <section
                className="languages-section"
                id="languages"
            >

                <div className="section-container">

                    <div className="section-heading">

                        <span className="section-eyebrow">
                            START CODING
                        </span>

                        <h2>
                            Learn with the languages
                            <span> you love.</span>
                        </h2>

                        <p>
                            Practice programming using the languages
                            supported by CodeTutor.
                        </p>

                    </div>


                    <div className="language-grid">

                        {languages.map((language) => (

                            <div
                                className="language-card"
                                key={language}
                            >

                                <span className="language-symbol">
                                    {"</>"}
                                </span>

                                <strong>{language}</strong>

                                <span className="language-caption">
                                    Programming
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* =============================================
                FINAL CALL TO ACTION
            ============================================= */}

            <section className="final-cta">

                <div className="cta-glow" />

                <div className="cta-content">

                    <span className="section-eyebrow">
                        YOUR CODING JOURNEY STARTS HERE
                    </span>

                    <h2>
                        Ready to understand
                        <span> code differently?</span>
                    </h2>

                    <p>
                        Start learning, experiment with code and
                        build your programming confidence with AI.
                    </p>

                    <Link href="/signup" className="primary-button">
                        Create your free account <span>→</span>
                    </Link>

                </div>

            </section>


            {/* =============================================
                FOOTER
            ============================================= */}

            <footer className="landing-footer">

                <div className="footer-content">

                    <Link href="/" className="brand">

                        <span className="brand-icon">
                            {"</>"}
                        </span>

                        <span className="brand-name">
                            CodeTutor
                            <small>Learn. Build. Understand.</small>
                        </span>

                    </Link>

                    <p>
                        © 2026 CodeTutor. Built for future developers.
                    </p>

                </div>

            </footer>


            {/* =============================================
                LANDING PAGE STYLES
                All styles are scoped to this component.
            ============================================= */}

            <style jsx>{`

                /* =========================================
                   GLOBAL PAGE SETTINGS
                ========================================= */

                .landing-page {
                    min-height: 100vh;
                    overflow: hidden;
                    background: #080c19;
                    color: #f8fafc;
                }

                .section-container {
                    width: min(1160px, 88%);
                    margin: 0 auto;
                }

                /* =========================================
                   NAVIGATION BAR
                ========================================= */

                .navbar {
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    border-bottom: 1px solid rgba(255,255,255,.07);
                    background: rgba(8,12,25,.88);
                    backdrop-filter: blur(18px);
                }

                .nav-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: min(1280px, 90%);
                    min-height: 78px;
                    margin: auto;
                    gap: 25px;
                }

                .brand {
                    display: inline-flex;
                    align-items: center;
                    gap: 11px;
                    color: #fff;
                    text-decoration: none;
                }

                .brand-icon {
                    display: grid;
                    width: 42px;
                    height: 42px;
                    place-items: center;
                    border-radius: 13px;
                    background: linear-gradient(135deg,#8b5cf6,#4f46e5);
                    box-shadow: 0 7px 25px rgba(124,58,237,.25);
                    font-size: 15px;
                    font-weight: 900;
                }

                .brand-name {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    font-size: 17px;
                    font-weight: 800;
                }

                .brand-name small {
                    color: #8290aa;
                    font-size: 9px;
                    font-weight: 400;
                }

                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 35px;
                }

                .nav-links a,
                .login-link {
                    color: #aab6cb;
                    font-size: 13px;
                    text-decoration: none;
                    transition: color .2s;
                }

                .nav-links a:hover,
                .login-link:hover {
                    color: #c4b5fd;
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }

                .nav-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 18px;
                    border-radius: 9px;
                    background: linear-gradient(105deg,#7c3aed,#4f65e8);
                    color: #fff;
                    font-size: 12px;
                    font-weight: 750;
                    text-decoration: none;
                    transition: transform .2s,box-shadow .2s;
                }

                .nav-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(99,102,241,.3);
                }

                /* =========================================
                   HERO SECTION
                ========================================= */

                .hero-section {
                    position: relative;
                    isolation: isolate;
                    padding: 95px 0 110px;
                    background:
                        radial-gradient(
                            ellipse at 10% 40%,
                            rgba(91,45,160,.18),
                            transparent 45%
                        ),
                        radial-gradient(
                            ellipse at 95% 60%,
                            rgba(37,99,235,.13),
                            transparent 42%
                        );
                }

                .hero-glow {
                    position: absolute;
                    z-index: -1;
                    width: 350px;
                    height: 350px;
                    border-radius: 50%;
                    filter: blur(120px);
                    opacity: .14;
                    pointer-events: none;
                }

                .hero-glow-left {
                    top: 10%;
                    left: -200px;
                    background: #8b5cf6;
                }

                .hero-glow-right {
                    right: -200px;
                    bottom: 5%;
                    background: #2563eb;
                }

                .hero-container {
                    display: grid;
                    grid-template-columns: minmax(0,.9fr) minmax(0,1.1fr);
                    align-items: center;
                    gap: 55px;
                    width: min(1280px,90%);
                    margin: auto;
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                    min-width: 0;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 16px;
                    border: 1px solid rgba(139,92,246,.3);
                    border-radius: 30px;
                    background: rgba(139,92,246,.1);
                    color: #c4b5fd;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.2px;
                }

                .hero-badge span {
                    color: #a78bfa;
                    font-size: 17px;
                }

                .hero-content h1 {
                    max-width: 610px;
                    margin: 28px 0 23px;
                    color: #f8fafc;
                    font-size: clamp(43px,5vw,69px);
                    font-weight: 900;
                    line-height: 1.08;
                    letter-spacing: -3.5px;
                }

                .hero-content h1 span {
                    display: block;
                    background: linear-gradient(100deg,#a78bfa,#60a5fa);
                    background-clip: text;
                    -webkit-background-clip: text;
                    color: transparent;
                }

                .hero-description {
                    max-width: 550px;
                    margin: 0;
                    color: #9eacc4;
                    font-size: 15px;
                    line-height: 1.9;
                }

                .hero-actions {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 14px;
                    margin-top: 32px;
                }

                .primary-button,
                .secondary-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    min-height: 49px;
                    padding: 0 21px;
                    border-radius: 10px;
                    font-size: 12px;
                    font-weight: 800;
                    text-decoration: none;
                    transition: transform .2s,box-shadow .2s;
                }

                .primary-button {
                    background: linear-gradient(105deg,#8b5cf6,#5265ec);
                    color: white;
                    box-shadow: 0 10px 28px rgba(99,102,241,.2);
                }

                .secondary-button {
                    border: 1px solid #35405b;
                    background: rgba(255,255,255,.025);
                    color: #e2e8f0;
                }

                .primary-button:hover,
                .secondary-button:hover {
                    transform: translateY(-3px);
                }

                .primary-button:hover {
                    box-shadow: 0 13px 32px rgba(99,102,241,.35);
                }

                .hero-highlights {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 19px;
                    margin-top: 28px;
                }

                .hero-highlights span {
                    color: #8795b0;
                    font-size: 10px;
                }

                /* =========================================
                   CODE EDITOR SCENE
                ========================================= */

                .editor-scene {
                    position: relative;
                    min-width: 0;
                    padding: 15px;
                }

                .editor-glow {
                    position: absolute;
                    z-index: -1;
                    inset: 10%;
                    border-radius: 50%;
                    background: rgba(79,70,229,.22);
                    filter: blur(85px);
                }

                .code-editor {
                    position: relative;
                    z-index: 2;
                    overflow: hidden;
                    border: 1px solid rgba(139,92,246,.27);
                    border-radius: 17px;
                    background: #10172a;
                    box-shadow:
                        0 35px 90px rgba(0,0,0,.4),
                        0 0 40px rgba(79,70,229,.09);
                    animation: editorAppear .9s ease both;
                }

                .editor-header {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    align-items: center;
                    min-height: 57px;
                    padding: 0 19px;
                    border-bottom: 1px solid #29334b;
                    background: #111a30;
                }

                .window-controls {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                }

                .window-controls span {
                    width: 11px;
                    height: 11px;
                    border-radius: 50%;
                }

                .window-red { background: #fb7185; }
                .window-yellow { background: #fbbf24; }
                .window-green { background: #34d399; }

                .editor-filename {
                    color: #d3dced;
                    font-family: monospace;
                    font-size: 11px;
                    text-align: center;
                }

                .editor-language {
                    color: #a5b4fc;
                    font-size: 11px;
                    text-align: right;
                }

                /* Code editor content */
                .editor-body {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    min-height: 245px;
                    padding: 18px 17px 34px;
                    background:
                        linear-gradient(
                            90deg,
                            rgba(255,255,255,.025) 0,
                            transparent 55px
                        );
                }

                .code-line {
                    position: relative;
                    display: flex;
                    align-items: center;
                    min-height: 25px;
                    padding: 2px 8px;
                    border-radius: 5px;
                    color: #dce5f5;
                    font-family: var(--font-geist-mono),monospace;
                    font-size: clamp(9px,1vw,12px);
                    white-space: pre;
                }

                .line-number {
                    flex: 0 0 32px;
                    color: #62718d;
                    user-select: none;
                }

                .code-comment {
                    color: #8194b7;
                }

                .code-keyword {
                    color: #c4a7ff;
                }

                .code-number {
                    color: #fbbf8b;
                }

                .code-variable {
                    color: #7dd3fc;
                }

                /* Animated code execution highlight */
                .animated-line {
                    animation: codeHighlight 6s ease-in-out infinite;
                }

                .line-four { animation-delay: 0s; }
                .line-five { animation-delay: 1.3s; }
                .line-six { animation-delay: 2.6s; }

                @keyframes codeHighlight {
                    0%,100% {
                        background: transparent;
                        box-shadow: none;
                    }

                    15%,55% {
                        background: rgba(99,102,241,.22);
                        box-shadow: inset 2px 0 #a78bfa;
                    }
                }

                /* Execution status */
                .execution-cursor {
                    position: absolute;
                    right: 17px;
                    bottom: 9px;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: #94a3b8;
                    font-size: 9px;
                }

                .execution-cursor span {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #34d399;
                    box-shadow: 0 0 9px #34d399;
                    animation: statusPulse 1.5s ease-in-out infinite;
                }

                @keyframes statusPulse {
                    0%,100% { opacity: 1; }
                    50% { opacity: .3; }
                }

                /* =========================================
                   VISUAL EXECUTION PANEL
                ========================================= */

                .visual-preview {
                    margin: 0 15px 13px;
                    padding: 15px;
                    border: 1px solid rgba(96,165,250,.2);
                    border-radius: 12px;
                    background: linear-gradient(
                        135deg,
                        rgba(37,99,235,.12),
                        rgba(15,23,42,.65)
                    );
                }

                .preview-heading {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                }

                .preview-heading strong {
                    color: #dbeafe;
                    font-size: 11px;
                }

                .preview-heading strong span {
                    margin-right: 7px;
                    color: #a78bfa;
                }

                .example-badge {
                    padding: 5px 8px;
                    border-radius: 5px;
                    background: rgba(52,211,153,.1);
                    color: #6ee7b7;
                    font-size: 8px;
                    font-weight: 800;
                }

                .memory-label {
                    margin: 15px 0 8px;
                    color: #8190aa;
                    font-size: 9px;
                }

                .array-indexes,
                .array-values {
                    display: grid;
                    grid-template-columns: repeat(4,minmax(0,1fr));
                    gap: 7px;
                    text-align: center;
                }

                .array-indexes {
                    margin-bottom: 5px;
                    color: #8090ac;
                    font-family: monospace;
                    font-size: 9px;
                }

                .array-cell {
                    display: grid;
                    min-height: 43px;
                    place-items: center;
                    border: 1px solid #34435f;
                    border-radius: 7px;
                    background: #1b2942;
                    color: #e2e8f0;
                    font-family: monospace;
                    font-size: 13px;
                    font-weight: 800;
                }

                .active-cell {
                    border-color: #60a5fa;
                    background: rgba(37,99,235,.22);
                    color: #bfdbfe;
                    box-shadow: 0 0 15px rgba(59,130,246,.13);
                    animation: activeCellPulse 2s ease-in-out infinite;
                }

                @keyframes activeCellPulse {
                    0%,100% { box-shadow: 0 0 8px rgba(59,130,246,.1); }
                    50% { box-shadow: 0 0 19px rgba(59,130,246,.3); }
                }

                .array-result {
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                    margin-top: 12px;
                    color: #cbd5e1;
                    font-size: 9px;
                }

                .array-result strong {
                    color: #6ee7b7;
                }

                .result-status {
                    color: #6ee7b7;
                }

                /* =========================================
                   AI ASSISTANT PANEL
                ========================================= */

                .ai-assistant {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 0 15px 15px;
                    padding: 13px;
                    border: 1px solid rgba(139,92,246,.2);
                    border-radius: 11px;
                    background: rgba(139,92,246,.07);
                }

                .assistant-icon {
                    display: grid;
                    flex: 0 0 34px;
                    width: 34px;
                    height: 34px;
                    place-items: center;
                    border-radius: 9px;
                    background: rgba(139,92,246,.2);
                    color: #c4b5fd;
                    font-size: 19px;
                }

                .ai-assistant > div:nth-child(2) {
                    min-width: 0;
                    flex: 1;
                }

                .ai-assistant strong {
                    color: #e9e5ff;
                    font-size: 10px;
                }

                .ai-assistant p {
                    margin: 4px 0 0;
                    color: #8e9bb4;
                    font-size: 9px;
                    line-height: 1.5;
                }

                .assistant-status {
                    color: #6ee7b7;
                    font-size: 8px;
                    font-weight: 800;
                }

                /* Floating labels */
                .floating-label {
                    position: absolute;
                    z-index: 3;
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    padding: 11px 14px;
                    border: 1px solid rgba(139,92,246,.25);
                    border-radius: 9px;
                    background: #171d34;
                    color: #dbe4f5;
                    font-size: 10px;
                    box-shadow: 0 10px 35px rgba(0,0,0,.3);
                    animation: floatingLabel 4s ease-in-out infinite;
                }

                .floating-label span {
                    color: #a78bfa;
                }

                .floating-label-top {
                    top: -9px;
                    right: -20px;
                }

                .floating-label-bottom {
                    bottom: 30px;
                    left: -23px;
                    animation-delay: 1s;
                }

                @keyframes floatingLabel {
                    0%,100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }

                @keyframes editorAppear {
                    from {
                        opacity: 0;
                        transform: translateY(22px) scale(.98);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                /* =========================================
                   FEATURES SECTION
                ========================================= */

                .features-section {
                    padding: 100px 0;
                    border-top: 1px solid rgba(255,255,255,.05);
                    background: #0b1020;
                }

                .section-heading {
                    max-width: 720px;
                    margin: 0 auto 48px;
                    text-align: center;
                }

                .section-eyebrow {
                    color: #a78bfa;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.8px;
                }

                .section-heading h2,
                .cta-content h2 {
                    margin: 17px 0;
                    color: #f8fafc;
                    font-size: clamp(30px,4vw,45px);
                    font-weight: 850;
                    line-height: 1.2;
                    letter-spacing: -1.5px;
                }

                .section-heading h2 span,
                .cta-content h2 span {
                    color: #a78bfa;
                }

                .section-heading p,
                .cta-content p {
                    color: #94a3b8;
                    font-size: 13px;
                    line-height: 1.9;
                }

                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(4,minmax(0,1fr));
                    gap: 17px;
                }

                .feature-card {
                    min-width: 0;
                    padding: 24px 20px;
                    border: 1px solid #27324b;
                    border-radius: 13px;
                    background: linear-gradient(145deg,#141c32,#0e1527);
                    transition: transform .25s,border-color .25s;
                }

                .feature-card:hover {
                    transform: translateY(-6px);
                    border-color: #7656c9;
                }

                .feature-card-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .feature-icon {
                    display: grid;
                    width: 42px;
                    height: 42px;
                    place-items: center;
                    border-radius: 11px;
                    background: rgba(139,92,246,.14);
                    color: #c4b5fd;
                    font-size: 22px;
                }

                .feature-tag {
                    color: #8190ac;
                    font-size: 8px;
                    font-weight: 800;
                    letter-spacing: 1px;
                }

                .feature-card h3 {
                    margin: 23px 0 10px;
                    color: #f1f5f9;
                    font-size: 15px;
                }

                .feature-card p {
                    min-height: 70px;
                    margin: 0;
                    color: #91a0b8;
                    font-size: 11px;
                    line-height: 1.8;
                }

                .feature-arrow {
                    display: inline-block;
                    margin-top: 19px;
                    color: #a78bfa;
                    font-size: 10px;
                    font-weight: 750;
                }

                /* =========================================
                   WORKFLOW SECTION
                ========================================= */

                .workflow-section {
                    padding: 100px 0;
                    background:
                        radial-gradient(
                            ellipse at 50% 100%,
                            rgba(79,70,229,.1),
                            transparent 65%
                        ),
                        #080c19;
                }

                .workflow-grid {
                    display: grid;
                    grid-template-columns: repeat(3,minmax(0,1fr));
                    gap: 22px;
                }

                .workflow-card {
                    position: relative;
                    min-width: 0;
                    padding: 28px;
                    border: 1px solid #29334b;
                    border-radius: 14px;
                    background: rgba(17,24,43,.8);
                }

                .workflow-number {
                    position: absolute;
                    top: 20px;
                    right: 23px;
                    color: rgba(167,139,250,.3);
                    font-size: 27px;
                    font-weight: 900;
                }

                .workflow-icon {
                    display: grid;
                    width: 49px;
                    height: 49px;
                    place-items: center;
                    border-radius: 12px;
                    background: rgba(139,92,246,.14);
                    color: #c4b5fd;
                    font-size: 23px;
                }

                .workflow-card h3 {
                    margin: 25px 0 10px;
                    color: #f1f5f9;
                    font-size: 16px;
                }

                .workflow-card p {
                    margin: 0;
                    color: #94a3b8;
                    font-size: 12px;
                    line-height: 1.9;
                }

                /* =========================================
                   LANGUAGES SECTION
                ========================================= */

                .languages-section {
                    padding: 90px 0 100px;
                    border-top: 1px solid rgba(255,255,255,.05);
                    background: #0b1020;
                }

                .language-grid {
                    display: grid;
                    grid-template-columns: repeat(3,minmax(0,1fr));
                    gap: 18px;
                    max-width: 850px;
                    margin: auto;
                }

                .language-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    padding: 29px 15px;
                    border: 1px solid #29334b;
                    border-radius: 13px;
                    background: #11182b;
                    transition: transform .2s,border-color .2s;
                }

                .language-card:hover {
                    transform: translateY(-5px);
                    border-color: #8b5cf6;
                }

                .language-symbol {
                    display: grid;
                    width: 49px;
                    height: 49px;
                    place-items: center;
                    border-radius: 12px;
                    background: rgba(139,92,246,.15);
                    color: #c4b5fd;
                    font-family: monospace;
                    font-size: 15px;
                    font-weight: 800;
                }

                .language-card strong {
                    color: #f8fafc;
                    font-size: 17px;
                }

                .language-caption {
                    color: #8190aa;
                    font-size: 10px;
                }

                /* =========================================
                   FINAL CALL TO ACTION
                ========================================= */

                .final-cta {
                    position: relative;
                    overflow: hidden;
                    padding: 95px 6%;
                    background: linear-gradient(130deg,#181335,#111a39);
                    text-align: center;
                    isolation: isolate;
                }

                .cta-glow {
                    position: absolute;
                    z-index: -1;
                    top: -200px;
                    left: 50%;
                    width: 500px;
                    height: 500px;
                    border-radius: 50%;
                    background: rgba(124,58,237,.2);
                    filter: blur(100px);
                    transform: translateX(-50%);
                }

                .cta-content {
                    max-width: 720px;
                    margin: auto;
                }

                .cta-content h2 {
                    margin-top: 18px;
                }

                .cta-content p {
                    max-width: 560px;
                    margin: 0 auto 28px;
                }

                /* =========================================
                   FOOTER
                ========================================= */

                .landing-footer {
                    padding: 26px 0;
                    border-top: 1px solid rgba(255,255,255,.07);
                    background: #080c19;
                }

                .footer-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    width: min(1280px,90%);
                    margin: auto;
                }

                .footer-content p {
                    margin: 0;
                    color: #71809a;
                    font-size: 10px;
                }

                /* =========================================
                   TABLET RESPONSIVENESS
                ========================================= */

                @media (max-width: 1050px) {

                    .hero-container {
                        grid-template-columns: 1fr;
                        gap: 55px;
                        max-width: 850px;
                    }

                    .hero-content {
                        max-width: 700px;
                    }

                    .editor-scene {
                        width: 100%;
                        max-width: 700px;
                        margin: auto;
                    }

                    .feature-grid {
                        grid-template-columns: repeat(2,minmax(0,1fr));
                    }

                }

                /* =========================================
                   MOBILE RESPONSIVENESS
                ========================================= */

                @media (max-width: 700px) {

                    .nav-container {
                        min-height: 68px;
                        gap: 12px;
                    }

                    .nav-links {
                        display: none;
                    }

                    .nav-actions {
                        gap: 13px;
                    }

                    .login-link {
                        font-size: 11px;
                    }

                    .nav-cta {
                        padding: 10px 12px;
                        font-size: 10px;
                    }

                    .hero-section {
                        padding: 65px 0 75px;
                    }

                    .hero-container {
                        width: 90%;
                        gap: 40px;
                    }

                    .hero-content h1 {
                        font-size: clamp(39px,9vw,55px);
                        letter-spacing: -2px;
                    }

                    .hero-description {
                        font-size: 13px;
                    }

                    .hero-highlights {
                        gap: 12px;
                    }

                    .editor-scene {
                        padding: 5px;
                    }

                    .floating-label-top {
                        right: -5px;
                    }

                    .floating-label-bottom {
                        left: -5px;
                    }

                    .features-section,
                    .workflow-section,
                    .languages-section {
                        padding: 70px 0;
                    }

                    .section-container {
                        width: 90%;
                    }

                    .workflow-grid {
                        grid-template-columns: 1fr;
                    }

                }

                /* =========================================
                   SMALL MOBILE DEVICES
                ========================================= */

                @media (max-width: 480px) {

                    .brand-name {
                        font-size: 14px;
                    }

                    .brand-icon {
                        width: 37px;
                        height: 37px;
                    }

                    .nav-cta {
                        padding: 9px;
                    }

                    .hero-badge {
                        padding: 9px 11px;
                        font-size: 8px;
                    }

                    .hero-actions {
                        align-items: stretch;
                        flex-direction: column;
                    }

                    .hero-actions a {
                        width: 100%;
                    }

                    .hero-highlights {
                        flex-direction: column;
                    }

                    .editor-header {
                        padding: 0 12px;
                    }

                    .editor-body {
                        padding-right: 7px;
                        padding-left: 7px;
                    }

                    .code-line {
                        font-size: 8px;
                    }

                    .line-number {
                        flex-basis: 25px;
                    }

                    .visual-preview {
                        margin-right: 9px;
                        margin-left: 9px;
                        padding: 10px;
                    }

                    .array-cell {
                        min-height: 36px;
                    }

                    .ai-assistant {
                        margin-right: 9px;
                        margin-left: 9px;
                    }

                    .floating-label {
                        display: none;
                    }

                    .feature-grid {
                        grid-template-columns: 1fr;
                    }

                    .feature-card p {
                        min-height: auto;
                    }

                    .language-grid {
                        grid-template-columns: 1fr;
                        max-width: 300px;
                    }

                    .footer-content {
                        align-items: center;
                        flex-direction: column;
                        text-align: center;
                    }

                }

                /* =========================================
                   ACCESSIBILITY: REDUCED MOTION
                ========================================= */

                @media (prefers-reduced-motion: reduce) {

                    *,
                    *::before,
                    *::after {
                        scroll-behavior: auto !important;
                        animation-duration: .01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: .01ms !important;
                    }

                }

            `}</style>

        </main>
    );
}
