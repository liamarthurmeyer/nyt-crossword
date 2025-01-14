import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "react-day-picker/dist/style.css";
import './globals.css';
import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NYT Mini Archive',
  description: 'Created by Liam Meyer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' ||
                    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

