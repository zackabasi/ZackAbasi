// Compressed streaming copies (MP3, 192 kbps) of tracks whose CMS audio is a
// full studio master (WAV, 54–85 MB each). Keyed by the Sanity file asset id,
// so a newly uploaded file in the CMS is used as-is instead of being mismatched.
const STREAMS: Record<string, string> = {
  'file-0bfbc93fad1e76e57a280ce72acf8026ea8274e4-wav': '/Music/mediterranea.mp3',
  'file-bd373cc05b0cb63ca958e1b8b401bc320284bd3a-wav': '/Music/azura-mira.mp3',
  'file-d9373175b8abf3bfa3a9c67d68e188c0d269f992-wav': '/Music/sunrosa.mp3',
  'file-76fc09708756a89fef11d032542da5dcc61a6285-wav': '/Music/harissa-harisa.mp3',
  'file-cd40956d904321a94c74f41d9eca2c85bf9df6c3-wav': '/Music/alma-senor.mp3',
};

export function streamUrl(assetRef: string | undefined, cmsUrl: string | undefined): string {
  return (assetRef && STREAMS[assetRef]) || cmsUrl || '';
}

// The Sunrosa EP as served when the CMS can't be reached.
const SUNROSA_COVER = '/Music/Sunrosa EP artwork.webp';
export const SUNROSA_TRACKS = [
  { id: 'sunrosa-1', title: 'Mediterranea', file: 'mediterranea' },
  { id: 'sunrosa-2', title: 'Azura Mira', file: 'azura-mira' },
  { id: 'sunrosa-3', title: 'Sunrosa', file: 'sunrosa' },
  { id: 'sunrosa-4', title: 'Harissa Harisa', file: 'harissa-harisa' },
  { id: 'sunrosa-5', title: 'Alma Señor', file: 'alma-senor' },
].map(t => ({ id: t.id, title: t.title, artist: 'Zack Abasi', url: `/Music/${t.file}.mp3`, coverUrl: SUNROSA_COVER }));

export const SUNROSA_FALLBACK_RELEASE = {
  id: 'ep-sunrosa',
  title: 'Sunrosa',
  type: 'EP',
  coverUrl: SUNROSA_COVER,
  tracks: SUNROSA_TRACKS,
};
