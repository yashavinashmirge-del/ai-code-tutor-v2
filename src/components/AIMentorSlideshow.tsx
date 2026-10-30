
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : AIMentorSlideshow.tsx
// Module       : AI Mentor Slideshow
// Description  : Displays an animated AI mentor with
//                rotating messages and slide navigation.
//
////////////////////////////////////////////////////////////

"use client";

import { useEffect, useState } from "react";

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

    // Automatically change slides every four seconds.
    useEffect(() => {
        const timer = setInterval(nextSlide, 4000);

        return () => clearInterval(timer);
    }, []);

    const slide = mentorSlides[activeSlide];

    return (
        <section className="mentor-slideshow">

            <div className="mentor-slide-content" key={activeSlide}>

                {/* Mentor status */}
                <div className="mentor-status">
                    <span className="mentor-status-dot" />
                    {slide.label}
                </div>

                {/* Animated speech bubble */}
                <div className="mentor-message">
                    <span className="mentor-message-icon">✦</span>

                    <h2>{slide.title}</h2>

                    <p>{slide.message}</p>
                </div>

                {/* Animated mentor character */}
                <div className="mentor-character">
                    <div className="mentor-character-glow" />

                    <img
                        src="/mentor.svg"
                        alt="Your friendly AI coding mentor"
                    />

                    <span className="mentor-floating-star star-one">✦</span>
                    <span className="mentor-floating-star star-two">✧</span>
                    <span className="mentor-floating-star star-three">✦</span>
                </div>

                {/* Slide number */}
                <div className="mentor-slide-number">
                    {slide.number} / 04
                </div>

            </div>

            {/* Slideshow navigation */}
            <div className="mentor-navigation">

                <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous slide"
                >
                    ←
                </button>

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
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={
                                activeSlide === index ? "true" : undefined
                            }
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    →
                </button>

            </div>

        </section>
    );
}