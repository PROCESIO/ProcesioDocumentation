import { DocsShell } from '@/components/docs-shell';

export default function Layout({ children }: LayoutProps<'/how-to'>) {
  return <DocsShell>{children}</DocsShell>;
}
