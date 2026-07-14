import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

function MdxImage({ alt = '', className, ...props }: ComponentProps<'img'>) {
  return (
    // Migrated images do not have dimensions in their MDX, so Next Image
    // cannot render them. Keep them responsive while preserving native sizing.
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={alt} className={`h-auto max-w-full rounded-lg ${className ?? ''}`} loading="lazy" />
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: MdxImage,
    Accordion,
    Accordions,
    ...components,
  } satisfies MDXComponents;
}
export const useMDXComponents = getMDXComponents;
declare global { type MDXProvidedComponents = ReturnType<typeof getMDXComponents>; }
