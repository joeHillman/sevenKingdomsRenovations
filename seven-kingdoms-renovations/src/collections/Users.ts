import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf } from '../access/isAdminOrSelf';

// who logs into admin panel
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // only admins can create users
    create: isAdmin,
    // admins can read all, but other logged in user can only read themselves
    read: isAdminOrSelf,
    // admins can update all, but other logged in user can update themselves
    update: isAdminOrSelf,
    // only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: 'roles',
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: 'select',
      hasMany: true,
      defaultValue: ['client'],
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: 'Super Admin',
          value: 'superAdmin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Client',
          value: 'client',
        },
      ]
    },
    {
      label: 'Profile Info',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'personalInfo',
          label: 'Personal',
          type: 'group',
          fields: [

            {
              name: 'firstName',
              type: 'text',
            },
            {
              name: 'lastName',
              type: 'text',
            },
            {
              name: 'nickname',
              type: 'text',
            },
          ],
        },
        {
          name: 'contact',
          label: 'Contact',
          type: 'group',
          fields: [
            {
              name: 'generalContactPreference',
              type: 'radio',
              admin: {
                description: 'You can override this at a job level.'
              },
              options: [
                {
                  label: 'Email',
                  value: 'email',
                },
                {
                  label: 'Cell',
                  value: 'cell',
                },
                {
                  label: 'Both',
                  value: 'both',
                },
              ],
            },
            {
              name: 'email',
              type: 'email',
              admin: {
                condition: (data) => {
                  if(data.contact.generalContactPreference === 'email' || data.contact.generalContactPreference === 'both') {
                    return true;
                  } { return false }
                },
              },
            },
            {
              name: 'number',
              type: 'number',
              admin: {
                condition: (data) => {
                  if(data.contact.generalContactPreference === 'cell' || data.contact.generalContactPreference === 'both') {
                    return true;
                  } { return false }
                },
              },
            },
            {
              name: 'areTextsOk',
              label: 'Are texts okay?',
              type: 'checkbox',
              admin: {
                condition: (data) => {
                  if (data.contact.generalContactPreference === 'cell' || data.contact.generalContactPreference === 'both') { return true }
                  else { return false }
                }
              },
            },
          ],
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
      ],
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'associatedJobs',
      type: 'join',
      collection: 'jobs',
      on: 'Job is for',
    },
  ],
}
