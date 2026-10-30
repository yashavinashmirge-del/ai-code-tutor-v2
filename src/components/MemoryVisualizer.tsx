
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : MemoryVisualizer.tsx
// Module       : Memory Visualization Engine
// Description  : Visually represents stack memory, heap
//                memory, variables, arrays, pointers,
//                references and execution steps.
//
////////////////////////////////////////////////////////////

"use client";

import { useState } from "react";

// Memory cell information.
type MemoryCell = {
    name: string;
    type: string;
    value: string;
    address: string;
    description: string;
};

// Execution step information.
type MemoryStep = {
    title: string;
    description: string;
    stack: MemoryCell[];
    heap: MemoryCell[];
};

// Sample execution memory states.
const memorySteps: MemoryStep[] = [
    {
        title: "Step 1: Variable Declaration",
        description: "Two integer variables are created in the current stack frame.",
        stack: [
            {
                name: "a",
                type: "int",
                value: "10",
                address: "0x1000",
                description: "First integer variable",
            },
            {
                name: "b",
                type: "int",
                value: "20",
                address: "0x1004",
                description: "Second integer variable",
            },
        ],
        heap: [],
    },
    {
        title: "Step 2: Array Creation",
        description: "An integer array is allocated dynamically in heap memory.",
        stack: [
            {
                name: "a",
                type: "int",
                value: "10",
                address: "0x1000",
                description: "First integer variable",
            },
            {
                name: "b",
                type: "int",
                value: "20",
                address: "0x1004",
                description: "Second integer variable",
            },
            {
                name: "arr",
                type: "int*",
                value: "0x5000",
                address: "0x1008",
                description: "Pointer to the heap array",
            },
        ],
        heap: [
            {
                name: "arr[0]",
                type: "int",
                value: "5",
                address: "0x5000",
                description: "First array element",
            },
            {
                name: "arr[1]",
                type: "int",
                value: "10",
                address: "0x5004",
                description: "Second array element",
            },
            {
                name: "arr[2]",
                type: "int",
                value: "15",
                address: "0x5008",
                description: "Third array element",
            },
        ],
    },
    {
        title: "Step 3: Pointer Creation",
        description: "The pointer p stores the address of variable a.",
        stack: [
            {
                name: "a",
                type: "int",
                value: "10",
                address: "0x1000",
                description: "Target of pointer p",
            },
            {
                name: "b",
                type: "int",
                value: "20",
                address: "0x1004",
                description: "Second integer variable",
            },
            {
                name: "arr",
                type: "int*",
                value: "0x5000",
                address: "0x1008",
                description: "Pointer to the heap array",
            },
            {
                name: "p",
                type: "int*",
                value: "0x1000",
                address: "0x100C",
                description: "Points to variable a",
            },
        ],
        heap: [
            {
                name: "arr[0]",
                type: "int",
                value: "5",
                address: "0x5000",
                description: "First array element",
            },
            {
                name: "arr[1]",
                type: "int",
                value: "10",
                address: "0x5004",
                description: "Second array element",
            },
            {
                name: "arr[2]",
                type: "int",
                value: "15",
                address: "0x5008",
                description: "Third array element",
            },
        ],
    },
    {
        title: "Step 4: Reference Creation",
        description: "The reference ref becomes another name for variable b.",
        stack: [
            {
                name: "a",
                type: "int",
                value: "10",
                address: "0x1000",
                description: "Target of pointer p",
            },
            {
                name: "b",
                type: "int",
                value: "20",
                address: "0x1004",
                description: "Original variable referenced by ref",
            },
            {
                name: "arr",
                type: "int*",
                value: "0x5000",
                address: "0x1008",
                description: "Pointer to the heap array",
            },
            {
                name: "p",
                type: "int*",
                value: "0x1000",
                address: "0x100C",
                description: "Points to variable a",
            },
            {
                name: "ref",
                type: "int&",
                value: "alias of b",
                address: "0x1004",
                description: "Reference to variable b, not a separate object",
            },
        ],
        heap: [
            {
                name: "arr[0]",
                type: "int",
                value: "5",
                address: "0x5000",
                description: "First array element",
            },
            {
                name: "arr[1]",
                type: "int",
                value: "10",
                address: "0x5004",
                description: "Second array element",
            },
            {
                name: "arr[2]",
                type: "int",
                value: "15",
                address: "0x5008",
                description: "Third array element",
            },
        ],
    },
    {
        title: "Step 5: Value Update",
        description: "The pointer changes a to 50, and the reference changes b to 100.",
        stack: [
            {
                name: "a",
                type: "int",
                value: "50",
                address: "0x1000",
                description: "Updated through pointer p",
            },
            {
                name: "b",
                type: "int",
                value: "100",
                address: "0x1004",
                description: "Updated through reference ref",
            },
            {
                name: "arr",
                type: "int*",
                value: "0x5000",
                address: "0x1008",
                description: "Pointer to the heap array",
            },
            {
                name: "p",
                type: "int*",
                value: "0x1000",
                address: "0x100C",
                description: "Still points to a",
            },
            {
                name: "ref",
                type: "int&",
                value: "alias of b",
                address: "0x1004",
                description: "Still refers to b",
            },
        ],
        heap: [
            {
                name: "arr[0]",
                type: "int",
                value: "5",
                address: "0x5000",
                description: "First array element",
            },
            {
                name: "arr[1]",
                type: "int",
                value: "10",
                address: "0x5004",
                description: "Second array element",
            },
            {
                name: "arr[2]",
                type: "int",
                value: "15",
                address: "0x5008",
                description: "Third array element",
            },
        ],
    },
];

