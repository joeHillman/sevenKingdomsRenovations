import type { CollectionConfig, Payload } from 'payload'
import payload from 'payload';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrSelf } from '@/access/isAdminOrSelf';

// const determineAvailability = async( payload: Payload ) => {
//   // console.log(payload, 'PL')
//   const isAvailable = await payload.find({
//     collection: 'enabledFeatures'
//   })
//   console.log(isAvailable, 'IS AVIL TEAMS')
//   return isAvailable;
// };

// try a relation to field and use that to hide, it's already built in...
// or a custom endpoint https://payloadcms.com/docs/rest-api/overview#custom-endpoints
// who logs into admin panel

// we also need a share module component for launch...

console.log(payload, 'COLLLS')

export const Teams: CollectionConfig = {
  slug: 'teams',
  admin: {
    description: 'Designed for large projects with multiple roles, trades, etc...',
    // try a relationship field it's already built in
    // hidden: () => {console.log(payload.find({collection:'users'}), 'PL')},
  },
  fields: [
    {
      name: 'pageMeta', // required
      type: 'group', // required
      interfaceName: 'Meta', // optional
      fields: [
        // required
        {
          name: 'title',
          type: 'text',
          required: true,
          minLength: 20,
          maxLength: 100,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          minLength: 40,
          maxLength: 160,
        },
      ],
    },
  ],
}
