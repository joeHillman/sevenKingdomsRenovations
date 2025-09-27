import { GlobalConfig } from 'payload'
import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin';
import { isAdminOrSelf } from '@/access/isAdminOrSelf';
import { AddressBlock } from '@/blocks/AddressBlock/config';

export const Shareables: GlobalConfig = {
  slug: 'shareables',
  name: 'Shareables',
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      label: 'Contact Info',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'email',
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
        },
      ],
    },
    {
      label: 'Social Media',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'facebook',
          label: 'Facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          label: 'Instagram',
          type: 'text',
        },
        {
          name: 'pinterest',
          label: 'Pinterest',
          type: 'text',
        },
      ],
    },
  ]
}