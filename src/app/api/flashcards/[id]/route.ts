// src/app/api/flashcards/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/prisma'; // Adjust the path if necessary

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch the flashcard set by ID, including its flashcards
    const flashcardSet = await prisma.flashcardSet.findUnique({
      where: { id },
      include: { flashcards: true },
    });

    console.log('Fetched FlashcardSet:', flashcardSet); // Debugging log

    if (!flashcardSet) {
      return NextResponse.json(
        { error: 'Flashcard set not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(flashcardSet);
  } catch (error) {
    console.error('Error fetching flashcard set:', error);
    return NextResponse.json(
      { error: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}