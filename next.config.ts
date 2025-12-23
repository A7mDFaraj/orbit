import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Disable Turbopack to avoid Windows symlink permission issues
  // Turbopack requires admin privileges for symlinks on Windows
  // Using standard webpack bundler instead
};

export default nextConfig;
