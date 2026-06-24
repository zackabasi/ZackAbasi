import { defineField, defineType } from 'sanity';

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube Embed URL',
      type: 'url',
    })
  ]
});
