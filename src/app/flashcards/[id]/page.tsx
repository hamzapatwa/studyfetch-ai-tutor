// app/flashcards/[id]/page.tsx

import { notFound } from 'next/navigation';
import { prisma } from '@/src/lib/prisma';
import { BookmarkIcon } from '@heroicons/react/24/solid';

interface FlashcardSet {
  id: string;
  topic: string;
  createdAt: Date; // Updated to Date
  flashcards: Flashcard[];
}

interface Flashcard {
  id: string;
  term: string;
  definition: string;
  setId: string;
}

interface FlashcardSetPageProps {
  params: {
    id: string;
  };
}

export default async function FlashcardSetPage({ params }: FlashcardSetPageProps) {
  const { id } = params;

  // Fetch the flashcard set by id
  const flashcardSet: FlashcardSet | null = await prisma.flashcardSet.findUnique({
    where: { id },
    include: { flashcards: true },
  });

  if (!flashcardSet) {
    notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{flashcardSet.topic}</h1>
      <ul>
        {flashcardSet.flashcards.map((card) => (
          <li key={card.id} className="mb-4">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{card.term}</h2>
              <p className="mt-2">{card.definition}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}