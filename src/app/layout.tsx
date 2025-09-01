import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import UbuCursor from './UbuCursor';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SecurityBlocker } from "@/components/SecurityBlocker";

export const metadata: Metadata = {
  title: "Ujjwal's Ubuntu",
  description: 'A Web Ubuntu OS desktop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased select-none">
        <ThemeProvider>
          <SecurityBlocker />
          <UbuCursor />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}