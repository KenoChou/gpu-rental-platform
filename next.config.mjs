/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // 禁用图像优化
  },
  trailingSlash: true, // 保证 URL 以斜杠结尾
  output: 'export', // 启用静态导出
}

export default nextConfig;
