/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    interactions: Interaction;
    jobs: Job;
    media: Media;
    teams: Team;
    gallery: Gallery;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {
    users: {
      associatedJobs: 'jobs';
    };
    jobs: {
      associatedPhotos: 'media';
    };
    media: {
      associatedInteractions: 'interactions';
    };
  };
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    interactions: InteractionsSelect<false> | InteractionsSelect<true>;
    jobs: JobsSelect<false> | JobsSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    teams: TeamsSelect<false> | TeamsSelect<true>;
    gallery: GallerySelect<false> | GallerySelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    shareables: Shareable;
  };
  globalsSelect: {
    shareables: ShareablesSelect<false> | ShareablesSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  roles?: ('superAdmin' | 'admin' | 'client')[] | null;
  avatar?: (string | null) | Media;
  associatedJobs?: {
    docs?: (string | Job)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  sessions?:
    | {
        id: string;
        createdAt?: string | null;
        expiresAt: string;
      }[]
    | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  forGallery?: boolean | null;
  coverImage?: boolean | null;
  /**
   * Process is for a walkthru, demonstration is for a presentation. Job site is for job image, example is for info from client.
   */
  typeOf?: ('before' | 'working' | 'after' | 'process' | 'demonstration' | 'avatar' | 'jobSite' | 'example') | null;
  alt: string;
  'Photo is for'?: (string | null) | Job;
  associatedInteractions?: {
    docs?: (string | Interaction)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "jobs".
 */
export interface Job {
  title?: string | null;
  id: string;
  address?: string | null;
  status?: ('pending' | 'scheduled' | 'inProgress' | 'onHold' | 'canceled') | null;
  scheduledFor?: string | null;
  reasonForHold?: string | null;
  reasonForCancel?: string | null;
  'Job is for'?: (string | null) | User;
  associatedPhotos?: {
    docs?: (string | Media)[];
    hasNextPage?: boolean;
    totalDocs?: number;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "interactions".
 */
export interface Interaction {
  id: string;
  /**
   * Feedback is visble to the boss and testimonial is visible to the public, after approval.
   */
  'type of'?: ('feedback' | 'testimonial') | null;
  status?: ('new' | 'submitted' | 'approved') | null;
  content?: string | null;
  'Is for'?: (string | null) | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * Designed for large projects with multiple roles, trades, etc...
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "teams".
 */
export interface Team {
  id: string;
  pageMeta: Meta;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Meta".
 */
export interface Meta {
  title: string;
  description: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gallery".
 */
export interface Gallery {
  id: string;
  gallery?:
    | {
        title?: string | null;
        image: (string | Media)[];
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'interactions';
        value: string | Interaction;
      } | null)
    | ({
        relationTo: 'jobs';
        value: string | Job;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'teams';
        value: string | Team;
      } | null)
    | ({
        relationTo: 'gallery';
        value: string | Gallery;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  roles?: T;
  avatar?: T;
  associatedJobs?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
  sessions?:
    | T
    | {
        id?: T;
        createdAt?: T;
        expiresAt?: T;
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "interactions_select".
 */
export interface InteractionsSelect<T extends boolean = true> {
  'type of'?: T;
  status?: T;
  content?: T;
  'Is for'?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "jobs_select".
 */
export interface JobsSelect<T extends boolean = true> {
  title?: T;
  id?: T;
  address?: T;
  status?: T;
  scheduledFor?: T;
  reasonForHold?: T;
  reasonForCancel?: T;
  'Job is for'?: T;
  associatedPhotos?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  forGallery?: T;
  coverImage?: T;
  typeOf?: T;
  alt?: T;
  'Photo is for'?: T;
  associatedInteractions?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        card?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        tablet?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "teams_select".
 */
export interface TeamsSelect<T extends boolean = true> {
  pageMeta?: T | MetaSelect<T>;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Meta_select".
 */
export interface MetaSelect<T extends boolean = true> {
  title?: T;
  description?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "gallery_select".
 */
export interface GallerySelect<T extends boolean = true> {
  gallery?:
    | T
    | {
        title?: T;
        image?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "shareables".
 */
export interface Shareable {
  id: string;
  email?: string | null;
  phone?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  pinterest?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "shareables_select".
 */
export interface ShareablesSelect<T extends boolean = true> {
  email?: T;
  phone?: T;
  facebook?: T;
  instagram?: T;
  pinterest?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}