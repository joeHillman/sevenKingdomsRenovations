import type { CollectionConfig, Field } from 'payload'
import sendEmail from 'payload'; 
import { v4 as uuidv4 } from 'uuid';

import { isAdmin, isAdminFieldLevel } from '@/access/isAdmin';
import { isAdminOrSelf } from '@/access/isAdminOrSelf';

const emailNotifierString = 'Emails or texts will be send when this value is saved.'

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
  // https://nodemailer.com/message
  // // to: client or admin // cc: client or admin
  // clientList, adminList
  // // need list of people to email
  hooks: {
    afterChange: [
      ({ doc, operation, req }) => {
        // need to tweak all the email routing...
        // // global email is the owner
        // // job owner or contact person // cc: owner
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
              subject: `The ${doc.title} job has been scheduled or rescheduled. `,
              text: `The ${doc.title} job has been scheduled or rescheduled for ${doc.scheduledFor}. ${doc?.specialInstructions && doc.specialInstructions}`,
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
      label: 'Title',
      type: 'text',
      admin: {
        description: 'This is how the job is displayed on your site.'
      },
    },
    {
      name: 'jobReminders',
      label: 'Reminders',
      type: 'textarea',
      defaultValue: 'No Reminders',
    },
    {
      name: 'jobIsFor',
      label: 'Job is For',
      type: 'relationship',
      admin: {
        description: 'The person who pays for the job and likely the contact person.'
      },
      required: true,
      relationTo: 'users',
    },
    {
      name: 'isPrimaryContact',
      label: 'Check if NOT the contact person.',
      type: 'checkbox',
    },
    {
      name: 'contactPerson',
      label: 'Conatct Person',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Use if the contact person is different than who is paying, otherwise leave it blank.',
        condition: (data) => {
          if(data.isPrimaryContact) {
            return true;
          } { return false }
       },
      },
    },
    {
      name: 'jobLocation',
      label: 'Job is located at',
      type: 'relationship',
      relationTo: 'serviceAddresses',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      admin: {
        description: emailNotifierString,
      },
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
        placeholder: 'Not Scheduled',
        description: emailNotifierString,
        date: {
          displayFormat: 'MMMM d yyy'
        },
      },
    },
    {
      name: 'specialInstructions',
      label: 'Special Instructions',
      type: 'text',
      admin: {
        condition: (data, siblingData, {user}) => {
          console.log(data, 'DATA')
          if(data.status !== 'pending') { return true }
          return false;
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
          return false;
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
          return false;
        },
      },
    },
    {
      name: 'associatedGalleries',
      label: 'Associated Galleries',
      type: 'join',
      collection: 'galleries',
      on: 'galleryForJob'
    },
    {
      name: 'associatedPhotos',
      label: 'Associated Photos',
      type: 'join',
      collection: 'media',
      on: 'photoIsFor',
    },
    {
      name: 'id',
      label: 'ID',
      type: 'text',
      admin: {
        readOnly: true,
      },
      defaultValue: uuidv4(),
      required: true,
    },
  ],
  upload: false,
}
