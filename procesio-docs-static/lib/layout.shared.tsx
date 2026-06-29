import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img src="/logo-light.png" alt="PROCESIO" className="h-8 w-auto block dark:hidden" />
          <img src="/logo-dark.png" alt="PROCESIO" className="h-8 w-auto hidden dark:block" />
        </>
      ),
    },
  };
}
