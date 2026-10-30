////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : auth-client.ts
// Module       : Authentication Client
// Description  : Connects the frontend to Better Auth.
//
////////////////////////////////////////////////////////////

import { createAuthClient } from "better-auth/react";

// Create the authentication client.
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
});

// Export authentication functions.
export const {
    signIn,
    signUp,
    signOut,
    useSession,
} = authClient;