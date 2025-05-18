import AppProviders from './providers'; // Import the new providers component
import '../index.css';
import '../App.css';

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
    <html lang="en">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
