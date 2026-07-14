import { DocsContent, getDocsMetadata } from '@/components/docs-content';
import { source } from '@/lib/source';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

function getPage() {
  return source.getPages().find((page) => page.url === '/how-to');
}

export default function Page() {
  const page = getPage();
  if (!page) notFound();
  return <DocsContent page={page} />;
}

export function generateMetadata(): Metadata {
  const page = getPage();
  if (!page) notFound();
  return getDocsMetadata(page);
}
