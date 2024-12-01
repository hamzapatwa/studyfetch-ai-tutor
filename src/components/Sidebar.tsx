/*
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

*/



// components/Sidebar.tsx
/* } from '@/src/lib/prisma';
import SidebarContent from './SidebarContent';

interface FlashcardSet {
  id: string;
  topic: string;
}

export default async function Sidebar() {
  const flashcardSets: FlashcardSet[] = await prisma.flashcardSet.findMany({
    include: {
      flashcards: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <SidebarContent flashcardSets={flashcardSets} />;
}

*/

// components/Sidebar.tsx

import { prisma } from '@/src/lib/prisma';
import SidebarContent from './SidebarContent';

interface FlashcardSet {
  id: string;
  topic: string;
}

export default async function Sidebar() {
  const flashcardSets: FlashcardSet[] = await prisma.flashcardSet.findMany({
    include: {
      flashcards: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <SidebarContent flashcardSets={flashcardSets} />; {/* Removed onCreateNewSet prop */}
}