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
  // media could use further organization, like dealing with pikies, this will get messy!

  fields: [
    {
      name: 'galleryForServiceAddress',
      label: 'Gallery Is For Service Address',
      type: 'relationship',
      relationTo: 'serviceAddresses',
    },
    {
      name: 'galleryForJob',
      label: 'Gallery Is For Job',
      type: 'relationship',
      relationTo: 'jobs',
    },
    {
      name: 'caption',
      label: 'Gallery Caption',
      type: 'text',
    },
    {
      name: 'images',
      label: 'Gallery Images',
      type: 'group',
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