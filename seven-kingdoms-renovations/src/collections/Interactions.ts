import type { CollectionConfig } from 'payload'

export const Interactions: CollectionConfig = {
  slug: 'interactions',
  access: {
    read: () => true,
  },

  // hooks: {
  //   beforeValidate: [({ data }) => {
  //     if(!data?.id || data?.id === 'NOID') {
  //       const customID = uuidv4();
  //       return { ...data, id: customID }
  //     }
  //   }]
  // },

  fields: [
    {
      name: 'type of',
      admin: {
        description: 'Feedback is visble to the boss and testimonial is visible to the public, after approval.'
      },
      type: 'select',
      options: [
        {
          label: 'Feedback (process photos)',
          value: 'feedback',
        },
        {
          label: 'Testimonial (completed photos)',
          value: 'testimonial',
        },
      ]
    },
        {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      //  can't yet find a way to disable or rm the new option
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'Submitted',
          value: 'submitted',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
      ],
    },
    {
      name: 'content',
      type: 'textarea',
      hooks: {
        beforeChange: [
          async (data) => {
            data.siblingData.status = 'submitted'
          }
        ]
      },
    },
    {
      name: 'Is for',
      type: 'relationship',
      relationTo: 'media',
      filterOptions: ({relationTo, siblingData}) => {
        console.log(siblingData)
        return true
      },
      // admin: {
      //   condition: ({relationTo}, data, siblingData) => {
      //     console.log(siblingData)
      //     return true
      //     // if(siblingData.data.options.value === 'before' || siblingData.data.options.value === 'working' || siblingData.data.options.value === 'after') { return true }
      //   },
      // },
    }
  ],
}
