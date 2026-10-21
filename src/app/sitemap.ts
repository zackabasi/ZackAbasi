import type { MetadataRoute } from 'next'

const BASE = 'https://www.zackabasi.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/music`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/my-story`, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE}/gallery`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/contact`, changeFrequency: 'yearly', priority: 0.6 },
  ]
}
