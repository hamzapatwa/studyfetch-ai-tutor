// components/SidebarContent.tsx
/*
'use client';

import React from 'react';
import Link from 'next/link';
import { BookmarkIcon, PlusIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

interface FlashcardSet {
  id: string;
  topic: string;
}

interface SidebarContentProps {
  flashcardSets: FlashcardSet[];
  onCreateNewSet: (topic: string) => void;
}

export default function SidebarContent({ flashcardSets, onCreateNewSet }: SidebarContentProps) {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      
      <div className="flex items-center mb-6">
        <AcademicCapIcon className="h-8 w-8 text-blue-500" />
        <h1 className="text-2xl font-bold ml-2">StudyFetch</h1>
      </div>
      
      <div className="flex-1 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Flashcard Sets</h2>
        <ul>
          {flashcardSets.map((set) => (
            <li key={set.id} className="mb-2">
              <Link
                href={`/flashcards/${set.id}`}
                className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <BookmarkIcon className="h-5 w-5 mr-2 text-gray-300" />
                <span>{set.topic}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <button
        onClick={() => {
          const topic = prompt('Enter the topic for the new flashcard set:');
          if (topic) {
            onCreateNewSet(topic);
          }
        }}
        className="flex items-center p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        <span>Create New Set</span>
      </button>
    </div>
  );
}
  */

// components/SidebarContent.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookmarkIcon, PlusIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

interface FlashcardSet {
  id: string;
  topic: string;
}

interface SidebarContentProps {
  flashcardSets: FlashcardSet[];
}

export default function SidebarContent({ flashcardSets }: SidebarContentProps) {
  const [sets, setSets] = useState<FlashcardSet[]>(flashcardSets);

  const handleCreateNewSet = async () => {
    const topic = prompt('Enter the topic for the new flashcard set:');
    if (topic) {
      try {
        const response = await fetch('/api/flashcards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic }),
        });

        if (!response.ok) {
          throw new Error(`Error creating flashcard set: ${response.statusText}`);
        }

        const newSet = await response.json();
        setSets([newSet, ...sets]);
      } catch (error) {
        console.error('Failed to create new flashcard set:', error);
        alert('An error occurred while creating the flashcard set. Please try again.');
      }
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <AcademicCapIcon className="h-8 w-8 text-blue-500" />
        <h1 className="text-2xl font-bold ml-2">StudyFetch</h1>
      </div>
      {/* Flashcard Sets */}
      <div className="flex-1 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Flashcard Sets</h2>
        <ul>
          {sets.map((set) => (
            <li key={set.id} className="mb-2">
              <Link
                href={`/flashcards/${set.id}`}
                className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
              >
                <BookmarkIcon className="h-5 w-5 mr-2 text-gray-300" />
                <span>{set.topic}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Create New Set Button */}
      <button
        onClick={handleCreateNewSet}
        className="flex items-center p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        <span>Create New Set</span>
      </button>
    </div>
  );
}