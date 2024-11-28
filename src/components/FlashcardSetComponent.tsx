// components/FlashcardSetComponent.tsx
'use client'
import React, { useState } from 'react'
import { Flashcard } from '@/src/components/Flashcard'
import { Button } from '@/src/components/ui/button'

export default function FlashcardSetComponent({ flashcards }: { flashcards: any[] }) {
  if (flashcards.length === 0) {
    return <div>No flashcards available.</div>; //fallback
  }
 
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length)
  }

  const currentFlashcard = flashcards[currentIndex]

  return (
    <div className="flex flex-col items-center">
      <Flashcard term={currentFlashcard.term} definition={currentFlashcard.definition} />
      <div className="mt-4 flex">
        <Button onClick={handlePrevious} className="mr-2">
          Previous
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}
