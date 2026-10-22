import type { Metadata } from "next";

// The share-preview card (src/app/opengraph-image.jpg), restated per page because
// a page's own openGraph object replaces the one it would otherwise inherit.
const SHARE_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Zack Abasi, Syrian-Irish composer, guitarist and oud player, holding his Fender Stratocaster",
};

// Per-page title, description, canonical URL and share preview. Next.js replaces
// (rather than merges) openGraph/twitter objects, so each page restates the shared parts.
export function pageMetadata({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const fullTitle = title ? `${title} | Zack Abasi` : "Zack Abasi | Official Website";
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "Zack Abasi", locale: "en_IE", url: path, title: fullTitle, description, images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", creator: "@zackabasi", title: fullTitle, description, images: [SHARE_IMAGE] },
  };
}

export const SOCIAL_PROFILES = [
  "https://www.youtube.com/@ZackAbasi",
  "https://www.instagram.com/zackabasi/",
  "https://www.tiktok.com/@zackabasi",
  "https://www.facebook.com/ZackAbasi/",
  "https://x.com/zackabasi",
  "https://open.spotify.com/artist/7wbIpNH0nUn6fQ4qYyzR1J",
  "https://soundcloud.com/zack-abasi",
];
