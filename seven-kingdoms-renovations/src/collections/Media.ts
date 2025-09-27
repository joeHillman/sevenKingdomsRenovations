import type { CollectionConfig } from 'payload'

const tagOptions = [
        {
          label: 'Bathroom',
          value: 'bathroom',
        },
        {
          label: 'Entryway',
          value: 'entryway',
        },
]

const typeOfOptions = [
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
      ]

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
      {
        name: 'caption',
        label: 'Image Caption',
        type: 'text',
      },
      {
        name: 'mediaTags',
        label: 'Media Tags',
        type: 'select',
        admin: {
          description: `Process is for a walkthru, demonstration is for a presentation. Job site is for job image, example is for info from client.`
        },
        hasMany: true,
        options: [...typeOfOptions, ...tagOptions],
      },
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
          description: 'For now, you\'ll need to manage a single one being selected.',
          condition: (data) => {
            if(data.forGallery) { return true }
            return false;
          }
        },
      },
    {
      name: 'typeOf',
      label: 'Type Of',
      type: 'select',
      admin: {
        description: `Process is for a walkthru, demonstration is for a presentation. Job site is for job image, example is for info from client.`
      },
      options: [...typeOfOptions],
    },
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
    {
      name: 'photoIsFor',
      label: 'Photo is for',
      type: 'relationship',
      relationTo: 'jobs',
    },
    // {
    //   name: 'associatedInteractions',
    //   label: 'Associated Interactions',
    //   type: 'join',
    //   collection: 'interactions',
    //   on: 'Is for',
    // },
  ],
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
