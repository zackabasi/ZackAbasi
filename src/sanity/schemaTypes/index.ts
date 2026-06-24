import { type SchemaTypeDefinition } from 'sanity'
import { releaseType, trackType } from './releaseType'
import { projectType } from './projectType'
import { galleryType } from './galleryType'
import { biographyType } from './biographyType'
import { testimonialType } from './testimonialType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [releaseType, trackType, projectType, galleryType, biographyType, testimonialType],
}
