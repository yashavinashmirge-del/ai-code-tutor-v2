
"use client";

////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : page.tsx
// Module       : Public Landing Page
//
// Description  : Main landing page for the AI Code Tutor
//                and Analyzer application.
//
// Main Features:
//                1. Professional navigation bar
//                2. Animated hero section
//                3. AI Mentor slideshow
//                4. Live coding animation
//                5. Application feature showcase
//                6. Step-by-step workflow
//                7. Supported programming languages
//                8. Login and signup navigation
//
////////////////////////////////////////////////////////////

// Import Next.js navigation component.
import Link from "next/link";

// Import the animated AI Mentor component.
import AIMentorSlideshow from "@/components/AIMentorSlideshow";

// Import the animated coding editor component.
import CodingAnimation from "@/components/CodingAnimation";

// Application features displayed on the landing page.
const features = [
    {
        icon: "✦",
        title: "Explain Code",
        description:
            "Understand every line of code with simple, beginner-friendly AI explanations.",
        color: "purple",
    },
    {
        icon: "⌘",
        title: "Debug Code",
        description:
            "Identify programming errors, understand their causes, and learn how to fix them.",
        color: "blue",
    },
    {
        icon: "◈",
        title: "Visualize Algorithms",
        description:
            "Explore algorithms, data structures, variables, and execution flow visually.",
        color: "pink",
    },
    {
        icon: "⚡",
        title: "Optimize Code",
        description:
            "Improve code quality and understand time and space complexity.",
        color: "orange",
    },
];

// Steps explaining how the application works.
const workflow = [
    {
        number: "01",
        title: "Write or Upload Code",
        description:
            "Enter your program in the interactive code editor or upload your code.",
    },
    {
        number: "02",
        title: "Learn with AI",
        description:
            "Ask AI to explain, debug, optimize, or analyze your program.",
    },
    {
        number: "03",
        title: "Visualize Execution",
        description:
            "Understand program execution through diagrams and visual representations.",
    },
];

// Programming languages supported by the application.
const languages = [
    {
        name: "C",
        symbol: "C",
        description: "Procedural programming",
        className: "language-c",
    },
    {
        name: "C++",
        symbol: "C++",
        description: "Object-oriented programming",
        className: "language-cpp",
    },
    {
        name: "Java",
        symbol: "☕",
        description: "Platform-independent programming",
        className: "language-java",
    },
];

