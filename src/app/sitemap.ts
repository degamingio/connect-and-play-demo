import { AppConfig } from '@/config/AppConfig';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${AppConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${AppConfig.url}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    },
    ...AppConfig.activeGames.map((game) => ({
      url: `${AppConfig.url}/game/${game.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as 'weekly', // Why
      priority: 0.8,
    })),
    {
      url: `${AppConfig.url}/rgs`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${AppConfig.url}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${AppConfig.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];
}
