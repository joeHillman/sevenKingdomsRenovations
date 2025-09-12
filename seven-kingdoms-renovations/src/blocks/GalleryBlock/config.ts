import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',

  fields: [
    {
      name: 'galleryForJob',
      label: 'Gallery Is For Job',
      type: 'relationship',
      relationTo: 'jobs',
    },
    {
      name: 'images',
      type: 'group',
      label: 'Gallery Images',
      fields: [
        {
          name: 'imageArray',
          type: 'upload',
          hasMany: true,
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Gallery Caption',
        },
      ],
    },
  ],
}