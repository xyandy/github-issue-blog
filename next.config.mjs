/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default withNextIntl(nextConfig);
