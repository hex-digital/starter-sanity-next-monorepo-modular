import groq from 'groq';
import { loadQuery } from '@/data/sanity/loadQuery';

type TempPagePayload = {
  _id: string
  _type: string
  pathname: string
}

export const TEMP_PAGE_QUERY = groq`*[pathname.current == $pathname][0]`

export async function loadPage(pathname: string) {
  // @todo(jamie@hexdigital.com): Should we be using loadQuery from react/sanity-loader?
  return loadQuery<TempPagePayload | null>({
    query: TEMP_PAGE_QUERY,
    params: { pathname },
  })
}
