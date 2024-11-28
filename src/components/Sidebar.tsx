// components/Sidebar.tsx
/*

import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'


export default async function Sidebar() {
  const flashcardSets = await prisma.flashcardSet.findMany()

  return (
    <div className="w-64 h-screen bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Flashcard Sets</h2>
      <ul>
        {flashcardSets.map((set) => (
          <li key={set.id}>
            <Link href={`/flashcards/${set.id}`} className="text-blue-500">
              {set.topic}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

*/

/*
// Sidebar.tsx WORKINGGGGG
import Link from 'next/link';
import { prisma } from '@/src/lib/prisma'

export default function Sidebar({ flashcardSets }: { flashcardSets: any[] }) {
  
  return (
    <div className="w-64 h-screen bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Flashcard Sets</h2>
      <ul>
        {flashcardSets.length > 0 ? (
          flashcardSets.map((set) => (
            <li key={set.id}>
              <Link href={`/flashcards/${set.id}`} className="text-blue-500">
                {set.topic}
              </Link>
            </li>
          ))
        ) : (
          <li>No flashcard sets available.</li>
        )}
      </ul>
    </div>
  );
}
  */


/*
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent />
    </Sidebar>
  )
}

*/

// components/Sidebar.tsx

// components/Sidebar.tsx

// components/Sidebar.tsx

// components/Sidebar.tsx
// components/Sidebar.tsx

import { prisma } from '@/src/lib/prisma';
import SidebarContent from './SidebarContent';

interface FlashcardSet {
  id: string;
  topic: string;
}

interface SidebarProps {
  onCreateNewSet: (topic: string) => void;
}

export default async function Sidebar({ onCreateNewSet }: SidebarProps) {
  const flashcardSets: FlashcardSet[] = await prisma.flashcardSet.findMany({
    include: {
      flashcards: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <SidebarContent flashcardSets={flashcardSets} onCreateNewSet={onCreateNewSet} />;
}