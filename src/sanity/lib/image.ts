import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// A resized, browser-optimised copy (WebP/AVIF where supported) instead of the original upload.
export const sizedImage = (source: SanityImageSource, width: number) => {
  return urlFor(source).width(width).fit('max').auto('format').url()
}
