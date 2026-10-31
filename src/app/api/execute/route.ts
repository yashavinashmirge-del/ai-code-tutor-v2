
//////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : route.ts
// Module       : Cloud Code Execution API
// Description  : Sends C++ code to Judge0 for cloud
//                compilation and execution.
//
//////////////////////////////////////////////////////

import { NextRequest, NextResponse } from "next/server";

// Judge0 public cloud endpoint
const JUDGE0_URL = "https://ce.judge0.com";

// C++ language ID in Judge0
const CPP_LANGUAGE_ID = 54;

// API request handler
export async function POST(request: NextRequest) {
    try {
        // Read code and input from the frontend
        const body = await request.json();

        const { code, input = "" } = body;

        // Validate submitted code
        if (typeof code !== "string" || !code.trim()) {
            return NextResponse.json(
                { success: false, error: "Please enter C++ code." },
                { status: 400 }
            );
        }

        // Submit code to Judge0
        const judgeResponse = await fetch(
            `${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    source_code: code,
                    language_id: CPP_LANGUAGE_ID,
                    stdin: input,
                }),
                cache: "no-store",
            }
        );

        // Handle Judge0 service errors
        if (!judgeResponse.ok) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Cloud execution service is unavailable.",
                },
                { status: 502 }
            );
        }

        // Read execution result
        const result = await judgeResponse.json();

        // Return actual execution information
        return NextResponse.json({
            success: true,
            status: result.status?.description ?? "Unknown",
            output: result.stdout ?? "",
            compileOutput: result.compile_output ?? "",
            error: result.stderr ?? "",
            message: result.message ?? "",
            executionTime: result.time ?? null,
            memory: result.memory ?? null,
        });

    } catch (error) {
        console.error("Cloud execution error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Unable to execute code. Please try again.",
            },
            { status: 500 }
        );
    }
}
