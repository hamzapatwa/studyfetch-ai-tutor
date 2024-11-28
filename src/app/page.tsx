
// app/page.tsx
/*
'use client'
import React, { useState } from 'react'
import { ChatMessage } from '../components/ChatMessage'
import { ChatInput } from '../components/ChatInput'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([])

  const handleSend = async (message: string) => {
    // Explicitly type newMessages as Message[]
    const newMessages: Message[] = [...messages, { role: 'user', content: message }]
    setMessages(newMessages)
  
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    })
  
    const data = await response.json()
    setMessages([...newMessages, { role: 'assistant', content: data.response }])
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-auto">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  )
}

*/

// app/page.tsx


/*
'use client';

import React, { useState } from 'react';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import Sidebar from '../components/Sidebar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [refreshSidebar, setRefreshSidebar] = useState(false);

  const handleSend = async (message: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    setMessages([...newMessages, { role: 'assistant', content: data.response }]);

    // Check if a new flashcard set was created
    if (data.response.includes('created flashcards on')) {
      // Toggle the refreshSidebar state to trigger re-fetch in Sidebar
      setRefreshSidebar((prev) => !prev);
    }
  };

  const handleCreateNewSet = (topic: string) => {
    const message = `Please create flashcards on ${topic}`;
    handleSend(message);
  };

  return (
    <div className="flex h-screen">
      <Sidebar refresh={refreshSidebar} onCreateNewSet={handleCreateNewSet} />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
*/
// app/page.tsx
// app/page.tsx

// app/page.tsx

// app/page.tsx

// app/page.tsx



import Sidebar from 'src/components/Sidebar';
import HomePageContent from 'src/components/HomePageContent';

export default function HomePage() {
  return (
    <div className="flex h-screen">
      <Sidebar /> 
      <HomePageContent /> 
    </div>
  );
}

