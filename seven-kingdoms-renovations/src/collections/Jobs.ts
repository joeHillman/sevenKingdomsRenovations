import type { CollectionConfig, Field } from 'payload'
import sendEmail from 'payload'; 
import { v4 as uuidv4 } from 'uuid';

import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin';
import { isAdminOrSelf } from '@/access/isAdminOrSelf';

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'address'
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdmin,
    delete: isAdmin,
  },

  // user creation, welcome email
  // job update email
  // feedback to review email...
  hooks: {
    afterChange: [
      ({ doc, operation, req }) => {
        console.log(operation, 'OP')
        if(operation === 'create') {
          req.payload.sendEmail({
            to: 'joerhillman@gmail.com',
            subject: `${doc.address} has submitted a new job!`,
            text: `A new job has been created for ${doc.address}`
          })
        }

        if(operation === 'update') {
          req.payload.sendEmail({
            to: 'joerhillman@gmail.com',
            subject: `${doc.address} - Can still see framing around the door...`,
            text: 'If I were Cersei Lannister, I\'d have your head on a spike!',
          });
        }
      }
    ]
  },

  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'id',
      type: 'text',
      defaultValue: uuidv4(),
      required: true,
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Scheduled',
          value: 'scheduled',
        },
        {
          label: 'In Progress',
          value: 'inProgress',
        },
        {
          label: 'On Hold',
          value: 'onHold',
        },
        {
          label: 'Canceled',
          value: 'canceled',
        },
      ],
    },
    {
      name: 'scheduledFor',
      label: 'Scheduled For',
      type: 'date',
      admin: {
        condition: (data, siblingData, {user}) => {
          if(data.status === 'scheduled') { return true }
        }
      }
    },
    {
      name: `reasonForHold`,
      label: 'Reason for Hold',
      type: 'textarea',
      admin: {
        condition: (data, siblingData, { user }) => {
          if(data.status === 'onHold') { return true }
        },
      },
    },
    {
      name: `reasonForCancel`,
      label: 'Reason for Cancel',
      type: 'textarea',
      admin: {
        condition: (data, siblingData, { user }) => {
          if(data.status === 'canceled') { return true }
        },
      },
    },
    {
      name: 'Job is for',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'associatedPhotos',
      type: 'join',
      collection: 'media',
      on: 'Photo is for'
    }
  ],
  upload: false,
}
