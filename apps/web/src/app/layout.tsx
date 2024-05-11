import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sanity Nextjs Monorepo',
  description: 'Starter Kit',
};

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
});

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={sora.variable}>
    <body>{children}</body>
    </html>
  );
}
