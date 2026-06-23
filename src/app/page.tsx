import fs from 'fs';
import path from 'path';
import HomeClient from './HomeClient';

const URL_MAPPING: Record<string, string> = {
  "NBC.webp": "https://www.youtube.com/watch?v=Mel60mMbIRE",
  "Nelonen.webp": "https://www.youtube.com/watch?v=-40eUgBRI-M",
  "RTL4.webp": "https://www.youtube.com/watch?v=MfH6QhcHB7g",
  "alarabiya.webp": "https://www.youtube.com/watch?v=7YHf04P0Y-w",
  "NPO.svg.webp": "https://studio.youtube.com/video/OOvciIVDtcs/edit",
  "VOX.webp": "https://studio.youtube.com/video/Lve26UZCTfE/edit",
  "rte.svg.webp": "https://www.tiktok.com/@zackabasi/video/7587822614966455574"
};

export default function Home() {
  const logosDir = path.join(process.cwd(), 'public', 'music featured on');
  let logos: { src: string; link: string }[] = [];

  try {
    if (fs.existsSync(logosDir)) {
      const files = fs.readdirSync(logosDir);
      logos = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
        .map(file => ({
          src: `/music featured on/${file}`,
          link: URL_MAPPING[file] || "#"
        }));
    }
  } catch (error) {
    console.error("Error reading featured logos directory", error);
  }

  return <HomeClient featuredLogos={logos} />;
}
