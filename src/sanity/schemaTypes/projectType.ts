import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'projectCategory',
  title: 'Project Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryTitle',
      title: 'Category Title (e.g. BMG Production Music)',
      type: 'string',
    }),
    defineField({
      name: 'projects',
      title: 'Projects in this Category',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Project Title', type: 'string' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'link', title: 'External Link', type: 'url' },
          ]
        }
      ]
    }),
    defineField({
      name: 'order',
      title: 'Order (e.g. 1, 2, 3)',
      type: 'number',
    })
  ],
  orderings: [
    {
      title: 'Order Number',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
});
