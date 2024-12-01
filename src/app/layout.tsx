
// layout.tsx
/*
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
  */

'use client'; // Ensure the layout is a client component

import './globals.css';
import { FlashcardProvider } from '../context/FlashcardContext';
import FlashcardOverlay from '../components/FlashcardOverlay';

console.log('FlashcardProvider:', FlashcardProvider); // Should log the function
console.log('FlashcardOverlay:', FlashcardOverlay); // Should log the component

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FlashcardProvider>
          {children}
          <FlashcardOverlay />
        </FlashcardProvider>
      </body>
    </html>
  );
}