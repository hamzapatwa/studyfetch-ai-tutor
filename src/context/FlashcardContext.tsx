


'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FlashcardContextType {
  isOverlayOpen: boolean;
  selectedSetId: string | null;
  openOverlay: (setId: string) => void;
  closeOverlay: () => void;
}

const FlashcardContext = createContext<FlashcardContextType | undefined>(undefined);

export const FlashcardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);

  const openOverlay = (setId: string) => {
    setSelectedSetId(setId);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setSelectedSetId(null);
    setIsOverlayOpen(false);
  };

  return (
    <FlashcardContext.Provider value={{ isOverlayOpen, selectedSetId, openOverlay, closeOverlay }}>
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcard = (): FlashcardContextType => {
  const context = useContext(FlashcardContext);
  if (context === undefined) {
    throw new Error('useFlashcard must be used within a FlashcardProvider');
  }
  return context;
};

