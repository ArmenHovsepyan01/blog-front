/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', "cloudinary-marketing-res.cloudinary.com"]
    },
    pageExtensions: ['ts', 'tsx'],
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: 'http://localhost:5000/:path*'
            }
        ];
    }
};

export default nextConfig;
