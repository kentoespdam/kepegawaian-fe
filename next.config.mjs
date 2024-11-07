/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	experimental: {
		extensionAlias: {
			".js": [".tsx", ".ts", ".jsx", ".js"],
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "github.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	i18n: {
		locales: ["id_ID"],
		defaultLocale: "id_ID",
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.node$/,
			use: "node-loader",
		});
		config.resolve.alias.canvas = false;
		config.resolve.alias.encoding = false;
		config.resolve.fallback = {
			fs: false,
		};
		return config;
	},
};

export default nextConfig;
