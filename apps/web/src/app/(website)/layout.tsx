// import { Metadata } from 'next'
import { PropsWithChildren } from 'react';
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity'
import { revalidatePath, revalidateTag } from 'next/cache'
import { logger } from '@pkg/logger';

// @todo SEO data here
// export const metadata: Metadata = {}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main>{children}</main>
      {draftMode().isEnabled && (
        <VisualEditing
          refresh={
            async (payload) => {
              'use server'
              if (!draftMode().isEnabled) {
                logger.debug('Skipped manual refresh because draft mode is not enabled')
                return
              }

              if (payload.source === 'mutation') {
                if (payload.document.slug?.current) {
                  const tag = `${payload.document._type}:${payload.document.slug.current}`
                  logger.debug('Revalidate slug', tag)

                  revalidateTag(tag)
                }
                logger.debug('Revalidate tag', payload.document._type)

                return revalidateTag(payload.document._type)
              }

              revalidatePath('/', 'layout')
            }
          }
        />
      )}
    </>
  )
}
