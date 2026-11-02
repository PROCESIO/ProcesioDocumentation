import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import type { Metadata } from 'next';
import { siteUrl } from '@/lib/shared';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'PROCESIO Docs',
  icons: { icon: '/favicon.png' },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
