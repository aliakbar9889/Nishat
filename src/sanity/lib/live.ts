import { defineLive } from 'next-sanity';
import { client } from './client';
import type { SanityClient } from '@sanity/client'; // Explicit type import

export const { sanityFetch, SanityLive } = defineLive({
  client: client as SanityClient, // Type casting
});