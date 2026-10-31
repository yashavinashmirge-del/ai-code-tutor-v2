////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : page.tsx
// Module       : Interactive Code Workspace
// Description  : Monaco Editor, Groq AI learning tools,
//                Mermaid flowcharts and Judge0 cloud
//                code execution.
//
////////////////////////////////////////////////////////////

"use client";

import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";
import Link from "next/link";
import Editor from "@monaco-editor/react";
import MemoryVisualizer from "@/components/MemoryVisualizer";

// ---------------------------------------------------------
// 1. SUPPORTED PROGRAMMING LANGUAGES
// ---------------------------------------------------------

const languages = [
    { label: "C++", value: "cpp" },
    { label: "C", value: "c" },
    { label: "Java", value: "java" },
];

// ---------------------------------------------------------
// 2. SAMPLE PROGRAMS
// ---------------------------------------------------------

const sampleCode: Record<string, string> = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    int numbers[] = {4, 9, 2, 7};
    int largest = numbers[0];

    for (int i = 1; i < 4; i++) {
        if (numbers[i] > largest) {
            largest = numbers[i];
        }
    }

    cout << "Largest number: " << largest;
    return 0;
}`,

    c: `#include <stdio.h>

int main() {
    int numbers[] = {4, 9, 2, 7};
    int largest = numbers[0];

    for (int i = 1; i < 4; i++) {
        if (numbers[i] > largest) {
            largest = numbers[i];
        }
    }

    printf("Largest number: %d", largest);
    return 0;
}`,

    java: `public class Main {
    public static void main(String[] args) {
        int[] numbers = {4, 9, 2, 7};
        int largest = numbers[0];

        for (int i = 1; i < 4; i++) {
            if (numbers[i] > largest) {
                largest = numbers[i];
            }
        }

        System.out.println("Largest number: " + largest);
    }
}`,
};

// ---------------------------------------------------------
// 3. AI LEARNING ACTIONS
// ---------------------------------------------------------

const aiActions = [
    {
        name: "Explain Code",
        icon: "✦",
        description: "Understand your code line by line.",
    },
    {
        name: "Debug Code",
        icon: "⌕",
        description: "Find and understand programming errors.",
    },
    {
        name: "Optimize Code",
        icon: "⚡",
        description: "Improve performance and code quality.",
    },
    {
        name: "Visualize Algorithm",
        icon: "◇",
        description: "Understand algorithms using diagrams.",
    },
    {
        name: "Visual Execution",
        icon: "▦",
        description: "Explore memory and program execution.",
    },
];

// ---------------------------------------------------------
// 4. AI VISUALIZATION DATA STRUCTURE
// ---------------------------------------------------------

interface VisualizationResult {
    visualizationType: string;
    title: string;
    explanation: string;

    variables: {
        name: string;
        type: string;
        value: unknown;
    }[];

    steps: {
        step: number;
        description: string;
        changes?: Record<string, unknown>;
        output?: string;
    }[];

    output: string;

    flowchart: {
        nodes: {
            id: string;
            label: string;
            type: string;
        }[];

        edges: {
            from: string;
            to: string;
            label?: string;
        }[];
    };
}

// ---------------------------------------------------------
// 5. JUDGE0 EXECUTION DATA STRUCTURE
// ---------------------------------------------------------

interface ExecutionResult {
    success: boolean;
    status?: string;
    output?: string;
    compileOutput?: string;
    error?: string;
    message?: string;
    executionTime?: string | number;
    memory?: string | number;
}

// ---------------------------------------------------------
// 6. MERMAID FLOWCHART COMPONENT
// ---------------------------------------------------------

function MermaidFlowchart({
    nodes,
    edges,
}: {
    nodes: { id: string; label: string; type: string }[];
    edges: { from: string; to: string; label?: string }[];
}) {
    const diagramRef = useRef<HTMLDivElement>(null);
    const [renderError, setRenderError] = useState("");
    const uniqueId = useId().replace(/[^a-zA-Z0-9_-]/g, "");

    useEffect(() => {
        let cancelled = false;

        async function drawDiagram() {
            if (!diagramRef.current || nodes.length === 0) return;

            setRenderError("");

            mermaid.initialize({
                startOnLoad: false,
                theme: "dark",
                securityLevel: "strict",
                flowchart: {
                    curve: "basis",
                    htmlLabels: true,
                    useMaxWidth: true,
                },
            });

            const safeId = new Map<string, string>();

            nodes.forEach((node, index) => {
                safeId.set(node.id, `node${index}`);
            });

            const escapeLabel = (value: string) =>
                value
                    .replace(/&/g, "&amp;")
                    .replace(/"/g, "&quot;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/\n/g, "<br/>")
                    .replace(/\[/g, "&#91;")
                    .replace(/\]/g, "&#93;");

            const lines = ["flowchart TD"];

            nodes.forEach((node) => {
                const id = safeId.get(node.id)!;
                const label = escapeLabel(node.label || node.type || "Step");
                const type = (node.type || "").toLowerCase();

                if (
                    type.includes("start") ||
                    type.includes("end") ||
                    type.includes("terminal")
                ) {
                    lines.push(`    ${id}(["${label}"])`);
                } else if (
                    type.includes("decision") ||
                    type.includes("condition")
                ) {
                    lines.push(`    ${id}{"${label}"}`);
                } else if (
                    type.includes("input") ||
                    type.includes("output") ||
                    type.includes("io")
                ) {
                    lines.push(`    ${id}[/"${label}"/]`);
                } else {
                    lines.push(`    ${id}["${label}"]`);
                }
            });

            edges.forEach((edge) => {
                const from = safeId.get(edge.from);
                const to = safeId.get(edge.to);

                if (!from || !to) return;

                if (edge.label) {
                    lines.push(
                        `    ${from} -->|"${escapeLabel(edge.label)}"| ${to}`
                    );
                } else {
                    lines.push(`    ${from} --> ${to}`);
                }
            });

            try {
                const result = await mermaid.render(
                    `flowchart-${uniqueId || "diagram"}`,
                    lines.join("\n")
                );

                if (!cancelled && diagramRef.current) {
                    diagramRef.current.innerHTML = result.svg;
                }
            } catch (error) {
                if (!cancelled) {
                    setRenderError(
                        error instanceof Error
                            ? error.message
                            : "The flowchart could not be rendered."
                    );
                }
            }
        }

        drawDiagram();

        return () => {
            cancelled = true;
        };
    }, [nodes, edges, uniqueId]);

    return (
        <div className="rounded-xl border border-indigo-500/20 bg-slate-950/70 p-4">

            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-semibold text-indigo-200">
                    Algorithm Flowchart
                </h4>

                <span className="text-xs text-gray-500">
                    AI-generated • Connected flow
                </span>
            </div>

            {renderError ? (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                    Flowchart rendering failed: {renderError}
                </p>
            ) : (
                <div className="w-full overflow-x-auto">
                    <div
                        ref={diagramRef}
                        className="mermaid-flowchart mx-auto min-w-[320px]"
                        aria-label="Generated algorithm flowchart"
                    />
                </div>
            )}

            <p className="mt-3 text-xs text-gray-500">
                Decision branches, labeled paths and loop-back arrows
                follow the connections returned by the AI analysis.
            </p>
        </div>
    );
}

// =========================================================
// 7. MAIN WORKSPACE COMPONENT
// =========================================================

export default function WorkspacePage() {

    // -----------------------------------------------------
    // A. EDITOR STATES
    // -----------------------------------------------------

    const [language, setLanguage] = useState("cpp");

    const [code, setCode] = useState(sampleCode.cpp);

    const [fontSize, setFontSize] = useState(14);

    // -----------------------------------------------------
    // B. AI STATES
    // -----------------------------------------------------

    const [activeAction, setActiveAction] =
        useState("Explain Code");

    const [question, setQuestion] = useState(
        "Explain this algorithm step by step and visualize how it works."
    );

    const [visualization, setVisualization] =
        useState<VisualizationResult | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const [aiError, setAiError] = useState("");

    // -----------------------------------------------------
    // C. JUDGE0 EXECUTION STATES
    // -----------------------------------------------------

    const [programInput, setProgramInput] = useState("");

    const [executionResult, setExecutionResult] =
        useState<ExecutionResult | null>(null);

    const [isExecuting, setIsExecuting] = useState(false);

    const [executionError, setExecutionError] = useState("");

    // -----------------------------------------------------
    // 8. LANGUAGE CHANGE
    // -----------------------------------------------------

    function handleLanguageChange(newLanguage: string) {
        setLanguage(newLanguage);
        setCode(sampleCode[newLanguage]);

        setVisualization(null);
        setExecutionResult(null);

        setAiError("");
        setExecutionError("");
    }

    // -----------------------------------------------------
    // 9. RESET CODE
    // -----------------------------------------------------

    function resetCode() {
        setCode(sampleCode[language]);

        setVisualization(null);
        setExecutionResult(null);

        setAiError("");
        setExecutionError("");
    }

    // -----------------------------------------------------
    // 10. AI ACTION SELECTION
    // -----------------------------------------------------

    function handleActionChange(action: string) {
        setActiveAction(action);

        setVisualization(null);
        setAiError("");
    }

    // -----------------------------------------------------
    // 11. GROQ AI ACTION
    // -----------------------------------------------------

    async function handleAIAction() {
        setAiError("");
        setVisualization(null);

        if (!code.trim()) {
            setAiError("Please enter source code in the editor.");
            return;
        }

        if (!question.trim()) {
            setAiError("Please enter a question for the AI.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/visualize", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    question,
                    code,
                    language,
                    action: activeAction,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.error || "AI processing failed."
                );
            }

            setVisualization(result.visualization);

        } catch (error) {
            setAiError(
                error instanceof Error
                    ? error.message
                    : "An unexpected AI error occurred."
            );
        } finally {
            setIsLoading(false);
        }
    }

    // -----------------------------------------------------
    // 12. JUDGE0 CLOUD CODE EXECUTION
    // -----------------------------------------------------

    async function handleRunCode() {
        setExecutionError("");
        setExecutionResult(null);

        if (!code.trim()) {
            setExecutionError(
                "Please enter source code before running."
            );
            return;
        }

        // Current /api/execute route uses Judge0 C++17 ID 54.
        if (language !== "cpp") {
            setExecutionError(
                "Cloud execution currently supports C++17 only."
            );
            return;
        }

        setIsExecuting(true);

        try {
            const response = await fetch("/api/execute", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    code,
                    input: programInput,
                }),
            });

            const result: ExecutionResult = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.error ||
                    result.message ||
                    "Cloud execution failed."
                );
            }

            setExecutionResult(result);

        } catch (error) {
            setExecutionError(
                error instanceof Error
                    ? error.message
                    : "An unexpected execution error occurred."
            );
        } finally {
            setIsExecuting(false);
        }
    }

    // =====================================================
    // 13. WORKSPACE USER INTERFACE
    // =====================================================

    return (
        <main className="min-h-screen bg-[#080d1c] text-white">

            {/* HEADER */}

            <header className="sticky top-0 z-30 h-16 border-b border-white/10 bg-[#080d1c]/95 backdrop-blur-md">

                <div className="max-w-[1600px] h-full mx-auto px-5 flex items-center justify-between">

                    <Link href="/dashboard" className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">
                            C
                        </div>

                        <div>
                            <h1 className="font-bold text-lg">
                                CodeTutor
                            </h1>

                            <p className="text-[10px] text-gray-500">
                                AI CODE LEARNING PLATFORM
                            </p>
                        </div>

                    </Link>

                    <div className="flex items-center gap-4">

                        <span className="hidden sm:block text-xs text-green-400">
                            ● Workspace Ready
                        </span>

                        <Link
                            href="/dashboard"
                            className="text-sm text-gray-400 hover:text-white transition"
                        >
                            ← Dashboard
                        </Link>

                    </div>

                </div>
            </header>

            <div className="max-w-[1600px] mx-auto p-4 md:p-6 space-y-6">

                {/* WORKSPACE TITLE */}

                <section>

                    <p className="text-indigo-400 text-xs font-semibold tracking-widest uppercase">
                        Development Environment
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        Code Workspace
                    </h2>

                    <p className="text-sm text-gray-400 mt-2">
                        Write, analyze, execute, visualize and understand your code.
                    </p>

                </section>

                {/* MAIN WORKSPACE GRID */}

                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-5">

                    {/* EDITOR SECTION */}

                    <section className="rounded-2xl border border-white/10 bg-[#111827] overflow-hidden">

                        {/* EDITOR TOOLBAR */}

                        <div className="min-h-16 px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">

                            <div>

                                <h3 className="text-sm font-semibold">
                                    Code Editor
                                </h3>

                                <p className="text-[11px] text-gray-500">
                                    main.
                                    {language === "cpp"
                                        ? "cpp"
                                        : language === "java"
                                            ? "java"
                                            : "c"}
                                </p>

                            </div>

                            <div className="flex flex-wrap items-center gap-2">

                                <select
                                    value={language}
                                    onChange={(event) =>
                                        handleLanguageChange(event.target.value)
                                    }
                                    className="bg-[#202b40] border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                                >
                                    {languages.map((item) => (
                                        <option
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={fontSize}
                                    onChange={(event) =>
                                        setFontSize(Number(event.target.value))
                                    }
                                    className="bg-[#202b40] border border-white/10 rounded-lg px-2 py-2 text-sm text-white"
                                >
                                    <option value={12}>12 px</option>
                                    <option value={14}>14 px</option>
                                    <option value={16}>16 px</option>
                                    <option value={18}>18 px</option>
                                </select>

                                <button
                                    onClick={resetCode}
                                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs"
                                >
                                    ↺ Reset
                                </button>

                            </div>

                        </div>

                        {/* MONACO EDITOR */}

                        <div className="h-[520px]">

                            <Editor
                                height="100%"
                                language={language}
                                theme="vs-dark"
                                value={code}
                                onChange={(value) =>
                                    setCode(value ?? "")
                                }
                                options={{
                                    fontSize,
                                    minimap: { enabled: true },
                                    automaticLayout: true,
                                    scrollBeyondLastLine: false,
                                    wordWrap: "on",
                                    padding: {
                                        top: 18,
                                        bottom: 18,
                                    },
                                    smoothScrolling: true,
                                    cursorBlinking: "smooth",
                                    renderLineHighlight: "all",
                                    bracketPairColorization: {
                                        enabled: true,
                                    },
                                }}
                            />

                        </div>

                        {/* EDITOR STATUS */}

                        <div className="h-10 px-4 flex items-center justify-between border-t border-white/10 bg-[#0d1424] text-[11px] text-gray-500">

                            <div className="flex items-center gap-4">
                                <span>{language.toUpperCase()}</span>
                                <span>UTF-8</span>
                                <span>Monaco Editor</span>
                            </div>

                            <span>
                                {code.split("\n").length} Lines
                            </span>

                        </div>

                        {/* CLOUD COMPILER */}

                        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-t border-white/10 bg-[#0d1424]">

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Cloud Compiler
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Compile and execute using Judge0 C++17.
                                </p>
                            </div>

                            <button
                                onClick={handleRunCode}
                                disabled={isExecuting || language !== "cpp"}
                                className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition"
                            >
                                {isExecuting
                                    ? "Executing..."
                                    : "▶ Run Code"}
                            </button>

                        </div>

                    </section>

                    {/* AI LEARNING ASSISTANT */}

                    <aside className="rounded-2xl border border-white/10 bg-[#111827] p-5 h-fit">

                        <div className="flex items-center gap-3 mb-2">

                            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-xl">
                                ✦
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    AI Learning Assistant
                                </h3>

                                <p className="text-[11px] text-gray-500">
                                    Your coding mentor
                                </p>
                            </div>

                        </div>

                        <p className="text-xs text-gray-400 leading-relaxed mt-4 mb-5">
                            Select an action to explore your code and improve your programming skills.
                        </p>

                        {/* ACTION SELECTION */}

                        <div className="space-y-2">

                            {aiActions.map((action) => (

                                <button
                                    key={action.name}
                                    onClick={() =>
                                        handleActionChange(action.name)
                                    }
                                    className={`w-full p-3 rounded-xl border text-left transition ${
                                        activeAction === action.name
                                            ? "bg-indigo-600/15 border-indigo-500/60"
                                            : "bg-white/[0.03] border-white/10 hover:bg-white/[0.08]"
                                    }`}
                                >

                                    <div className="flex items-center gap-3">

                                        <span className="text-lg text-indigo-400">
                                            {action.icon}
                                        </span>

                                        <div>

                                            <p className="text-sm font-medium">
                                                {action.name}
                                            </p>

                                            <p className="text-[10px] text-gray-500 mt-1">
                                                {action.description}
                                            </p>

                                        </div>

                                    </div>

                                </button>

                            ))}

                        </div>

                        {/* QUESTION INPUT */}

                        {activeAction !== "Visual Execution" && (

                            <div className="mt-5">

                                <label className="block text-xs font-semibold text-indigo-300 mb-2">
                                    YOUR QUESTION
                                </label>

                                <textarea
                                    value={question}
                                    onChange={(event) =>
                                        setQuestion(event.target.value)
                                    }
                                    rows={4}
                                    maxLength={4000}
                                    placeholder="What would you like the AI to explain?"
                                    className="w-full resize-y rounded-xl bg-[#0d1424] border border-white/10 p-3 text-sm text-white outline-none focus:border-indigo-500"
                                />

                            </div>

                        )}

                        {/* SELECTED ACTION */}

                        <div className="mt-5 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">

                            <p className="text-[10px] tracking-widest text-indigo-300 font-semibold">
                                SELECTED ACTION
                            </p>

                            <h4 className="font-semibold text-sm mt-2">
                                {activeAction}
                            </h4>

                            <p className="text-xs text-gray-400 mt-2 leading-relaxed">

                                {activeAction === "Visual Execution"
                                    ? "Explore the sample memory simulation."
                                    : "Your question and source code will be analyzed by Groq AI."}

                            </p>

                        </div>

                        {/* START AI ACTION */}

                        {activeAction !== "Visual Execution" && (

                            <button
                                onClick={handleAIAction}
                                disabled={isLoading}
                                className="w-full mt-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition"
                            >
                                {isLoading
                                    ? "AI is analyzing your code..."
                                    : `Start ${activeAction} →`}
                            </button>

                        )}

                    </aside>

                </div>

                {/* PROGRAM INPUT */}

                <section className="rounded-xl border border-white/10 bg-[#111827] p-4">

                    <h3 className="text-sm font-semibold text-white mb-2">
                        Program Input (stdin)
                    </h3>

                    <p className="text-xs text-gray-500 mb-3">
                        Provide input that your program reads using cin or scanf.
                    </p>

                    <textarea
                        value={programInput}
                        onChange={(event) =>
                            setProgramInput(event.target.value)
                        }
                        rows={3}
                        placeholder="Enter input for your program here..."
                        className="w-full resize-y rounded-lg bg-[#0d1424] border border-white/10 p-3 text-sm font-mono text-white outline-none focus:border-green-500"
                    />

                </section>

                {/* EXECUTION ERROR */}

                {executionError && (

                    <section className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">

                        <h3 className="font-semibold text-red-300 mb-2">
                            Execution Error
                        </h3>

                        <pre className="text-sm text-red-200 whitespace-pre-wrap">
                            {executionError}
                        </pre>

                    </section>

                )}

                {/* ACTUAL JUDGE0 EXECUTION RESULT */}

                {executionResult && (

                    <section className="rounded-2xl border border-green-500/30 bg-[#111827] p-5 space-y-4">

                        <div>

                            <p className="text-xs font-semibold tracking-widest text-green-400 uppercase">
                                Judge0 Cloud Execution
                            </p>

                            <h3 className="text-xl font-bold mt-2">
                                {executionResult.status || "Execution Completed"}
                            </h3>

                        </div>

                        {/* ACTUAL PROGRAM OUTPUT */}

                        <div className="rounded-xl bg-black/30 border border-white/10 p-4">

                            <h4 className="text-sm font-semibold text-green-300 mb-2">
                                Actual Program Output
                            </h4>

                            <pre className="text-sm text-white whitespace-pre-wrap">
                                {executionResult.output || "No standard output."}
                            </pre>

                        </div>

                        {/* COMPILATION OUTPUT */}

                        {executionResult.compileOutput && (

                            <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4">

                                <h4 className="text-sm font-semibold text-red-300 mb-2">
                                    Compilation Output
                                </h4>

                                <pre className="text-xs text-red-200 whitespace-pre-wrap">
                                    {executionResult.compileOutput}
                                </pre>

                            </div>

                        )}

                        {/* RUNTIME ERROR */}

                        {executionResult.error && (

                            <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4">

                                <h4 className="text-sm font-semibold text-red-300 mb-2">
                                    Runtime Error
                                </h4>

                                <pre className="text-xs text-red-200 whitespace-pre-wrap">
                                    {executionResult.error}
                                </pre>

                            </div>

                        )}

                        {/* EXECUTION METRICS */}

                        <div className="grid grid-cols-2 gap-3">

                            <div className="rounded-lg bg-white/5 p-3">

                                <p className="text-xs text-gray-500">
                                    Execution Time
                                </p>

                                <p className="text-lg font-semibold mt-1">
                                    {executionResult.executionTime ?? "N/A"}
                                </p>

                            </div>

                            <div className="rounded-lg bg-white/5 p-3">

                                <p className="text-xs text-gray-500">
                                    Memory
                                </p>

                                <p className="text-lg font-semibold mt-1">
                                    {executionResult.memory ?? "N/A"}
                                </p>

                            </div>

                        </div>

                        <p className="text-xs text-gray-500">
                            These results are returned by the Judge0 cloud execution service.
                        </p>

                    </section>

                )}

                {/* AI ERROR */}

                {aiError && (

                    <section className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">

                        <p className="text-sm text-red-300">
                            {aiError}
                        </p>

                    </section>

                )}

                {/* AI VISUALIZATION RESULTS */}

                {visualization && (

                    <section className="rounded-2xl border border-indigo-500/30 bg-[#111827] p-5 md:p-6 space-y-6">

                        <div>

                            <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
                                AI Generated Result
                            </p>

                            <h3 className="text-2xl font-bold mt-2">
                                {visualization.title}
                            </h3>

                            <p className="text-sm text-indigo-300 mt-2">
                                Visualization type: {visualization.visualizationType}
                            </p>

                        </div>

                        {/* AI EXPLANATION */}

                        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">

                            <h4 className="font-semibold mb-2">
                                AI Explanation
                            </h4>

                            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {visualization.explanation}
                            </p>

                        </div>

                        {/* VARIABLES */}

                        {visualization.variables.length > 0 && (

                            <div>

                                <h4 className="font-semibold mb-3">
                                    Variables
                                </h4>

                                <div className="overflow-x-auto rounded-xl border border-white/10">

                                    <table className="w-full text-sm text-left">

                                        <thead className="bg-white/5 text-gray-400">

                                            <tr>
                                                <th className="p-3">Name</th>
                                                <th className="p-3">Type</th>
                                                <th className="p-3">Value</th>
                                            </tr>

                                        </thead>

                                        <tbody>

                                            {visualization.variables.map((variable, index) => (

                                                <tr
                                                    key={`${variable.name}-${index}`}
                                                    className="border-t border-white/10"
                                                >

                                                    <td className="p-3 text-indigo-300">
                                                        {variable.name}
                                                    </td>

                                                    <td className="p-3 text-gray-400">
                                                        {variable.type}
                                                    </td>

                                                    <td className="p-3 font-mono">
                                                        {typeof variable.value === "object"
                                                            ? JSON.stringify(variable.value)
                                                            : String(variable.value)}
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        )}

                        {/* EXECUTION STEPS */}

                        {visualization.steps.length > 0 && (

                            <div>

                                <h4 className="font-semibold mb-3">
                                    Execution Steps
                                </h4>

                                <div className="space-y-3">

                                    {visualization.steps.map((step) => (

                                        <div
                                            key={step.step}
                                            className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                                        >

                                            <div className="w-8 h-8 shrink-0 rounded-lg bg-indigo-600/20 flex items-center justify-center text-indigo-300 text-sm font-bold">
                                                {step.step}
                                            </div>

                                            <div className="min-w-0">

                                                <p className="text-sm text-gray-200">
                                                    {step.description}
                                                </p>

                                                {step.changes && (

                                                    <pre className="mt-2 text-xs text-green-300 whitespace-pre-wrap">
                                                        {JSON.stringify(step.changes, null, 2)}
                                                    </pre>

                                                )}

                                                {step.output && (

                                                    <p className="mt-2 text-xs text-yellow-300">
                                                        Output: {step.output}
                                                    </p>

                                                )}

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        )}

                        {/* FLOWCHART */}

                        {visualization.flowchart.nodes.length > 0 && (

                            <MermaidFlowchart
                                nodes={visualization.flowchart.nodes}
                                edges={visualization.flowchart.edges}
                            />

                        )}

                        {/* AI OUTPUT */}

                        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">

                            <h4 className="font-semibold text-green-300 mb-2">
                                AI-Generated Output
                            </h4>

                            <pre className="text-sm text-gray-200 whitespace-pre-wrap">
                                {visualization.output || "No output was provided by the AI."}
                            </pre>

                        </div>

                        <p className="text-xs text-gray-500">
                            AI-generated analysis is illustrative. Use Run Code
                            to obtain actual compiler output and execution results.
                        </p>

                    </section>

                )}

                {/* VISUAL EXECUTION */}

                {activeAction === "Visual Execution" && (

                    <section className="rounded-2xl border border-white/10 bg-[#111827] p-4 md:p-6 space-y-5">

                        <div>

                            <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
                                Program Visualization
                            </p>

                            <h3 className="text-2xl font-bold mt-2">
                                Memory Visualization
                            </h3>

                            <p className="text-sm text-gray-400 mt-1">
                                Interactive demonstration of stack, heap,
                                pointers and references.
                            </p>

                        </div>

                        <MemoryVisualizer />

                    </section>

                )}

                {/* LEARNING INFORMATION */}

                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <div className="rounded-xl border border-white/10 bg-[#111827] p-4">

                        <p className="text-xs text-gray-500">
                            PROGRAMMING LANGUAGE
                        </p>

                        <p className="text-lg font-semibold mt-2">
                            {language.toUpperCase()}
                        </p>

                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#111827] p-4">

                        <p className="text-xs text-gray-500">
                            SOURCE CODE
                        </p>

                        <p className="text-lg font-semibold mt-2">
                            {code.split("\n").length} Lines
                        </p>

                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#111827] p-4">

                        <p className="text-xs text-gray-500">
                            CURRENT LEARNING MODE
                        </p>

                        <p className="text-lg font-semibold mt-2">
                            {activeAction}
                        </p>

                    </div>

                </section>

                {/* FOOTER */}

                <footer className="border-t border-white/10 pt-5 pb-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">

                    <p>
                        © 2026 CodeTutor. Learn. Build. Understand.
                    </p>

                    <Link
                        href="/dashboard"
                        className="hover:text-white transition"
                    >
                        Back to Dashboard ↑
                    </Link>

                </footer>

            </div>

        </main>
    );
}