import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client'; // Explicit type import
import { projectId, dataset } from '../env'; // Adjust path as needed

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-05-21',
  useCdn: true, // Set to false for real-time data
});