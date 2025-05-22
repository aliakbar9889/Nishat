// sanity/lib/live.ts
import { defineLive } from 'next-sanity';
import { client } from './client';

export const { sanityFetch, SanityLive } = defineLive({
  client,
});