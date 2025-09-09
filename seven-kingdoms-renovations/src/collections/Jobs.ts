import type { CollectionConfig, Field } from 'payload'
import sendEmail from 'payload'; 
import { v4 as uuidv4 } from 'uuid';

import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin';
import { isAdminOrSelf } from '@/access/isAdminOrSelf';

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  // need a better field name for this, it's link to the media
  admin: {
    useAsTitle: 'title'
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
          if(doc.status === 'scheduled') {
            req.payload.sendEmail({
              to: 'joerhillman@gmail.com',
              subject: `The ${doc.title} job has been scheduled. `,
              text: `The ${doc.title} job has been scheduled for ${doc.scheduledFor}. ${doc?.specialInstructions && doc.specialInstructions}`,
            });
          }
          if(doc.status === 'inProgress') {
            req.payload.sendEmail({
              to: 'joerhillman@gmail.com',
              subject: `The ${doc.title} job has been started. `,
              text: `This is just to let you know we've begun the job.`,
            });
          }
          if(doc.status === 'onHold') {
            req.payload.sendEmail({
              to: 'joerhillman@gmail.com',
              subject: `Apologies, the ${doc.title} job has been put on hold. `,
              text: `${doc.reasonForHold}`,
            });
          }
          if(doc.status === 'canceled') {
            req.payload.sendEmail({
              to: 'joerhillman@gmail.com',
              subject: `The ${doc.title} job has been canceled. `,
              text: `${doc.reasonForCancel}`,
            });
          }
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
        ],
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
      name: 'specialInstructions',
      label: 'Special Instructions',
      type: 'text',
      admin: {
        condition: (data, siblingData, {user}) => {
          if(data.status === 'scheduled') { return true }
        }
      },
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
