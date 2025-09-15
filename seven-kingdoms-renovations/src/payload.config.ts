// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import sharp from 'sharp'

import { Galleries } from './collections/Galleries'
import { Interactions } from './collections/Interactions'
import { Jobs } from './collections/Jobs'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { ServiceAddresses } from './collections/ServiceAddresses'
import { Teams } from './collections/Teams'
import { Shareables } from './globals/Shareables';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Interactions, Jobs, Media, Teams, Galleries, ServiceAddresses],
  editor: lexicalEditor(),
  globals: [Shareables],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  email: nodemailerAdapter({
    defaultFromAddress: 'joerhillman@gmail.com',
    defaultFromName: '7 Kingdoms Renovations',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
