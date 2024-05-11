import { Image, useClient } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';

export function urlFor(source: Image) {
  const client = useClient({ apiVersion: '2024-03-12' });

  const builder = imageUrlBuilder(client)

  return builder.image(source)
}
