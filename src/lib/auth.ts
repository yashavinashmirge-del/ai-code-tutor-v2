
////////////////////////////////////////////////////////////
//
// Project Name : AI Code Tutor & Analyzer
// File Name    : auth.ts
// Module       : Authentication Configuration
// Description  : Configures Better Auth with SQLite,
//                Google, GitHub and Email/Password login.
//
////////////////////////////////////////////////////////////

import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

// Create the authentication server instance.
export const auth = betterAuth({

    // Connect authentication to the local SQLite database.
    database: new Database("./auth.db"),

    // Enable email and password authentication.
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },

    // Configure Google and GitHub OAuth providers.
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },

        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
    },
});
