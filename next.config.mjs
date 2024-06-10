/** @type {import('next').NextConfig} */
const nextConfig = {
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
}

export default nextConfig
