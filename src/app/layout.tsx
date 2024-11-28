// app/layout.tsx
/*
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import './globals.css'
import Sidebar from '@/src/components/Sidebar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar flashcardSets={[]}/>
          <div className="flex-1">{children}</div> 
        </div>
      </body>
    </html>
  )
}

*/

// layout.tsx

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}