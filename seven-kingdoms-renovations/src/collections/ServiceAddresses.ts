import type { CollectionConfig } from 'payload';

export const ServiceAddresses: CollectionConfig = {
  slug: 'serviceAddresses',
  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: 'title'
  }, 
  // TODO: there can only be one cover image
  // bulk upload works
  // media could use further organization, like dealing with pikies, this will get messy!

  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (data) => {
          if (data?.address?.streetAddress1 && data?.address?.city && data?.address?.state) {
            const { streetAddress1, city, state } = data.address;
            data.title = `${streetAddress1}, ${city}, ${state}`;
            return true
          }
          else {
            data.title = null;
            return false }
        }
      },
    },
    {
      name: 'address',
      label: 'Full Address',
      type: 'group',
      fields: [
        {
          name: 'streetAddress1',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          name: 'postalCode',
          type: 'text',
          required: false,
        },
      ],
    },
  ]
}