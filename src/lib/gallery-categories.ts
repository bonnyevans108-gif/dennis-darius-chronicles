export const GALLERY_CATEGORIES = [
  'Portraits',
  'Events',
  'Weddings',
  'Fashion',
  'Street Photography',
  'Landscape / Nature',
  'Product Photography',
  'Architecture & Interiors',
  'Food Photography',
  'Lifestyle',
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
