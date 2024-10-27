/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.jamendo.com",
        port: "",
        pathname: "/v3.0/**",
      },
      {
        protocol: "https",
        hostname: "usercontent.jamendo.com",
      },
    ],
  },
};

export default nextConfig;
