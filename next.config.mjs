/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Multi-zone: waqf.im/chain serves the Waqf-M platform (dfordev1/Waqf-m),
    // which is built with basePath /chain so pages and assets stay namespaced.
    return [
      {
        source: "/chain",
        destination: "https://waqf-m.vercel.app/chain",
      },
      {
        source: "/chain/:path*",
        destination: "https://waqf-m.vercel.app/chain/:path*",
      },
    ];
  },
};
export default nextConfig;
