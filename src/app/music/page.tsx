import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import MusicClient from './MusicClient';

export const revalidate = 60; // revalidate every 60 seconds

const FALLBACK_RELEASES = [
  {
    id: "ep-sunrosa",
    title: "Sunrosa EP",
    type: "EP",
    coverUrl: "/Music/Sunrosa EP artwork.webp",
    tracks: [
      {
        id: "sunrosa-1",
        title: "Mediterranea",
        artist: "Zack Abasi",
        url: "/Music/Mediterranea - Zack Abasi.mp3",
        coverUrl: "/Music/Sunrosa EP artwork.webp"
      },
      {
        id: "sunrosa-2",
        title: "Harisa Harisa",
        artist: "Zack Abasi",
        url: "/Music/Harisa Harisa - Zack Abasi.mp3",
        coverUrl: "/Music/Sunrosa EP artwork.webp"
      },
      {
        id: "sunrosa-3",
        title: "Azura Mira",
        artist: "Zack Abasi",
        url: "/Music/Azura Mira - Zack Abasi.mp3",
        coverUrl: "/Music/Sunrosa EP artwork.webp"
      }
    ]
  }
];

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
      coverUrl: release.coverImage ? urlFor(release.coverImage).url() : '/logo.png',
      tracks: (release.tracks || []).map((track: any) => ({
        id: track._id,
        title: track.title,
        artist: track.artist || 'Zack Abasi',
        url: track.audioUrl,
        coverUrl: track.coverImage ? urlFor(track.coverImage).url() : (release.coverImage ? urlFor(release.coverImage).url() : '/logo.png')
      }))
    }));
  } catch (error) {
    console.error("Error fetching Sanity music", error);
  }

  // Use fallback if Sanity is empty
  const dataToPass = releases.length > 0 ? releases : FALLBACK_RELEASES;

  return <MusicClient releases={dataToPass} />;
}
