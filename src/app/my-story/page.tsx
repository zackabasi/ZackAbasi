import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import MyStoryClient from './MyStoryClient';

export const revalidate = 60;

export default async function MyStoryPage() {
  let biography = null;

  try {
    const query = `*[_type == "biography"][0] { header, coverImage, content }`;
    const data = await client.fetch(query);
    if (data) {
      biography = {
        header: data.header,
        coverImage: data.coverImage ? urlFor(data.coverImage).url() : null,
        content: data.content
      };
    }
  } catch (error) {
    console.error("Sanity error on biography", error);
  }

  return <MyStoryClient biography={biography} />;
}
