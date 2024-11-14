/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

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
