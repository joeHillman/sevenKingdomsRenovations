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

  fields: [
    {
      name: 'displayTitle',
      label: 'Display Title',
      type: 'text',
      admin: {
        description: 'This will be the title displayed on the web page for this address.',
      }
    },
    // the full address wil populate when the address is filled in,
    // // address is required to save so this won't need a hook
    {
      name: 'fullAddress',
      label: 'Full Address',
      type: 'text',
      admin: {
        placeholder: 'read below...',
        readOnly: true,
        description: 'This field is not editable and will autopopulate with the address once it\'s been saved.',
        condition: (data) => {
          if (data?.address?.streetAddress1 && data?.address?.city && data?.address?.state && data?.address?.postalCode) {
            const apartmentString = ', Unit - '
            const { streetAddress1, city, state } = data.address;
            data.fullAddress = `${streetAddress1}, ${city}, ${state} ${data.address?.apartmentNumber ? apartmentString + data.address?.apartmentNumber : ''}`;
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
          label: 'Street Address',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          label: 'City',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          label: 'State',
          type: 'text',
          required: true,
        },
        {
          name: 'postalCode',
          label: 'Zip Code',
          type: 'text',
          required: true,
        },
        {
          name: 'apartmentNumber',
          label: 'Apartment or Unit Number',
          type: 'text'
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
