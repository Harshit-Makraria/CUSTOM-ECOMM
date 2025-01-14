/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['jk0q5t4481.ufs.sh'],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery"
      },
    ],
  },
  experimental  :{
      ppr:""
  }
};

export default nextConfig;
