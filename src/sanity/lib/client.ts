// sanity/lib/client.ts
import { createClient } from '@sanity/client';
import { projectId, dataset } from '../env'; // Adjust path to match your project structure

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-05-21',
  useCdn: true, // Set to false for real-time data
});