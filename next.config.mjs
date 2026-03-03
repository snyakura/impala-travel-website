/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Tells Next.js to build a static site
  images: {
    unoptimized: true, // Required because GitHub Pages doesn't support Next.js image optimization
  },
  // If your URL is https://username.github.io/repo-name/ 
  // uncomment the line below and replace 'repo-name' with your actual repo name
  // basePath: '/impala-travel-website', 
};

export default nextConfig;