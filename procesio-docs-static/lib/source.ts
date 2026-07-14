import { createElement } from 'react';
import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  url(slugs) {
    const [space, ...pageSlugs] = slugs;
    const legacySlug = pageSlugs.at(-1);

    // Preserve the public URLs used by the PROCESIO application and by the
    // original documentation site.
    if (space === 'platform-actions') {
      return legacySlug ? `/how-to/${legacySlug}` : '/how-to';
    }

    if (space === 'overview') {
      return legacySlug ? `/${legacySlug}` : '/overview';
    }

    return `${docsRoute}/${slugs.join('/')}`;
  },
  icon(icon) {
    if (icon) return createElement('span', { className: 'inline-block mr-1' }, icon);
  },
  plugins: [],
});

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
