export const appName = 'PROCESIO Docs';
// Public origin. Next.js resolves relative metadata URLs (og:image,
// twitter:image, canonical) against it; without it a static export bakes in
// http://localhost:3000. Override with SITE_URL for a fork or another host.
export const siteUrl = process.env.SITE_URL ?? 'https://docs.procesio.com';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'PROCESIO',
  repo: 'ProcesioDocumentation',
  branch: 'main',
};
