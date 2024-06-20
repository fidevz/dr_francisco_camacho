/** @type {import('next').NextConfig} */
import webpack from "webpack";

// WEB PACK PLUGINS
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import BrotliPlugin from "brotli-webpack-plugin";

const nextConfig = {
  basePath: process.env.BASE_PATH || "",
  assetPrefix: process.env.BASE_PATH || "",
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_SITE_TITLE:
      "Dra. Citlalli Zepeda - Cirugía y medicina estética en Zapopan",
    NEXT_PUBLIC_WHATSAPP_LINK:
      "https://api.whatsapp.com/send?phone=+523334554602&text=%C2%A1Hola%21%20quiero%20agendar%20una%20cita%20de%20valoraci%C3%B3n%20con%20la%20Dra.%20Citlalli%20Zepeda",
    NEXT_PUBLIC_PHONE: "+523334554602",
    NEXT_PUBLIC_WAPHONE: "+523334554602",
  },
  webpack: (config, { dev, isServer }) => {
    if (isServer || dev) {
      return config;
    }

    var isProduction = config.mode === "production";

    config.plugins.push(
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(isProduction),
      })
    );

    if (!isProduction) {
      return config;
    }

    config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));

    config.plugins.push(
      new BrotliPlugin({
        asset: "[path].br[query]",
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
      })
    );

    return config;
  },
};

export default nextConfig;
