// app/api/flashcards/route.ts

import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/prisma';

export async function GET() {
  try {
    const flashcardSets = await prisma.flashcardSet.findMany({
      select: {
        id: true,
        topic: true,
      },
    });

    return NextResponse.json(flashcardSets, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching flashcard sets:', error);
    return NextResponse.json({ error: 'Failed to fetch flashcard sets.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    // Validate the topic
    if (!topic || topic.trim() === '') {
      return NextResponse.json({ error: 'Invalid topic' }, { status: 400 });
    }

    // Create a new flashcard set in the database
    const flashcardSet = await prisma.flashcardSet.create({
      data: {
        topic: topic.trim(),
        flashcards: {
          create: [], // Optionally, add default flashcards here
        },
      },
    });

    return NextResponse.json(flashcardSet, { status: 201 });
  } catch (error: any) {
    console.error('Error creating flashcard set:', error);
    return NextResponse.json({ error: 'Failed to create flashcard set' }, { status: 500 });
  }
}