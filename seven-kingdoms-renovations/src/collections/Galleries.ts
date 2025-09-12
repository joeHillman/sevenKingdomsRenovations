import type { CollectionConfig } from 'payload';
import { GalleryBlock } from '../blocks/GalleryBlock/config';

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  access: {
    read: () => true,
  },
  // TODO: there can only be one cover image
  // bulk upload works
  // media could use further organization, like dealing with pikies, this will get messy!

  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        GalleryBlock,
      ]
    },
  ]
}