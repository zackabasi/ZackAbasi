import { defineField, defineType } from 'sanity';

export const biographyType = defineType({
  name: 'biography',
  title: 'My Story (Biography)',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Header Text',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 15
    })
  ]
});
