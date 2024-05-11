import { defineField, defineType } from 'sanity';
import { FaRegImage } from 'react-icons/fa';
import { OBJECT } from '@pkg/config/sanity/schemaTypes';
import { IMAGE_FIT } from './constants';

export function defineImageObject() {
  return defineType({
    title: 'Image',
    name: OBJECT.IMAGE_WITH_ALT,
    type: 'image',
    options: {
      hotspot: true,
      aiAssist: {
        imageDescriptionField: 'alt', // See: https://www.sanity.io/docs/install-and-configure-sanity-ai-assist#a65bfa29260c
      },
    },
    icon: FaRegImage,
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alt text for screen-readers - leave blank if the image is purely decorative',
      }),
      defineField({
        name: 'fit',
        title: 'Image fit',
        type: 'string',
        description: 'Choose whether you want to crop or shrink images to fit them into their box on the website. If cropped, the image may lose some of the content on its sides. If it shrinks, the entire image will always be visible, but extra spacing may be added on its sides.',
        options: {
          list: [
            {
              title: 'Crop - may cut off edges',
              value:  IMAGE_FIT.COVER,
            },
            {
              title: 'Shrink - always see entire image',
              value:  IMAGE_FIT.CONTAIN,
            },
          ],
          layout: 'radio',
          direction: 'vertical',
        },
        initialValue: IMAGE_FIT.COVER,
      })
    ],
    preview: {
      select: {
        media: 'image',
        title: 'image.alt',
      },
    },
  });
}
