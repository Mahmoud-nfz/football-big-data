import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET: z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url().optional(),
    ),

    SEARCH_ENGINE_URL: z.string().url(),
    OPENAI_API_KEY: z.string().optional(),

    DB_HOST: z.string(),
    DB_PORT: z.coerce.number(),
    DB_NAME: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_NEXT_PORT: z.coerce.number(),
    NEXT_PUBLIC_WS_PORT: z.coerce.number(),
    NEXT_PUBLIC_NEXT_URL: z.string().url(),
    NEXT_PUBLIC_WS_URL: z.string().url(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    NEXT_PUBLIC_NEXT_PORT: process.env.NEXT_PUBLIC_NEXT_PORT ?? "3010",
    NEXT_PUBLIC_WS_PORT: process.env.NEXT_PUBLIC_WS_PORT ?? "3011",
    NEXT_PUBLIC_NEXT_URL:
      process.env.NEXT_PUBLIC_NEXT_URL ?? "http://localhost:3010",
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:3011",
    SEARCH_ENGINE_URL: process.env.SEARCH_ENGINE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
