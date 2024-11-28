// components/HomePageContent.tsx

'use client';

import React, { useState } from 'react';
// Removed the import of Sidebar to prevent importing a Server Component
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { PlusIcon } from '@heroicons/react/24/solid';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function HomePageContent() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (message: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error(`Error from chat API: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error fetching from API:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'An error occurred while processing your request. Please try again later.',
        },
      ]);
    }
  };

  const handleCreateNewSet = async () => {
    const topic = prompt('Enter the topic for the new flashcard set:');
    if (topic) {
      const message = `Please create flashcards on ${topic}`;
      await handleSend(message);
    }
  };

  
  return (
    <div className="flex-1 flex flex-col">

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      {/* Chat Input */}
      <ChatInput onSend={handleSend} />
    </div>
  );
}