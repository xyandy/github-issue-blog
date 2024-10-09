import { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'archeives',
  description: 'archeives',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
