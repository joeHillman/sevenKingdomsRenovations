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
    // {
    //   name: 'firstName',
    //   type: 'text',
    // },
    // Email added by default
    // Add more fields as needed
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
    // {
    //   name: 'jobs',
    //   // Save this field to JWT so we can use from `req.user`
    //   saveToJWT: true,
    //   type: 'relationship',
    //   relationTo: 'jobs',
    //   hasMany: true,
    //   access: {
    //     // Only admins can create or update a value for this field
    //     create: isAdminFieldLevel,
    //     update: isAdminFieldLevel,
    //   },
    //   admin: {
    //     condition: ({ roles }) => roles && !roles.includes('admin'),
    //     description: 'This field sets which jobs that this user has access to.'
    //   }
    // }
  ],
}
