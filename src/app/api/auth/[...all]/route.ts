
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : route.ts
// Module       : Authentication API Route
// Description  : Handles Better Auth requests for login,
//                signup, logout and social authentication.
//
////////////////////////////////////////////////////////////

import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// Create Next.js API handlers for Better Auth.
export const { GET, POST } = toNextJsHandler(auth);
