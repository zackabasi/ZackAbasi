import { client } from '@/sanity/lib/client';
import { sizedImage } from '@/sanity/lib/image';
import type { SanityImageSource } from '@sanity/image-url';
import { pageMetadata } from '@/lib/seo';
import GalleryClient from './GalleryClient';
import fs from 'fs';
import path from 'path';

export const revalidate = 60; // revalidate every 60 seconds

export const metadata = pageMetadata({
  title: "Gallery",
  description: "Photos of Zack Abasi on stage and in the studio, with electric guitar, acoustic guitar and oud.",
  path: "/gallery",
});

export default async function GalleryPage() {
  let images: { src: string; alt: string }[] = [];

  try {
    const query = `*[_type == "galleryImage"] | order(order asc) { image, title }`;
    const data: { image?: SanityImageSource; title?: string }[] = await client.fetch(query);
    images = data
      .filter((item): item is { image: SanityImageSource; title?: string } => Boolean(item.image))
      .map((item, idx) => ({
        src: sizedImage(item.image, 900),
        // CMS titles like "Image 1" aren't descriptions, so fall back to a plain one
        alt: item.title && !/^image \d+$/i.test(item.title) ? item.title : `Zack Abasi, photo ${idx + 1}`
      }));
  } catch (error) {
    console.error("Sanity error on gallery", error);
  }

  // If there's no data in Sanity yet, fallback to local so the site doesn't break
  if (images.length === 0) {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    try {
      if (fs.existsSync(galleryDir)) {
        const files = fs.readdirSync(galleryDir);
        images = files
          .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
          .map((file, idx) => ({ src: `/gallery/${file}`, alt: `Zack Abasi, photo ${idx + 1}` }));
      }
    } catch (error) {
      console.error("Error reading local gallery", error);
    }
  }

  return <GalleryClient images={images} />;
}
