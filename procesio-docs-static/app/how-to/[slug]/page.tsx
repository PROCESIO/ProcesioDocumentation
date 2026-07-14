import { DocsContent, getDocsMetadata } from '@/components/docs-content';
import { source } from '@/lib/source';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

function getPage(slug: string) {
  return source.getPages().find((page) => page.url === `/how-to/${slug}`);
}

export default async function Page(props: PageProps<'/how-to/[slug]'>) {
  const { slug } = await props.params;
  const page = getPage(slug);
  if (!page) notFound();
  return <DocsContent page={page} />;
}

export function generateStaticParams() {
  return source
    .getPages()
    .filter((page) => page.url.startsWith('/how-to/'))
    .map((page) => ({ slug: page.url.slice('/how-to/'.length) }));
}

export async function generateMetadata(props: PageProps<'/how-to/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getPage(slug);
  if (!page) notFound();
  return getDocsMetadata(page);
}
