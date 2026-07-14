import { source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

const HIDDEN = ['/docs/crash-course', '/docs/appsumo', '/docs/etransport-hub'];

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      tabMode="top"
      tabs={{ transform: (option) => (HIDDEN.some((h) => option.url.startsWith(h)) ? null : option) }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
