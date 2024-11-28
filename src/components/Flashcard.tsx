// components/Flashcard.tsx
'use client'
import React, { useState } from 'react'
import { Card } from '@/src/components/ui/card'

interface FlashcardProps {
  term: string
  definition: string
}

export function Flashcard({ term, definition }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div //chnage back to Card
      onClick={() => setFlipped(!flipped)}
      className="w-full h-64 flex items-center justify-center text-2xl cursor-pointer"
    >
      {flipped ? definition : term}
    </div> //here too
  )
}
