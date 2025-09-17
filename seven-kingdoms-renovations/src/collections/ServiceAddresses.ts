import type { CollectionConfig } from 'payload';

export const ServiceAddresses: CollectionConfig = {
  slug: 'serviceAddresses',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'fullAddress',
    description: 'You will require a service address for clients and jobs. You can view a total of things, like jobs or galleries for each service address.',
  }, 
  // TODO: there can only be one cover image
  // bulk upload works
  // media could use further organization, like dealing with pikies, this will get messy!

  fields: [
    {
      name: 'displayTitle',
      type: 'text',
      admin: {
        description: 'This will be the title displayed on the web page for this address.',
      }
    },
    {
      name: 'fullAddress',
      type: 'text',
      admin: {
        condition: (data) => {
          if (data?.address?.streetAddress1 && data?.address?.city && data?.address?.state) {
            const { streetAddress1, city, state } = data.address;
            data.fullAddress = `${streetAddress1}, ${city}, ${state}`;
            return true
          }
          else {
            data.fullAddress = null;
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
    {
      label: 'Associations',
      type: 'group',
      admin: {
        description: 'View associated people, jobs, and galleries with this service address.',
      },
      fields: [
        {
          name: 'associatedPeople',
          label: 'People',
          type: 'join',
          collection: 'users',
          on: 'clientServiceAddresses',
        },
        {
          name: 'associatedJobs',
          label: 'Jobs',
          type: 'join',
          collection: 'jobs',
          on: 'jobLocation',
        },
        {
          name: 'associatedGalleries',
          label: 'Galleries',
          type: 'join',
          collection: 'galleries',
          on: 'galleryForServiceAddress',
        },
      ]
    },
  ]
}