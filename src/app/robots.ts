import { AppConfig } from '@/config/AppConfig';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/account',
    },
    sitemap: `${AppConfig.url}/sitemap.xml`,
  };
}
