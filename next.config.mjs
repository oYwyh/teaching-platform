/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
    experimental: {
        serverComponentsExternalPackages: ["@node-rs/argon2"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: 'pub-8d4440ae8d494311af30a46850a7696e.r2.dev',
                port: '',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;