// Main landing page component.
export default function Home() {
    return (
        <main className="landing-page">

            {/* =================================================
                SECTION 1: NAVIGATION BAR
                Contains the brand, navigation links and
                authentication buttons.
            ================================================= */}

            <header className="navbar">
                <Link href="/" className="brand">
                    <span className="brand-icon">✦</span>
                    <span>CodeTutor</span>
                </Link>

                <nav className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How it works</a>
                    <a href="#languages">Languages</a>
                </nav>

                <div className="nav-actions">
                    <Link href="/login" className="login-link">
                        Log in
                    </Link>

                    <Link href="/signup" className="nav-signup">
                        Get started <span>→</span>
                    </Link>
                </div>
            </header>


            {/* =================================================
                SECTION 2: HERO SECTION
                Introduces the application and its main purpose.
            ================================================= */}

            <section className="hero-section">

                {/* Background decorative effects */}
                <div className="hero-glow hero-glow-one" />
                <div className="hero-glow hero-glow-two" />

                <div className="hero-content">

                    {/* Small introductory label */}
                    <div className="hero-badge">
                        <span className="badge-sparkle">✦</span>
                        AI-POWERED CODING LEARNING PLATFORM
                    </div>

                    {/* Main landing page heading */}
                    <h1>
                        Don't just write code.
                        <span> Understand it.</span>
                    </h1>

                    {/* Introduction to the application */}
                    <p className="hero-description">
                        Your personal AI coding mentor helps you learn
                        programming, understand errors, visualize algorithms,
                        and become a better developer.
                    </p>

                    {/* Main call-to-action buttons */}
                    <div className="hero-buttons">
                        <Link href="/signup" className="primary-button">
                            Start Learning Free <span>→</span>
                        </Link>

                        <Link href="/login" className="secondary-button">
                            Explore Workspace
                        </Link>
                    </div>

                    {/* Supporting information */}
                    <div className="hero-trust">
                        <span>✦ Beginner friendly</span>
                        <span>✦ Interactive learning</span>
                        <span>✦ AI assistance</span>
                    </div>

                </div>

                {/* =================================================
                    SECTION 3: AI MENTOR AND CODING ANIMATION

                    Displays the animated AI Mentor alongside
                    a realistic animated code editor.
                ================================================= */}

                <div className="hero-visuals">

                    {/* Animated AI Mentor */}
                    <div className="hero-mentor">
                        <AIMentorSlideshow />
                    </div>

                    {/* Animated code editor */}
                    <div className="hero-code">
                        <CodingAnimation />
                    </div>

                </div>

            </section>


            {/* =================================================
                SECTION 4: FEATURES

                Displays the main capabilities of the platform.
            ================================================= */}

            <section className="features-section" id="features">

                <div className="section-heading">
                    <span className="section-label">
                        WHAT YOU CAN DO
                    </span>

                    <h2>
                        Everything you need to
                        <span> master coding.</span>
                    </h2>

                    <p>
                        Learn programming through explanations,
                        intelligent assistance, and visual understanding.
                    </p>
                </div>

                <div className="feature-grid">

                    {features.map((feature, index) => (
                        <article
                            className="feature-card"
                            key={feature.title}
                        >
                            <div className={`feature-icon ${feature.color}`}>
                                {feature.icon}
                            </div>

                            <span className="feature-number">
                                0{index + 1}
                            </span>

                            <h3>{feature.title}</h3>

                            <p>{feature.description}</p>

                            <span className="feature-arrow">↗</span>
                        </article>
                    ))}

                </div>

            </section>


            {/* =================================================
                SECTION 5: HOW IT WORKS

                Explains the three main steps in the learning
                process.
            ================================================= */}

            <section className="workflow-section" id="how-it-works">

                <div className="section-heading">
                    <span className="section-label">
                        SIMPLE LEARNING PROCESS
                    </span>

                    <h2>
                        From writing code to
                        <span> understanding code.</span>
                    </h2>

                    <p>
                        Follow a guided learning process with your
                        personal AI coding assistant.
                    </p>
                </div>

                <div className="workflow-grid">

                    {workflow.map((step) => (
                        <article className="workflow-card" key={step.number}>

                            <span className="workflow-number">
                                {step.number}
                            </span>

                            <div className="workflow-line" />

                            <h3>{step.title}</h3>

                            <p>{step.description}</p>

                        </article>
                    ))}

                </div>

            </section>


            {/* =================================================
                SECTION 6: PROGRAMMING LANGUAGES

                Displays the programming languages available
                in the application.
            ================================================= */}

            <section className="languages-section" id="languages">

                <div className="section-heading">
                    <span className="section-label">
                        LEARN YOUR WAY
                    </span>

                    <h2>
                        Practice with your
                        <span> favourite language.</span>
                    </h2>

                    <p>
                        Start learning and improving your programming
                        skills using supported languages.
                    </p>
                </div>

                <div className="language-grid">

                    {languages.map((language) => (
                        <article
                            className="language-card"
                            key={language.name}
                        >
                            <div className={`language-symbol ${language.className}`}>
                                {language.symbol}
                            </div>

                            <div>
                                <h3>{language.name}</h3>
                                <p>{language.description}</p>
                            </div>

                            <span className="language-arrow">↗</span>
                        </article>
                    ))}

                </div>

            </section>


            {/* =================================================
                SECTION 7: FINAL CALL TO ACTION

                Encourages visitors to create an account and
                start using the application.
            ================================================= */}

            <section className="cta-section">

                <div className="cta-glow" />

                <span className="section-label">
                    YOUR CODING JOURNEY STARTS HERE
                </span>

                <h2>
                    Ready to become a
                    <span> better developer?</span>
                </h2>

                <p>
                    Stop memorizing code. Start understanding how it works.
                    Learn, practice, and grow with your AI coding mentor.
                </p>

                <Link href="/signup" className="primary-button">
                    Get Started for Free <span>→</span>
                </Link>

            </section>


            {/* =================================================
                SECTION 8: FOOTER

                Contains application branding and navigation.
            ================================================= */}

            <footer className="footer">

                <Link href="/" className="brand">
                    <span className="brand-icon">✦</span>
                    <span>CodeTutor</span>
                </Link>

                <p>
                    Learn. Build. Understand.
                </p>

                <span className="footer-copyright">
    © 2026 CodeTutor. Built for future developers.
</span>

            </footer>


            {/* =================================================
                SECTION 9: LANDING PAGE STYLES

                Page-specific styles for layout, typography,
                animations, cards, buttons and responsiveness.
            ================================================= */}

            <style jsx>{`

                /* Main page configuration */
                .landing-page {
                    min-height: 100vh;
                    overflow: hidden;
                    background: #080b18;
                    color: #f8fafc;
                }

                /* Navigation bar */
                .navbar {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-height: 78px;
                    padding: 0 7%;
                    border-bottom: 1px solid rgba(255,255,255,0.07);
                    background: rgba(8,11,24,0.88);
                    backdrop-filter: blur(18px);
                }

                .brand {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    color: #fff;
                    font-size: 21px;
                    font-weight: 800;
                    text-decoration: none;
                }

                .brand-icon {
                    display: grid;
                    width: 34px;
                    height: 34px;
                    place-items: center;
                    border-radius: 11px;
                    background: linear-gradient(135deg,#8b5cf6,#4f46e5);
                    box-shadow: 0 0 25px rgba(139,92,246,.3);
                }

                .nav-links {
                    display: flex;
                    gap: 34px;
                }

                .nav-links a,
                .login-link {
                    color: #a5afc4;
                    font-size: 13px;
                    text-decoration: none;
                    transition: color .2s ease;
                }

                .nav-links a:hover,
                .login-link:hover {
                    color: #fff;
                }

                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }

                .nav-signup {
                    padding: 11px 18px;
                    border: 1px solid rgba(167,139,250,.35);
                    border-radius: 9px;
                    background: rgba(139,92,246,.13);
                    color: #c4b5fd;
                    font-size: 13px;
                    font-weight: 700;
                    text-decoration: none;
                }

                /* Hero section */
                .hero-section {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 100px 7% 90px;
                    isolation: isolate;
                }

                .hero-glow {
                    position: absolute;
                    z-index: -1;
                    width: 450px;
                    height: 450px;
                    border-radius: 50%;
                    filter: blur(110px);
                    opacity: .18;
                    pointer-events: none;
                }

                .hero-glow-one {
                    top: 30px;
                    left: -180px;
                    background: #7047e8;
                }

                .hero-glow-two {
                    top: 200px;
                    right: -180px;
                    background: #2563eb;
                }

                .hero-content {
                    max-width: 850px;
                    text-align: center;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;
                    padding: 9px 15px;
                    border: 1px solid rgba(167,139,250,.24);
                    border-radius: 30px;
                    background: rgba(139,92,246,.09);
                    color: #c4b5fd;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.4px;
                }

                .badge-sparkle {
                    color: #a78bfa;
                    font-size: 15px;
                }

                .hero-content h1 {
                    margin: 27px 0 20px;
                    font-size: clamp(42px,6vw,76px);
                    font-weight: 850;
                    line-height: 1.08;
                    letter-spacing: -3.5px;
                }

                .hero-content h1 span,
                .section-heading h2 span,
                .cta-section h2 span {
                    background: linear-gradient(100deg,#a78bfa,#60a5fa);
                    background-clip: text;
                    -webkit-background-clip: text;
                    color: transparent;
                }

                .hero-description {
                    max-width: 650px;
                    margin: 0 auto;
                    color: #9ba7bd;
                    font-size: 16px;
                    line-height: 1.9;
                }

                .hero-buttons {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 14px;
                    margin-top: 32px;
                }

                .primary-button,
                .secondary-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    min-height: 48px;
                    padding: 0 22px;
                    border-radius: 10px;
                    font-size: 13px;
                    font-weight: 750;
                    text-decoration: none;
                    transition: transform .2s, box-shadow .2s;
                }

                .primary-button {
                    background: linear-gradient(110deg,#7c3aed,#4f46e5);
                    color: white;
                    box-shadow: 0 10px 35px rgba(99,102,241,.25);
                }

                .secondary-button {
                    border: 1px solid rgba(255,255,255,.13);
                    background: rgba(255,255,255,.035);
                    color: #dbe3f2;
                }

                .primary-button:hover,
                .secondary-button:hover {
                    transform: translateY(-3px);
                }

                .primary-button:hover {
                    box-shadow: 0 14px 40px rgba(99,102,241,.4);
                }

                .hero-trust {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 24px;
                    margin-top: 26px;
                    color: #7f8ba3;
                    font-size: 11px;
                }

                /* AI Mentor and coding animation layout */
                .hero-visuals {
                    display: grid;
                    grid-template-columns: minmax(260px,.8fr) minmax(0,1.2fr);
                    align-items: center;
                    gap: 35px;
                    width: 100%;
                    max-width: 1180px;
                    margin: 65px auto 0;
                }

                .hero-mentor {
                    display: flex;
                    justify-content: center;
                    min-width: 0;
                }

                .hero-code {
                    display: flex;
                    justify-content: center;
                    min-width: 0;
                    width: 100%;
                }

                .hero-code :global(.coding-animation) {
                    max-width: 650px;
                }

                /* Shared section heading */
                .features-section,
                .workflow-section,
                .languages-section {
                    padding: 100px 7%;
                }

                .section-heading {
                    max-width: 720px;
                    margin: 0 auto 55px;
                    text-align: center;
                }

                .section-label {
                    color: #a78bfa;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 2px;
                }

                .section-heading h2,
                .cta-section h2 {
                    margin: 17px 0;
                    font-size: clamp(30px,4vw,47px);
                    font-weight: 800;
                    letter-spacing: -1.8px;
                    line-height: 1.2;
                }

                .section-heading p,
                .cta-section p {
                    color: #929db2;
                    font-size: 14px;
                    line-height: 1.8;
                }

                /* Feature cards */
                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(4,minmax(0,1fr));
                    gap: 18px;
                    max-width: 1200px;
                    margin: auto;
                }

                .feature-card {
                    position: relative;
                    min-height: 230px;
                    padding: 27px 23px;
                    border: 1px solid rgba(255,255,255,.08);
                    border-radius: 16px;
                    background: linear-gradient(145deg,#11182b,#0d1221);
                    transition: transform .25s,border-color .25s;
                }

                .feature-card:hover {
                    transform: translateY(-7px);
                    border-color: rgba(167,139,250,.45);
                }

                .feature-icon {
                    display: grid;
                    width: 45px;
                    height: 45px;
                    place-items: center;
                    border-radius: 12px;
                    font-size: 21px;
                }

                .feature-icon.purple { background: #302052; color: #c4b5fd; }
                .feature-icon.blue { background: #172c50; color: #93c5fd; }
                .feature-icon.pink { background: #48213f; color: #f0abfc; }
                .feature-icon.orange { background: #482d20; color: #fdba74; }

                .feature-number {
                    position: absolute;
                    top: 30px;
                    right: 23px;
                    color: #4b5870;
                    font-family: monospace;
                    font-size: 12px;
                }

                .feature-card h3 {
                    margin: 25px 0 10px;
                    font-size: 16px;
                }

                .feature-card p {
                    color: #929db2;
                    font-size: 12px;
                    line-height: 1.8;
                }

                .feature-arrow {
                    display: block;
                    margin-top: 17px;
                    color: #a78bfa;
                }

                /* Workflow cards */
                .workflow-section {
                    background: #0c1120;
                }

                .workflow-grid {
                    display: grid;
                    grid-template-columns: repeat(3,minmax(0,1fr));
                    gap: 25px;
                    max-width: 1100px;
                    margin: auto;
                }

                .workflow-card {
                    padding: 28px;
                    border: 1px solid rgba(255,255,255,.08);
                    border-radius: 15px;
                    background: #11182a;
                }

                .workflow-number {
                    color: #a78bfa;
                    font-family: monospace;
                    font-size: 28px;
                    font-weight: 800;
                }

                .workflow-line {
                    width: 45px;
                    height: 3px;
                    margin: 20px 0;
                    border-radius: 5px;
                    background: linear-gradient(90deg,#8b5cf6,#3b82f6);
                }

                .workflow-card h3 {
                    font-size: 17px;
                }

                .workflow-card p {
                    color: #929db2;
                    font-size: 13px;
                    line-height: 1.8;
                }

                /* Programming language cards */
                .language-grid {
                    display: grid;
                    grid-template-columns: repeat(3,minmax(0,1fr));
                    gap: 18px;
                    max-width: 1000px;
                    margin: auto;
                }

                .language-card {
                    display: flex;
                    align-items: center;
                    gap: 17px;
                    padding: 22px;
                    border: 1px solid rgba(255,255,255,.08);
                    border-radius: 14px;
                    background: #11182a;
                }

                .language-symbol {
                    display: grid;
                    flex-shrink: 0;
                    width: 54px;
                    height: 54px;
                    place-items: center;
                    border-radius: 13px;
                    background: #202c49;
                    color: #93c5fd;
                    font-size: 19px;
                    font-weight: 800;
                }

                .language-cpp { background: #2c2050; color: #c4b5fd; }
                .language-java { background: #42291f; color: #fdba74; }

                .language-card h3 {
                    margin: 0 0 5px;
                    font-size: 16px;
                }

                .language-card p {
                    margin: 0;
                    color: #929db2;
                    font-size: 11px;
                }

                .language-arrow {
                    margin-left: auto;
                    color: #a78bfa;
                }

                /* Final call to action */
                .cta-section {
                    position: relative;
                    overflow: hidden;
                    margin: 30px 7% 90px;
                    padding: 75px 25px;
                    border: 1px solid rgba(167,139,250,.2);
                    border-radius: 22px;
                    background: linear-gradient(120deg,#17142e,#111c35);
                    text-align: center;
                }

                .cta-glow {
                    position: absolute;
                    top: -170px;
                    left: 50%;
                    width: 350px;
                    height: 350px;
                    transform: translateX(-50%);
                    border-radius: 50%;
                    background: #7047e8;
                    filter: blur(140px);
                    opacity: .2;
                    pointer-events: none;
                }

                .cta-section h2,
                .cta-section p,
                .cta-section a,
                .cta-section .section-label {
                    position: relative;
                }

                .cta-section p {
                    max-width: 570px;
                    margin: 0 auto 27px;
                }

                /* Footer */
                .footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 18px;
                    padding: 30px 7%;
                    border-top: 1px solid rgba(255,255,255,.07);
                }

                .footer p,
                .footer-copyright {
                    color: #77839a;
                    font-size: 11px;
                }

                /* Responsive layout for tablets */
                @media (max-width: 1000px) {
                    .hero-visuals {
                        grid-template-columns: 1fr;
                        max-width: 700px;
                    }

                    .feature-grid {
                        grid-template-columns: repeat(2,minmax(0,1fr));
                    }
                }

                /* Responsive layout for mobile devices */
                @media (max-width: 650px) {
                    .navbar {
                        padding: 15px 5%;
                    }

                    .nav-links {
                        display: none;
                    }

                    .nav-actions {
                        gap: 12px;
                    }

                    .nav-signup {
                        padding: 9px 12px;
                        font-size: 11px;
                    }

                    .hero-section {
                        padding: 75px 5% 60px;
                    }

                    .hero-content h1 {
                        letter-spacing: -1.8px;
                    }

                    .hero-description {
                        font-size: 14px;
                    }

                    .hero-visuals {
                        gap: 15px;
                        margin-top: 45px;
                    }

                    .features-section,
                    .workflow-section,
                    .languages-section {
                        padding: 70px 5%;
                    }

                    .feature-grid,
                    .workflow-grid,
                    .language-grid {
                        grid-template-columns: 1fr;
                    }

                    .feature-card {
                        min-height: 190px;
                    }

                    .cta-section {
                        margin: 20px 5% 60px;
                        padding: 55px 20px;
                    }

                    .footer {
                        flex-direction: column;
                        text-align: center;
                    }
                }

                /* Respect users who prefer reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    .feature-card,
                    .primary-button,
                    .secondary-button {
                        transition: none;
                    }
                }

            `}</style>

        </main>
    );
}
