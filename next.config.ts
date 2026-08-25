import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin file tracing to this app so stray lockfiles in parent dirs don't
  // trigger the multi-lockfile workspace-root warning.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
