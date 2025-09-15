import type { Block } from 'payload'

export const AddressBlock: Block = {
  slug: 'address',
  interfaceName: 'AddressBlock',

  fields: [
    {
      name: 'address',
      label: 'Address',
      type: 'group',
      fields: [
        {
          name: 'streetAddress1',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'postalCode',
          type: 'text',
        },
        {
          name: 'serviceAddy',
          type: 'relationship',
          relationTo: 'jobs',
          required: true,
        },
      ],
    },
  ],
}