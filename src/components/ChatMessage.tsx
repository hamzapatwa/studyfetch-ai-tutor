// components/ChatMessage.tsx
import React from 'react'

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant'
    content: string
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`p-4 ${message.role === 'user' ? 'text-right bg-blue-100' : 'text-left bg-gray-100'}`}>
      <p>{message.content}</p>
    </div>
  )
}

