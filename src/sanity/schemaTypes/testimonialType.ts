import { defineField, defineType } from 'sanity';

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote Text',
      description: 'Not shown on the website: the homepage shows the Larry Flick quote set in the site code. Ask for a code change to edit it.',
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
