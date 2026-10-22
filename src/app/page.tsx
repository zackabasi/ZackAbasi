import fs from 'fs';
import path from 'path';
import { client } from '@/sanity/lib/client';
import { sizedImage } from '@/sanity/lib/image';
import type { SanityImageSource } from '@sanity/image-url';
import { streamUrl, SUNROSA_TRACKS } from '@/lib/streams';
import { pageMetadata, SOCIAL_PROFILES } from '@/lib/seo';
import HomeClient from './HomeClient';

export const revalidate = 60; // Fetch fresh data every 60 seconds

export const metadata = pageMetadata({
  description: "Zack Abasi, Syrian-Irish composer, guitarist and oud player. Listen to his debut EP Sunrosa and music featured on NBC, RTL 4, NPO, VOX and RTÉ Radio 1.",
  path: "/",
});

// Facts for search engines (schema.org), matching what the site already says.
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zack Abasi",
  url: "https://www.zackabasi.com",
  image: "https://www.zackabasi.com/hero-photo.webp",
  jobTitle: "Composer and guitarist",
  description: "Syrian-Irish composer, guitarist and oud player, born in Latakia, Syria, and based in Ireland.",
  sameAs: SOCIAL_PROFILES,
};

// Broadcaster name (for alt text) and where each "Music featured on" logo links to.
const FEATURED: Record<string, { name: string; link: string }> = {
  "NBC.webp": { name: "NBC", link: "https://www.youtube.com/watch?v=Mel60mMbIRE" },
  "Nelonen.webp": { name: "Nelonen", link: "https://www.youtube.com/watch?v=-40eUgBRI-M" },
  "RTL4.webp": { name: "RTL 4", link: "https://www.youtube.com/watch?v=MfH6QhcHB7g" },
  "alarabiya.webp": { name: "Al Arabiya", link: "https://www.youtube.com/watch?v=7YHf04P0Y-w" },
  "NPO.svg.webp": { name: "NPO", link: "https://www.youtube.com/watch?v=OOvciIVDtcs" },
  "VOX.webp": { name: "VOX", link: "https://www.youtube.com/watch?v=Lve26UZCTfE" },
  "rte.svg.webp": { name: "RTÉ Radio 1", link: "https://www.tiktok.com/@zackabasi/video/7587822614966455574" }
};

const FALLBACK_PROJECT_CATEGORIES = [
  {
    categoryTitle: "BMG Production Music",
    projects: [
      {
        title: "Desert Lyre",
        image: "/BMG Production Music/Desert lyre.webp",
        link: "https://bmgproductionmusic.com/en-ie/album/desert-lyre-mystics-of-mesopotamia-mid-east-duets/1636c3f511e96dc2"
      },
      {
        title: "Solo Oud Taksims",
        image: "/BMG Production Music/Solo oud.webp",
        link: "https://w.bmg.com/gakcz"
      },
      {
        title: "Solo Arabian Electric guitar",
        image: "/BMG Production Music/Solo electric guitar.webp",
        link: "https://w.bmg.com/f8u1u"
      }
    ]
  }
];

const FALLBACK_TESTIMONIAL_VIDEO = "https://www.youtube.com/watch?v=nQlG1gHWNWE";

export default async function Home() {
  // 1. Fetch Logos Locally (can be moved to CMS later if needed)
  const logosDir = path.join(process.cwd(), 'public', 'music featured on');
  let logos: { src: string; link: string; name: string }[] = [];
  try {
    if (fs.existsSync(logosDir)) {
      const files = fs.readdirSync(logosDir);
      logos = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
        .map(file => ({
          src: `/music featured on/${file}`,
          link: FEATURED[file]?.link || "#",
          name: FEATURED[file]?.name || "Broadcaster"
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
          image: p.image ? sizedImage(p.image, 800) : '/logo.png',
          link: p.link
        }))
      }));
    }
  } catch (error) {
    console.error("Error fetching projects", error);
  }

  // 3. Fetch the testimonial video from Sanity
  let testimonialVideo = FALLBACK_TESTIMONIAL_VIDEO;
  try {
    const tData = await client.fetch(`*[_type == "testimonial"][0] { videoUrl }`);
    if (tData?.videoUrl) {
      testimonialVideo = tData.videoUrl;
    }
  } catch (error) {
    console.error("Error fetching testimonial", error);
  }

  // 4. Fetch the latest release from Sanity, so "Play Latest Release" queues the whole EP
  let latestTracks = SUNROSA_TRACKS;
  try {
    const rQuery = `*[_type == "release"] | order(_createdAt desc)[0] {
      coverImage,
      tracks[]->{
        _id,
        title,
        artist,
        "audioUrl": audioFile.asset->url,
        "audioRef": audioFile.asset._ref,
        coverImage
      }
    }`;
    type ReleaseTrack = { _id: string; title: string; artist?: string; audioUrl?: string; audioRef?: string; coverImage?: SanityImageSource };
    const rData: { coverImage?: SanityImageSource; tracks?: ReleaseTrack[] } | null = await client.fetch(rQuery);
    if (rData && rData.tracks && rData.tracks.length > 0) {
      latestTracks = rData.tracks.map((track) => ({
        id: track._id,
        title: track.title,
        artist: track.artist || 'Zack Abasi',
        url: streamUrl(track.audioRef, track.audioUrl),
        coverUrl: track.coverImage ? sizedImage(track.coverImage, 160) : (rData.coverImage ? sizedImage(rData.coverImage, 160) : '/logo.png'),
        artworkUrl: track.coverImage ? sizedImage(track.coverImage, 512) : (rData.coverImage ? sizedImage(rData.coverImage, 512) : undefined)
      }));
    }
  } catch (error) {
    console.error("Error fetching latest release", error);
  }

  // Apply Fallbacks
  const finalProjectCategories = projectCategories.length > 0 ? projectCategories : FALLBACK_PROJECT_CATEGORIES;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD).replace(/</g, '\\u003c') }}
      />
      <HomeClient
        featuredLogos={logos}
        projectCategories={finalProjectCategories}
        testimonialVideo={testimonialVideo}
        latestTracks={latestTracks}
      />
    </>
  );
}
