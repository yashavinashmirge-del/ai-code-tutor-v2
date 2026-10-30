
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : AIMentorSlideshow.tsx
// Module       : Animated AI Mentor Slideshow
//
// Description  : Displays a character-led AI mentor
//                slideshow with automatic transitions.
//
// Features:
//                1. Four educational mentor slides
//                2. Automatic slide transitions
//                3. Previous and next navigation
//                4. Active slide indicators
//                5. Animated mentor character
//                6. Responsive layout
//                7. Accessibility support
//
////////////////////////////////////////////////////////////

"use client";

import { useEffect, useState } from "react";

// Information displayed in each mentor slide.
const mentorSlides = [
    {
        label: "YOUR PERSONAL AI MENTOR",
        title: "Hey, future developer!",
        message: "Let's turn your coding ideas into real projects.",
        number: "01",
    },
    {
        label: "LEARN WITH CONFIDENCE",
        title: "Understand every line.",
        message: "I'll explain programming concepts step by step.",
        number: "02",
    },
    {
        label: "DEBUG WITH AI",
        title: "Errors are opportunities.",
        message: "Let's find bugs and understand how to fix them.",
        number: "03",
    },
    {
        label: "VISUALIZE YOUR CODE",
        title: "See how code works.",
        message: "Explore algorithms and data structures visually.",
        number: "04",
    },
];

