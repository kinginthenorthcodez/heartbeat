import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set turbopack.root to silence the workspace-root inference warning when multiple
  // lockfiles are present. This points Turbopack to this package as the workspace root.
  // If you later move the project, adjust this path accordingly.
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
