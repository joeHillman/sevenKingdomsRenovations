import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf } from '../access/isAdminOrSelf';

// who logs into admin panel
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'nameAsTitle',
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
      name: 'nameAsTitle',
      label: 'User Name',
      type: 'text',
      admin: {
        placeholder: 'read below...',
        readOnly: true,
        description: 'This field is not editable and will autopopulate with the full name once it\'s been saved.',
        condition: (data) => {
          if (data?.personalInfo?.firstName && data?.personalInfo?.lastName) {
            
            const { firstName, lastName } = data.personalInfo;
            data.nameAsTitle = `${firstName} ${lastName}`;
            return true
          }
          else {
            data.nameAsTitle = null;
            return false }
        }
      },
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
              label: 'First Name',
              type: 'text',
              required: true,
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              required: true,
            },
            {
              name: 'nickname',
              label: 'Preferred Name',
              type: 'text',
            },
          ],
        },
        {
          name: 'clientServiceAddresses',
          label: 'Client Service Addresses',
          type: 'relationship',
          relationTo: 'serviceAddresses',
          admin: {
            allowCreate: false,
          },
          hasMany: true,
        },
        {
          name: 'contact',
          label: 'Contact',
          type: 'group',
          fields: [
            {
              name: 'generalContactPreference',
              label: 'General Contact Preference',
              type: 'radio',
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
              label: 'Email',
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
              label: 'Phone Number',
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
      ],
    },
    {
      name: 'avatar',
      label: 'Avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'associatedJobs',
      label: 'Associated Jobs',
      type: 'join',
      collection: 'jobs',
      on: 'jobIsFor',
    },
  ],
}
