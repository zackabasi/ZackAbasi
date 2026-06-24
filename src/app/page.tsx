import fs from 'fs';
import path from 'path';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import HomeClient from './HomeClient';

export const revalidate = 60; // Fetch fresh data every 60 seconds

const URL_MAPPING: Record<string, string> = {
  "NBC.webp": "https://www.youtube.com/watch?v=Mel60mMbIRE",
  "Nelonen.webp": "https://www.youtube.com/watch?v=-40eUgBRI-M",
  "RTL4.webp": "https://www.youtube.com/watch?v=MfH6QhcHB7g",
  "alarabiya.webp": "https://www.youtube.com/watch?v=7YHf04P0Y-w",
  "NPO.svg.webp": "https://studio.youtube.com/video/OOvciIVDtcs/edit",
  "VOX.webp": "https://studio.youtube.com/video/Lve26UZCTfE/edit",
  "rte.svg.webp": "https://www.tiktok.com/@zackabasi/video/7587822614966455574"
};

const FALLBACK_PROJECT_CATEGORIES = [
  {
    categoryTitle: "BMG Production Music",
    projects: [
      {
        title: "Desert Lyre",
        image: "/BMG Production Music/Desert lyre.webp",
        link: "https://bmgproductionmusic.com/en-ie/album/desert-lyre-mystics-of-mesopotamia-mid-east-duets/1636c3f511e96dc2?albumSortOrder=ReleaseDate_Desc&from=undefined"
      },
      {
        title: "Solo Oud Taksims",
        image: "/BMG Production Music/Solo oud.webp",
        link: "http://w.bmg.com/gakcz"
      },
      {
        title: "Solo Arabian Electric guitar",
        image: "/BMG Production Music/Solo electric guitar.webp",
        link: "http://w.bmg.com/f8u1u"
      }
    ]
  }
];

const FALLBACK_TESTIMONIAL = {
  quote: "Here’s what the legendary music journalist, Larry Flick, had to say about my song Alma Señor. In these challenging times, it’s a refreshing tune that can uplift your spirit. Give it a listen ☀️",
  videoUrl: "https://www.youtube.com/watch?v=nQlG1gHWNWE"
};

const FALLBACK_LATEST_TRACK = {
  id: "sunrosa-1",
  title: "Mediterranea",
  artist: "Zack Abasi",
  url: "/Music/Mediterranea - Zack Abasi.mp3",
  coverUrl: "/Music/Sunrosa EP artwork.webp"
};

export default async function Home() {
  // 1. Fetch Logos Locally (can be moved to CMS later if needed)
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
    console.error("Error reading featured logos", error);
  }

  // 2. Fetch Projects from Sanity
  let projectCategories = [];
  try {
    const pQuery = `*[_type == "projectCategory"] | order(order asc) {
      categoryTitle,
      projects[] {
        title,
        image,
        link
      }
    }`;
    const pData = await client.fetch(pQuery);
    if (pData && pData.length > 0) {
      projectCategories = pData.map((category: any) => ({
        categoryTitle: category.categoryTitle || 'Featured Projects',
        projects: (category.projects || []).map((p: any) => ({
          title: p.title,
          image: p.image ? urlFor(p.image).url() : '/logo.png',
          link: p.link
        }))
      }));
    }
  } catch (error) {
    console.error("Error fetching projects", error);
  }

  // 3. Fetch Testimonial from Sanity
  let testimonial = null;
  try {
    const tQuery = `*[_type == "testimonial"][0] { quote, videoUrl }`;
    const tData = await client.fetch(tQuery);
    if (tData) {
      testimonial = tData;
    }
  } catch (error) {
    console.error("Error fetching testimonial", error);
  }

  // 4. Fetch Latest Track from Sanity
  let latestTrack = null;
  try {
    const rQuery = `*[_type == "release"] | order(_createdAt desc)[0] {
      coverImage,
      tracks[]->{
        _id,
        title,
        artist,
        "audioUrl": audioFile.asset->url,
        coverImage
      }
    }`;
    const rData = await client.fetch(rQuery);
    if (rData && rData.tracks && rData.tracks.length > 0) {
      const track = rData.tracks[0];
      latestTrack = {
        id: track._id,
        title: track.title,
        artist: track.artist || 'Zack Abasi',
        url: track.audioUrl,
        coverUrl: track.coverImage ? urlFor(track.coverImage).url() : (rData.coverImage ? urlFor(rData.coverImage).url() : '/logo.png')
      };
    }
  } catch (error) {
    console.error("Error fetching latest release", error);
  }

  // Apply Fallbacks
  const finalProjectCategories = projectCategories.length > 0 ? projectCategories : FALLBACK_PROJECT_CATEGORIES;
  const finalTestimonial = testimonial || FALLBACK_TESTIMONIAL;
  const finalLatestTrack = latestTrack || FALLBACK_LATEST_TRACK;

  return (
    <HomeClient 
      featuredLogos={logos} 
      projectCategories={finalProjectCategories}
      testimonial={finalTestimonial}
      latestTrack={finalLatestTrack}
    />
  );
}
