import { client } from '@/sanity/lib/client';
import { sizedImage } from '@/sanity/lib/image';
import { pageMetadata } from '@/lib/seo';
import MyStoryClient from './MyStoryClient';

export const revalidate = 60;

export const metadata = pageMetadata({
  title: "My Story",
  description: "Zack Abasi was born in Latakia, Syria, beside ancient Ugarit, where the oldest known written music was found. This is his story.",
  path: "/my-story",
});

export default async function MyStoryPage() {
  let biography = null;

  try {
    const query = `*[_type == "biography"][0] { header, coverImage, content }`;
    const data = await client.fetch(query);
    if (data) {
      biography = {
        header: data.header,
        coverImage: data.coverImage ? sizedImage(data.coverImage, 1600) : null,
        content: data.content
      };
    }
  } catch (error) {
    console.error("Sanity error on biography", error);
  }

  return <MyStoryClient biography={biography} />;
}
