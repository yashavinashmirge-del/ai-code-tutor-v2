
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : page.tsx
// Module       : Interactive Code Workspace
// Description  : Provides Monaco Editor, AI learning
//                actions and dynamic AI visualization
//                using the local Ollama backend.
//
////////////////////////////////////////////////////////////

"use client";

import { useState } from "react";
import Link from "next/link";
import Editor from "@monaco-editor/react";
import MemoryVisualizer from "@/components/MemoryVisualizer";

// Supported programming languages.
const languages = [
    { label: "C++", value: "cpp" },
    { label: "C", value: "c" },
    { label: "Java", value: "java" },
];

// Sample programs for each language.
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

// Available AI learning actions.
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
        description: "Understand the algorithm using diagrams.",
    },
    {
        name: "Visual Execution",
        icon: "▦",
        description: "Explore memory and program execution.",
    },
];

// Structure returned by the AI Visualization API.
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

export default function WorkspacePage() {

    // Selected programming language.
    const [language, setLanguage] = useState("cpp");

    // Current source code in Monaco Editor.
    const [code, setCode] = useState(sampleCode.cpp);

    // Currently selected AI action.
    const [activeAction, setActiveAction] =
        useState("Explain Code");

    // Editor font size.
    const [fontSize, setFontSize] = useState(14);

    // Student's question for the AI.
    const [question, setQuestion] = useState(
        "Explain this algorithm step by step and visualize how it works."
    );

    // AI-generated visualization result.
    const [visualization, setVisualization] =
        useState<VisualizationResult | null>(null);

    // AI loading state.
    const [isLoading, setIsLoading] = useState(false);

    // API error message.
    const [aiError, setAiError] = useState("");

    // Change programming language and sample code.
    function handleLanguageChange(newLanguage: string) {
        setLanguage(newLanguage);
        setCode(sampleCode[newLanguage]);
        setVisualization(null);
        setAiError("");
    }

    // Restore sample code.
    function resetCode() {
        setCode(sampleCode[language]);
        setVisualization(null);
        setAiError("");
    }

    // Handle AI action selection.
    function handleActionChange(action: string) {
        setActiveAction(action);
        setVisualization(null);
        setAiError("");
    }

    // Send source code and question to Ollama through Next.js API.
    async function handleAIAction() {

        setAiError("");
        setVisualization(null);

        // Validate source code.
        if (!code.trim()) {
            setAiError("Please enter source code in the editor.");
            return;
        }

        // Validate student's question.
        if (!question.trim()) {
            setAiError("Please enter a question for the AI.");
            return;
        }

        setIsLoading(true);

        try {
            // Send data to the backend API.
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

            // Read the response.
            const result = await response.json();

            // Handle backend errors.
            if (!response.ok || !result.success) {
                throw new Error(
                    result.error || "AI processing failed."
                );
            }

            // Store the generated visualization.
            setVisualization(result.visualization);

        } catch (error) {
            setAiError(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred."
            );
        } finally {
            setIsLoading(false);
        }
    }

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
                            <h1 className="font-bold text-lg">CodeTutor</h1>
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
                        Write, analyze, visualize and understand your code.
                    </p>
                </section>

                {/* MAIN WORKSPACE GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-5">

                    {/* MONACO EDITOR */}
                    <section className="rounded-2xl border border-white/10 bg-[#111827] overflow-hidden">

                        {/* EDITOR TOOLBAR */}
                        <div className="min-h-16 px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">

                            <div>
                                <h3 className="text-sm font-semibold">
                                    Code Editor
                                </h3>

                                <p className="text-[11px] text-gray-500">
                                    main.{language === "cpp" ? "cpp" : language === "java" ? "java" : "c"}
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
                                        <option key={item.value} value={item.value}>
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
                                onChange={(value) => setCode(value ?? "")}
                                options={{
                                    fontSize,
                                    minimap: { enabled: true },
                                    automaticLayout: true,
                                    scrollBeyondLastLine: false,
                                    wordWrap: "on",
                                    padding: { top: 18, bottom: 18 },
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

                            <span>{code.split("\n").length} Lines</span>
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
                                    onClick={() => handleActionChange(action.name)}
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
                                    : "Your question and source code will be analyzed by the local AI model."}
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

                {/* ERROR MESSAGE */}
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

                        {/* VARIABLE TABLE */}
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
                                                <tr key={`${variable.name}-${index}`} className="border-t border-white/10">
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

                        {/* FLOWCHART DATA */}
                        {visualization.flowchart.nodes.length > 0 && (
                            <div>
                                <h4 className="font-semibold mb-3">
                                    Flowchart Nodes
                                </h4>

                                <div className="flex flex-wrap gap-3">
                                    {visualization.flowchart.nodes.map((node) => (
                                        <div
                                            key={node.id}
                                            className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3"
                                        >
                                            <p className="text-sm text-indigo-200">
                                                {node.label}
                                            </p>
                                            <p className="text-[10px] text-gray-500 mt-1">
                                                {node.type}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {visualization.flowchart.edges.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        {visualization.flowchart.edges.map((edge, index) => (
                                            <p key={index} className="text-xs text-gray-400">
                                                {edge.from} → {edge.to}
                                                {edge.label ? ` (${edge.label})` : ""}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* PROGRAM OUTPUT */}
                        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                            <h4 className="font-semibold text-green-300 mb-2">
                                Program Output
                            </h4>

                            <pre className="text-sm text-gray-200 whitespace-pre-wrap">
                                {visualization.output || "No output was provided by the AI."}
                            </pre>
                        </div>

                        <p className="text-xs text-gray-500">
                            AI-generated analysis is illustrative. Exact runtime
                            values require actual program execution.
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
