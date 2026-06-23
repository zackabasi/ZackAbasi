import fs from 'fs';
import path from 'path';
import GalleryClient from './GalleryClient';

export default function GalleryPage() {
  const galleryDir = path.join(process.cwd(), 'public', 'gallery');
  let images: string[] = [];

  try {
    if (fs.existsSync(galleryDir)) {
      const files = fs.readdirSync(galleryDir);
      // Filter for valid image formats
      images = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => `/gallery/${file}`);
    }
  } catch (error) {
    console.error("Error reading gallery directory", error);
  }

  // Pass dynamically loaded image paths to the Client Component
  return <GalleryClient images={images} />;
}
