
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : CodingAnimation.tsx
// Module       : Animated Code Editor
// Description  : Displays a realistic coding editor with
//                automatic code typing and terminal output.
//
////////////////////////////////////////////////////////////

"use client";

import { useEffect, useState } from "react";

const codeLines = [
    "#include <iostream>",
    "using namespace std;",
    "",
    "int main() {",
    "    int numbers[] = {10, 20, 30, 40};",
    "    int sum = 0;",
    "",
    "    for (int i = 0; i < 4; i++) {",
    "        sum += numbers[i];",
    "    }",
    "",
    '    cout << "Total: " << sum;',
    "    return 0;",
    "}",
];

export default function CodingAnimation() {
    const [visibleCode, setVisibleCode] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const fullCode = codeLines.join("\n");
        let position = 0;

        const typingTimer = window.setInterval(() => {
            position++;

            setVisibleCode(fullCode.slice(0, position));

            if (position >= fullCode.length) {
                window.clearInterval(typingTimer);
                setIsComplete(true);
            }
        }, 35);

        return () => window.clearInterval(typingTimer);
    }, []);

    // Split the currently visible code into editor lines.
    const visibleLines = visibleCode.split("\n");

    return (
        <section className="coding-animation">

            {/* Editor window header */}
            <div className="coding-titlebar">
                <div className="coding-window-controls">
                    <span className="window-dot red" />
                    <span className="window-dot yellow" />
                    <span className="window-dot green" />
                </div>

                <div className="coding-file-name">
                    <span> C++ </span>
                    main.cpp
                </div>

                <span className="coding-status">
                    <span className="status-dot" />
                    {isComplete ? "Code ready" : "Writing code"}
                </span>
            </div>

            {/* Code editor */}
            <div className="coding-editor">

                <div className="coding-line-numbers">
                    {visibleLines.map((_, index) => (
                        <span key={index}>{index + 1}</span>
                    ))}
                </div>

                <pre className="coding-code">
                    <code>
                        {visibleCode}
                        {!isComplete && (
                            <span className="typing-cursor"> </span>
                        )}
                    </code>
                </pre>

            </div>

            {/* Terminal panel */}
            <div className="coding-terminal">

                <div className="terminal-heading">
                    <span>TERMINAL</span>
                    <span className="terminal-live">● LIVE</span>
                </div>

                <div className="terminal-content">
                    <p>
                        <span className="terminal-prompt">➜</span>
                        {" "}g++ main.cpp -o main
                    </p>

                    <p>
                        <span className="terminal-prompt">➜</span>
                        {" "}./main
                    </p>

                    {isComplete && (
                        <>
                            <p className="terminal-result">
                                Total: 100
                            </p>
                            <p className="terminal-success">
                                ✓ Program executed successfully
                            </p>
                        </>
                    )}

                    {!isComplete && (
                        <p className="terminal-waiting">
                            Waiting for code...
                        </p>
                    )}
                </div>

            </div>

        </section>
    );
}
