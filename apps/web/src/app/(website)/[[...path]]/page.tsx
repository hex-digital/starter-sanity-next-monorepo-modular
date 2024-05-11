import { usePageResolver } from '@/hooks/usePageResolver';

export default function DynamicRoute({ params }: { params: { path: string[] | undefined } }) {
  const path = params.path ?? ['']; // Homepage has undefined for `params.path`

  const { PageComponent } = usePageResolver({ path: path });

  return (
    <PageComponent path={path} />
  )
}
