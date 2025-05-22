import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/asset-utils'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

export { SanityImageSource };
