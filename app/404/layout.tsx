import { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: '404 Page Not Found',
  description: 'Sorry, the page does not exist',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
