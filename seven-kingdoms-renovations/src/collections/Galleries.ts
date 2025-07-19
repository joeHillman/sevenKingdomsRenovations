import type { CollectionConfig } from 'payload'

export const Galleries: CollectionConfig = {
  slug: 'gallery',
  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          hasMany: true,
        }
      ]
    }
  ]
}