import type { CollectionConfig } from 'payload';

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'galleryForJob'
  },
  
  // TODO: there can only be one cover image
  // bulk upload works
  // media could use further organization, like dealing with pikies, this will get messy!

  fields: [
    {
      name: 'galleryForJob',
      label: 'Gallery Is For Job',
      type: 'relationship',
      relationTo: 'jobs',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Gallery Caption',
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
      ],
    },
  ]
}