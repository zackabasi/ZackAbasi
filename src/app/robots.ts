import type { MetadataRoute } from 'next'

// /studio is not blocked here on purpose: it already carries a noindex tag,
// and blocking it would stop search engines from seeing that tag.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.zackabasi.com/sitemap.xml',
  }
}
