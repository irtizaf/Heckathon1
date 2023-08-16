/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
		domains: ['cdn.sanity.io', 'images.unsplash.com', "daisyui.com", "full-stack-ecommerce-clothing-web.vercel.app"]
	},
	experimental: {
		serverActions: true,
	  },
}

module.exports = nextConfig
