import { AlertProvider } from '@/context/AlertContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import AppLayout from '../components/AppLayout';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ledger Live',
  description:
    'Securely manage your crypto assets with Ledger Live. View balances, send, receive, and stake your crypto all in one place.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <AlertProvider>
          <Toaster richColors position="top-center" />
          <AppLayout>{children}</AppLayout>
        </AlertProvider>
      </body>
    </html>
  );
}
