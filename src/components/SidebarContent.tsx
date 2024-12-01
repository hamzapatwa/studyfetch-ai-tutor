'use client';

import React, { useState } from 'react';
import { BookmarkIcon, PlusIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
import { useFlashcard } from 'src/context/FlashcardContext';

interface FlashcardSet {
  id: string;
  topic: string;
}

interface SidebarContentProps {
  flashcardSets: FlashcardSet[];
}

export default function SidebarContent({ flashcardSets }: SidebarContentProps) {
  const { openOverlay } = useFlashcard();
  const [sets, setSets] = useState<FlashcardSet[]>(flashcardSets);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateNewSet = async () => {
    const topic = prompt('Enter the topic for the new flashcard set:');
    if (topic) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/flashcards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic }),
        });

        // Log the raw response text
        const responseText = await response.text();
        console.log('Received response text:', responseText);

        // Attempt to parse the response as JSON
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Failed to parse JSON:', parseError);
          throw new Error('Invalid JSON response from server.');
        }

        if (!response.ok) {
          throw new Error(data.error || `Error creating flashcard set: ${response.statusText}`);
        }

        console.log('New flashcard set created:', data);
        setSets([data, ...sets]); // Update the state to include the new set
      } catch (error: any) {
        console.error('Failed to create new flashcard set:', error);
        alert(`An error occurred: ${error.message}`);
      } finally {
        setIsLoading(false);
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
              {/* Replace Link with a button to trigger the overlay */}
              <button
                onClick={() => openOverlay(set.id)}
                className="flex items-center w-full p-2 rounded hover:bg-gray-700 transition-colors text-left"
              >
                <BookmarkIcon className="h-5 w-5 mr-2 text-gray-300" />
                <span>{set.topic}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Create New Set Button */}
      <button
        onClick={handleCreateNewSet}
        disabled={isLoading}
        className={`flex items-center p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <span>Creating...</span>
        ) : (
          <>
            <PlusIcon className="h-5 w-5 mr-2" />
            <span>Create New Set</span>
          </>
        )}
      </button>
    </div>
  );
}