// Reusable memory cell component.
function MemoryCard({
    cell,
    kind,
}: {
    cell: MemoryCell;
    kind: "stack" | "heap";
}) {
    const isPointer = cell.type.includes("*");
    const isReference = cell.type.includes("&");

    return (
        <div
            className={`rounded-xl border p-3 ${
                kind === "stack"
                    ? "border-cyan-500/30 bg-cyan-500/5"
                    : "border-purple-500/30 bg-purple-500/5"
            }`}
        >
            <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-white">
                    {cell.name}
                </span>

                <span className="text-xs text-gray-400">
                    {cell.type}
                </span>
            </div>

            <div className="mt-3 text-xl font-bold text-white break-all">
                {cell.value}
            </div>

            <div className="mt-2 text-xs text-gray-400">
                Address: {cell.address}
            </div>

            {(isPointer || isReference) && (
                <div className="mt-2 text-xs text-amber-300">
                    {isPointer ? "↗ Pointer connection" : "↗ Reference alias"}
                </div>
            )}

            <p className="mt-2 text-xs text-gray-500">
                {cell.description}
            </p>
        </div>
    );
}

// Reusable memory section.
function MemorySection({
    title,
    description,
    cells,
    kind,
}: {
    title: string;
    description: string;
    cells: MemoryCell[];
    kind: "stack" | "heap";
}) {
    return (
        <section
            className={`rounded-2xl border p-4 ${
                kind === "stack"
                    ? "border-cyan-500/30 bg-cyan-950/20"
                    : "border-purple-500/30 bg-purple-950/20"
            }`}
        >
            <div className="mb-4">
                <h3 className="text-lg font-bold text-white">
                    {title}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                    {description}
                </p>
            </div>

            {cells.length === 0 ? (
                <div className="rounded-lg border border-dashed border-white/10 p-6 text-center text-sm text-gray-500">
                    No allocated memory in this section.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cells.map((cell) => (
                        <MemoryCard
                            key={cell.name}
                            cell={cell}
                            kind={kind}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

// Main memory visualization component.
export default function MemoryVisualizer() {
    // Current execution step.
    const [currentStep, setCurrentStep] = useState(0);

    // Read the current memory state.
    const step = memorySteps[currentStep];

    // Move to the next execution step.
    function nextStep() {
        setCurrentStep((current) =>
            Math.min(current + 1, memorySteps.length - 1)
        );
    }

    // Move to the previous execution step.
    function previousStep() {
        setCurrentStep((current) =>
            Math.max(current - 1, 0)
        );
    }

    // Reset the memory simulation.
    function resetSimulation() {
        setCurrentStep(0);
    }

    return (
        <main className="space-y-6 text-white">

            {/* Memory visualizer heading */}
            <header>
                <h2 className="text-2xl font-bold">
                    Memory Visualization
                </h2>

                <p className="text-sm text-gray-400 mt-2">
                    Explore how variables, arrays, pointers and references
                    occupy and connect memory.
                </p>
            </header>

            {/* Execution progress */}
            <section className="rounded-xl border border-white/10 bg-[#111827] p-4">
                <div className="flex flex-wrap justify-between gap-3">
                    <div>
                        <p className="text-xs text-indigo-300">
                            CURRENT EXECUTION
                        </p>

                        <h3 className="text-lg font-semibold mt-1">
                            {step.title}
                        </h3>
                    </div>

                    <span className="text-sm text-gray-400">
                        {currentStep + 1} / {memorySteps.length}
                    </span>
                </div>

                <p className="text-sm text-gray-400 mt-3">
                    {step.description}
                </p>

                {/* Progress bar */}
                <div className="h-2 rounded-full bg-white/10 mt-4 overflow-hidden">
                    <div
                        className="h-full bg-indigo-500 transition-all duration-300"
                        style={{
                            width: `${
                                ((currentStep + 1) / memorySteps.length) * 100
                            }%`,
                        }}
                    />
                </div>

                {/* Execution controls */}
                <div className="flex flex-wrap gap-3 mt-5">
                    <button
                        onClick={resetSimulation}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
                    >
                        ↺ Reset
                    </button>

                    <button
                        onClick={previousStep}
                        disabled={currentStep === 0}
                        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-sm"
                    >
                        ← Previous
                    </button>

                    <button
                        onClick={nextStep}
                        disabled={currentStep === memorySteps.length - 1}
                        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-sm"
                    >
                        Next Step →
                    </button>
                </div>
            </section>

            {/* Stack and heap representation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                <MemorySection
                    title="Stack Memory"
                    description="Local variables, pointers and reference aliases."
                    cells={step.stack}
                    kind="stack"
                />

                <MemorySection
                    title="Heap Memory"
                    description="Dynamically allocated array elements."
                    cells={step.heap}
                    kind="heap"
                />

            </div>

            {/* Pointer and reference explanation */}
            <section className="rounded-2xl border border-white/10 bg-[#111827] p-5">
                <h3 className="font-bold text-lg mb-4">
                    Pointer & Reference Relationships
                </h3>

                <div className="space-y-3 text-sm">
                    <div className="rounded-lg bg-white/5 p-3">
                        <span className="text-amber-300 font-semibold">
                            Pointer p
                        </span>

                        <p className="text-gray-400 mt-1">
                            Stores the address of variable a. Dereferencing p
                            accesses the value stored at that address.
                        </p>
                    </div>

                    <div className="rounded-lg bg-white/5 p-3">
                        <span className="text-amber-300 font-semibold">
                            Reference ref
                        </span>

                        <p className="text-gray-400 mt-1">
                            Acts as another name for variable b. Updating ref
                            also changes b.
                        </p>
                    </div>

                    <div className="rounded-lg bg-white/5 p-3">
                        <span className="text-purple-300 font-semibold">
                            Dynamic array arr
                        </span>

                        <p className="text-gray-400 mt-1">
                            The stack stores the pointer arr, while the array
                            elements are represented in heap memory.
                        </p>
                    </div>
                </div>
            </section>

            {/* Important memory information */}
            <section className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <h3 className="font-semibold text-amber-300">
                    Important: Memory Address Note
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                    Addresses in this demonstration are illustrative.
                    They are not actual machine addresses. The simulation
                    demonstrates memory relationships and value changes.
                </p>
            </section>

        </main>
    );
}
