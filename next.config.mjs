/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import withBundleAnalyzer from '@next/bundle-analyzer';
import withNextIntl from 'next-intl/plugin';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
export default bundleAnalyzer(
  withNextIntl()({
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'luckmedia.link',
          port: '',
          pathname: '/**',
        },
      ],
    },
    eslint: {
      dirs: ['.'],
      ignoreDuringBuilds: true,
    },
    poweredByHeader: false,
    basePath: '',
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: true,
    webpack: (config) => {
      // config.externals is needed to resolve the following errors:
      // Module not found: Can't resolve 'bufferutil'
      // Module not found: Can't resolve 'utf-8-validate'
      config.externals.push(
        {
          bufferutil: 'bufferutil',
          'utf-8-validate': 'utf-8-validate',
        },
        'pino-pretty',
      );

      return config;
    },
  }),
);
