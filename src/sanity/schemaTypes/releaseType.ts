import { defineField, defineType } from 'sanity';

export const releaseType = defineType({
  name: 'release',
  title: 'Music Release (EP/Album)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type (e.g. EP, Single)',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tracks',
      title: 'Tracks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'track' }] }]
    })
  ]
});

export const trackType = defineType({
  name: 'track',
  title: 'Track',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File (MP3/WAV)',
      type: 'file',
      options: { accept: 'audio/*' }
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Optional)',
      type: 'image',
      options: { hotspot: true },
    })
  ]
});
