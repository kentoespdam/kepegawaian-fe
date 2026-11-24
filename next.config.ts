import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	allowedDevOrigins: ["localhost", "192.168.1.211", "192.168.230.88"],
};

export default nextConfig;
