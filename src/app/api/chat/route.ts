// app/api/chat/route.ts
import { NextResponse } from 'next/server'
import { sendMessageToAnthropic } from '@/src/lib/anthropic'

export async function POST(request: Request) {
  const { messages } = await request.json()

  if (!messages) {
    return NextResponse.json({ error: 'Messages are required' }, { status: 400 })
  }

  try {
    const response = await sendMessageToAnthropic(messages)
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error communicating with Anthropic API:', error)
    return NextResponse.json({ error: 'Error communicating with Anthropic API' }, { status: 500 })
  }
}