/** @type {import('next').NextConfig} */
const nextConfig = {
	"plugins": ["@trivago/prettier-plugin-sort-imports"], 
	env: {
		NEST_PUBLIC_API_URL: 'https://messenger-elhy.onrender.com/api',
	},
};

export default nextConfig;
