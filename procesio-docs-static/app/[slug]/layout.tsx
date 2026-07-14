import { DocsShell } from '@/components/docs-shell';

export default function Layout({ children }: LayoutProps<'/[slug]'>) {
  return <DocsShell>{children}</DocsShell>;
}
