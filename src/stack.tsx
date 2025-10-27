import { StackServerApp, StackClientApp } from "@stackframe/stack";

// Server app
export const stackServerApp = new StackServerApp({
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
  tokenStore: "nextjs-cookie", // wajib untuk Next.js App Router
});

// Client app
export const stackClientApp = new StackClientApp({
  inheritsFrom: stackServerApp,
});
