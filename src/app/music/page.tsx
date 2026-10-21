import { client } from '@/sanity/lib/client';
import { sizedImage } from '@/sanity/lib/image';
import { streamUrl, SUNROSA_FALLBACK_RELEASE } from '@/lib/streams';
import { pageMetadata } from '@/lib/seo';
import MusicClient from './MusicClient';

export const revalidate = 60; // revalidate every 60 seconds

export const metadata = pageMetadata({
  title: "Music",
  description: "Listen to Sunrosa, the debut instrumental EP by Zack Abasi: Mediterranea, Azura Mira, Sunrosa, Harissa Harisa and Alma Señor.",
  path: "/music",
});

export default async function MusicPage() {
  const query = `*[_type == "release"] | order(_createdAt desc) {
    _id,
    title,
    type,
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

  let releases = [];
  try {
    const sanityReleases = await client.fetch(query);
    releases = sanityReleases.map((release: any) => ({
      id: release._id,
      title: release.title,
      type: release.type,
      coverUrl: release.coverImage ? sizedImage(release.coverImage, 240) : '/logo.png',
      tracks: (release.tracks || []).map((track: any) => ({
        id: track._id,
        title: track.title,
        artist: track.artist || 'Zack Abasi',
        url: streamUrl(track.audioRef, track.audioUrl),
        coverUrl: track.coverImage ? sizedImage(track.coverImage, 160) : (release.coverImage ? sizedImage(release.coverImage, 160) : '/logo.png')
      }))
    }));
  } catch (error) {
    console.error("Error fetching Sanity music", error);
  }

  // Use fallback if Sanity is empty
  const dataToPass = releases.length > 0 ? releases : [SUNROSA_FALLBACK_RELEASE];

  return <MusicClient releases={dataToPass} />;
}
