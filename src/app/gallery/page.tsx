import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import GalleryClient from './GalleryClient';
import fs from 'fs';
import path from 'path';

export const revalidate = 60; // revalidate every 60 seconds

export default async function GalleryPage() {
  let images: string[] = [];

  try {
    const query = `*[_type == "galleryImage"] | order(order asc) { image }`;
    const data = await client.fetch(query);
    images = data.map((item: any) => item.image ? urlFor(item.image).url() : null).filter(Boolean);
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
          .map(file => `/gallery/${file}`);
      }
    } catch (error) {}
  }

  return <GalleryClient images={images} />;
}
