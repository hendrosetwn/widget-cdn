import '@assets/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ContainerProvider from '@components/provider';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: {
    default: 'Widget Client | BERIJALAN',
    template: '%s | BERIJALAN',
  },
  description: 'Telephony Management System',
  icons: [{ url: '/favicon.ico' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body>
        <main className={inter.className}>
          <ContainerProvider>{children}</ContainerProvider>
        </main>
      </body>
    </html>
  );
}
