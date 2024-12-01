// src/components/FlashcardOverlay.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useFlashcard } from '../context/FlashcardContext';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Flashcard } from '@prisma/client';

interface FlashcardSet {
  id: string;
  topic: string;
  flashcards: Flashcard[];
  createdAt: string; // Adjust type if necessary
}

const FlashcardOverlay: React.FC = () => {
  const { isOverlayOpen, selectedSetId, closeOverlay } = useFlashcard();
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashcardSet = async () => {
      if (selectedSetId) {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/flashcards/${selectedSetId}`, {
            method: 'GET',
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch flashcard set.');
          }

          const data: FlashcardSet = await response.json();
          setFlashcardSet(data);
          setCurrentIndex(0);
        } catch (err: any) {
          console.error('Error fetching flashcard set:', err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (isOverlayOpen && selectedSetId) {
      fetchFlashcardSet();
    }
  }, [isOverlayOpen, selectedSetId]);

  const handleNext = () => {
    if (flashcardSet && currentIndex < flashcardSet.flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (flashcardSet && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (!isOverlayOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
        {/* Close Button */}
        <button
          onClick={closeOverlay}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {isLoading ? (
          <div className="text-center">Loading flashcard set...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : flashcardSet ? (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">{flashcardSet.topic}</h2>

            {/* Flashcard */}
            <div
              className={`w-full h-64 bg-white rounded-lg shadow-md flex items-center justify-center cursor-pointer perspective`}
              onClick={handleFlip}
            >
              <div
                className={`relative w-full h-full text-center transition-transform duration-700 transform-style preserve-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden flex items-center justify-center px-4">
                  <p className="text-xl font-medium">{flashcardSet.flashcards[currentIndex].term}</p>
                </div>
                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden flex items-center justify-center px-4 rotate-y-180">
                  <p className="text-xl font-medium">{flashcardSet.flashcards[currentIndex].definition}</p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4 w-full">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`px-4 py-2 rounded ${
                  currentIndex === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Previous
              </button>
              <span>
                {currentIndex + 1} / {flashcardSet.flashcards.length}
              </span>
              <button
                onClick={handleNext}
                disabled={currentIndex === flashcardSet.flashcards.length - 1}
                className={`px-4 py-2 rounded ${
                  currentIndex === flashcardSet.flashcards.length - 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">No flashcard set selected.</div>
        )}
      </div>
    </div>
  );
};

export default FlashcardOverlay;