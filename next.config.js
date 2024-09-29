/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/authentication/login', // Thay thế bằng trang bạn muốn
        permanent: true, // Nếu bạn muốn redirect này là vĩnh viễn
      },
    ];
  },
  
};

module.exports = nextConfig;
