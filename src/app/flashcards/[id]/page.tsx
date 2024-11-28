// app/flashcards/[id]/page.tsx
import { prisma } from '@/src/lib/prisma'
import FlashcardSetComponent from '@/src/components/FlashcardSetComponent'

export default async function FlashcardSetPage({ params }: { params: { id: string } }) {
  const flashcardSet = await prisma.flashcardSet.findUnique({
    where: { id: params.id },
    include: { flashcards: true },
  })

  if (!flashcardSet) {
    return <div>Flashcard set not found</div>
  }

  return <FlashcardSetComponent flashcards={flashcardSet.flashcards} />
}
