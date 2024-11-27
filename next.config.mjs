/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    additionalData: `
    @import "_variables";
    @import "_mixins";`,
  },
  reactStrictMode: false,
  images: {
    domains: ["sprint-fe-project.s3.ap-northeast-2.amazonaws.com"],
  },
};

export default nextConfig;