export default function AIMentorSlideshow() {

    // Stores the currently active slide index.
    const [activeSlide, setActiveSlide] = useState(0);

    // Move to the next slide.
    const nextSlide = () => {
        setActiveSlide((current) =>
            (current + 1) % mentorSlides.length
        );
    };

    // Move to the previous slide.
    const previousSlide = () => {
        setActiveSlide((current) =>
            (current - 1 + mentorSlides.length) % mentorSlides.length
        );
    };

    // Automatically change slides every five seconds.
    useEffect(() => {

        const timer = window.setInterval(() => {
            setActiveSlide((current) =>
                (current + 1) % mentorSlides.length
            );
        }, 5000);

        // Clear the timer when the component is removed.
        return () => window.clearInterval(timer);

    }, []);

    // Get the current slide information.
    const slide = mentorSlides[activeSlide];

    return (
        <section
            className="mentor-slideshow"
            aria-label="AI mentor introduction"
        >

            {/* =========================================
                SLIDE CONTENT
            ========================================= */}

            <div className="mentor-slide-content" key={activeSlide}>

                {/* Mentor availability and slide category */}
                <div className="mentor-status">
                    <span className="mentor-status-dot" />
                    {slide.label}
                </div>

                {/* Mentor message */}
                <div className="mentor-message">

                    <span className="mentor-message-icon">
                        ✦
                    </span>

                    <h2>{slide.title}</h2>

                    <p>{slide.message}</p>

                </div>

                {/* Animated mentor character */}
                <div className="mentor-character">

                    {/* Background glow */}
                    <div className="mentor-character-glow" />

                    <img
                        src="/mentor.svg"
                        alt="Friendly AI coding mentor"
                        className="mentor-character-image"
                    />

                    {/* Decorative floating elements */}
                    <span className="mentor-floating-star star-one">
                        ✦
                    </span>

                    <span className="mentor-floating-star star-two">
                        ✧
                    </span>

                    <span className="mentor-floating-star star-three">
                        ✦
                    </span>

                </div>

            </div>


            {/* =========================================
                SLIDE NAVIGATION
            ========================================= */}

            <div className="mentor-navigation">

                {/* Previous slide button */}
                <button
                    type="button"
                    className="mentor-nav-button"
                    onClick={previousSlide}
                    aria-label="Previous mentor slide"
                >
                    ←
                </button>

                {/* Slide indicator buttons */}
                <div className="mentor-dots">

                    {mentorSlides.map((item, index) => (

                        <button
                            key={item.number}
                            type="button"
                            className={
                                activeSlide === index
                                    ? "mentor-dot active"
                                    : "mentor-dot"
                            }
                            onClick={() => setActiveSlide(index)}
                            aria-label={`Go to mentor slide ${index + 1}`}
                            aria-current={
                                activeSlide === index
                                    ? "true"
                                    : undefined
                            }
                        />

                    ))}

                </div>

                {/* Next slide button */}
                <button
                    type="button"
                    className="mentor-nav-button"
                    onClick={nextSlide}
                    aria-label="Next mentor slide"
                >
                    →
                </button>

                {/* Current slide counter */}
                <span className="mentor-slide-counter">
                    {slide.number}
                    <span> / 04</span>
                </span>

            </div>


            {/* =========================================
                COMPONENT STYLES
            ========================================= */}

            <style jsx>{`

                /* Main slideshow container */
                .mentor-slideshow {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    max-width: 440px;
                    min-width: 0;
                    margin: 0 auto;
                    padding: 18px 12px;
                }

                /* Slide content */
                .mentor-slide-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    animation: mentorSlideEnter .55s ease both;
                }

                /* Mentor status label */
                .mentor-status {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    max-width: 100%;
                    padding: 10px 15px;
                    border: 1px solid rgba(139,92,246,.28);
                    border-radius: 30px;
                    background: rgba(139,92,246,.1);
                    color: #c4b5fd;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 1.2px;
                    text-align: center;
                }

                .mentor-status-dot {
                    width: 8px;
                    height: 8px;
                    flex-shrink: 0;
                    border-radius: 50%;
                    background: #34d399;
                    box-shadow: 0 0 10px rgba(52,211,153,.8);
                }

                /* Mentor speech bubble */
                .mentor-message {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 340px;
                    margin: 25px auto 0;
                    padding: 20px;
                    border: 1px solid rgba(255,255,255,.1);
                    border-radius: 16px;
                    background: rgba(17,24,43,.88);
                    box-shadow: 0 15px 40px rgba(0,0,0,.2);
                    text-align: center;
                }

                .mentor-message-icon {
                    display: block;
                    margin-bottom: 8px;
                    color: #a78bfa;
                    font-size: 23px;
                }

                .mentor-message h2 {
                    margin: 0 0 9px;
                    color: #f8fafc;
                    font-size: 21px;
                    font-weight: 800;
                    line-height: 1.3;
                }

                .mentor-message p {
                    margin: 0;
                    color: #a5b4c9;
                    font-size: 12px;
                    line-height: 1.8;
                }

                /* Character illustration area */
                .mentor-character {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 270px;
                    margin-top: 5px;
                    isolation: isolate;
                }

                /* Character background glow */
                .mentor-character-glow {
                    position: absolute;
                    z-index: -1;
                    width: 220px;
                    height: 220px;
                    border-radius: 50%;
                    background: rgba(124,58,237,.28);
                    filter: blur(65px);
                }

                /* Mentor image */
                .mentor-character-image {
                    position: relative;
                    z-index: 1;
                    display: block;
                    width: 230px;
                    height: 250px;
                    object-fit: contain;
                    animation: mentorFloat 4s ease-in-out infinite;
                }

                /* Floating decorative stars */
                .mentor-floating-star {
                    position: absolute;
                    z-index: 2;
                    color: #c4b5fd;
                    font-size: 23px;
                    animation: starFloat 3s ease-in-out infinite;
                }

                .star-one {
                    top: 35px;
                    left: 17%;
                }

                .star-two {
                    top: 90px;
                    right: 15%;
                    animation-delay: .7s;
                }

                .star-three {
                    bottom: 40px;
                    left: 25%;
                    animation-delay: 1.2s;
                }

                /* Navigation row */
                .mentor-navigation {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 18px;
                    width: 100%;
                    margin-top: 5px;
                }

                /* Navigation arrows */
                .mentor-nav-button {
                    display: inline-flex;
                    flex: 0 0 38px;
                    align-items: center;
                    justify-content: center;
                    width: 38px;
                    height: 38px;
                    padding: 0;
                    border: 1px solid rgba(167,139,250,.3);
                    border-radius: 50%;
                    background: rgba(139,92,246,.12);
                    color: #ddd6fe;
                    font-size: 18px;
                    cursor: pointer;
                    transition: background .2s, transform .2s;
                }

                .mentor-nav-button:hover {
                    transform: scale(1.08);
                    background: rgba(139,92,246,.28);
                }

                /* Slide indicator group */
                .mentor-dots {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 7px;
                }

                .mentor-dot {
                    display: block;
                    flex: 0 0 7px;
                    width: 7px;
                    height: 7px;
                    padding: 0;
                    border: 0;
                    border-radius: 10px;
                    background: #475569;
                    cursor: pointer;
                    transition: width .25s, background .25s;
                }

                .mentor-dot.active {
                    flex-basis: 23px;
                    width: 23px;
                    background: #a78bfa;
                }

                /* Slide counter */
                .mentor-slide-counter {
                    margin-left: 4px;
                    color: #e2e8f0;
                    font-family: monospace;
                    font-size: 12px;
                    white-space: nowrap;
                }

                .mentor-slide-counter span {
                    color: #64748b;
                }

                /* Animations */
                @keyframes mentorSlideEnter {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes mentorFloat {
                    0%, 100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-9px);
                    }
                }

                @keyframes starFloat {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }

                    50% {
                        transform: translateY(-9px) rotate(12deg);
                    }
                }

                /* Mobile responsiveness */
                @media (max-width: 600px) {

                    .mentor-slideshow {
                        max-width: 350px;
                        padding: 12px 8px;
                    }

                    .mentor-message {
                        margin-top: 18px;
                        padding: 16px;
                    }

                    .mentor-message h2 {
                        font-size: 18px;
                    }

                    .mentor-character {
                        height: 220px;
                    }

                    .mentor-character-image {
                        width: 190px;
                        height: 210px;
                    }

                    .mentor-character-glow {
                        width: 170px;
                        height: 170px;
                    }

                    .mentor-navigation {
                        gap: 13px;
                    }

                }

                /* Respect reduced-motion preferences */
                @media (prefers-reduced-motion: reduce) {

                    .mentor-slide-content,
                    .mentor-character-image,
                    .mentor-floating-star {
                        animation: none;
                    }

                    .mentor-nav-button,
                    .mentor-dot {
                        transition: none;
                    }

                }

            `}</style>

        </section>
    );
}
