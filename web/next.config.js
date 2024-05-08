/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    // Ignores ESLint during production builds and client-side transitions
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images:{
    remotePatterns: [
      {
        hostname: "*"
      }
    ]
  }
};

export default config;
