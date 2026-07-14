import { DocsContent, getDocsMetadata } from '@/components/docs-content';
import { source } from '@/lib/source';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

function getPage(slug: string) {
  return source.getPages().find((page) => page.url === `/${slug}`);
}

export default async function Page(props: PageProps<'/[slug]'>) {
  const { slug } = await props.params;
  const page = getPage(slug);
  if (!page) notFound();
  return <DocsContent page={page} />;
}

export function generateStaticParams() {
  return source
    .getPages()
    .filter((page) => page.slugs[0] === 'overview')
    .map((page) => ({ slug: page.url.slice(1) }));
}

export async function generateMetadata(props: PageProps<'/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getPage(slug);
  if (!page) notFound();
  return getDocsMetadata(page);
}
