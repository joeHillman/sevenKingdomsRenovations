import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
      {
        name: 'forGallery',
        label: 'For Gallery',
        type: 'checkbox',
        hooks: {
          afterRead: [
            async ({value, siblingData}) => {
              if(!value) {siblingData.coverImage = false}
            }
          ]
        },
      },
      {
        name: 'coverImage',
        label: 'Cover Image',
        type: 'checkbox',
        admin: {
          condition: (data) => {
            if(data.forGallery) { return true }
          }
        },
      },
    {
      label: 'Type Of',
      name: 'typeOf',
      type: 'select',
      admin: {
        description: `Process is for a walkthru, demonstration is for a presentation. Job site is for job image, example is for info from client.`
      },
      options: [
        {
          label: 'Before',
          value: 'before',
        },
        {
          label: 'Working',
          value: 'working',
        },
        {
          label: 'After',
          value: 'after',
        },
        {
          label: 'Process',
          value: 'process',
        },
        {
          label: 'Demonstration',
          value: 'demonstration',
        },
        {
          label: 'Avatar',
          value: 'avatar',
        },
        {
          label: 'Job Site',
          value: 'jobSite',
        },
        {
          label: 'Example',
          value: 'example',
        },
      ],
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'Photo is for',
      type: 'relationship',
      relationTo: 'jobs',
    },
    {
      name: 'associatedInteractions',
      type: 'join',
      collection: 'interactions',
      on: 'Is for',
      // admin: {
      //   condition: (data) => {
      //     if(data.options.value === 'before' || data.options.value === 'working' || data.options.value === 'after') { return true }
      //   },
      // },
    },
  ],
  // upload: true,
  // these are from payload docs, nothing set in stone
  upload: {
    displayPreview: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        // By specifying `undefined` or leaving a height undefined,
        // the image will be sized to a certain width,
        // but it will retain its original aspect ratio
        // and calculate a height automatically.
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  }
}
