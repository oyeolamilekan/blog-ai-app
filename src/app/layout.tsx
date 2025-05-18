import AppProviders from './providers'; // Import the new providers component
import '../index.css';
import { ThemeProvider } from '@/contexts/ThemeContext'; // Import ThemeProvider

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'AI Blog Summarizer',
  description: 'Instantly extract key insights from any blog post',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> {/* The .light class will be applied here */}
      <body>
        <ThemeProvider>
          <AppProviders>
            {children}
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
