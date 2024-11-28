
// Load environment variables
import dotenv from 'dotenv';

import fetch from 'node-fetch';
import { prisma } from './prisma';


dotenv.config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;


if (!ANTHROPIC_API_KEY) {
  throw new Error('Anthropic API key is not defined in environment variables.');
}

// Define interfaces for the API
interface Message {
  role: 'user' | 'assistant';
  content: string;
}
 
interface AnthropicResponse {
  content: [{
    text: string;
  }];
  error?: {
    type: string;
    message: string;
  };
}

export async function sendMessageToAnthropic(messages: Message[]) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        messages,
        model: 'claude-3-sonnet-20240229', // Ensure this model is correct
        max_tokens: 1000,
        system: `You are an AI Tutor with access to a special tool called create_flashcard_set(topic). When a user asks you to create flashcards on a topic, respond by issuing the command create_flashcard_set('topic') exactly as shown, without any additional text or explanations. Please actually figure out terms and proper definitions, make 3 per request.

                  Example:
                  User: Please create flashcards on Next.js
                  Assistant: create_flashcard_set('Next.js')`
      }),
    });

    // Log the full API response for debugging
    const data = (await response.json()) as AnthropicResponse;
    console.log('Anthropic API response:', JSON.stringify(data, null, 2));

    // Handle API error responses
    if (data.error) {
      console.error('Anthropic API error:', data.error.type, data.error.message);
      return `Error from Anthropic API (${data.error.type}): ${data.error.message}`;
    }

    if (!data.content?.[0]?.text) {
      console.error('Error: Missing content in Anthropic API response', data);
      return 'Sorry, I could not process your request. Please try again.';
    }

    const assistantReply = data.content[0].text.trim();
    console.log('Assistant Reply:', assistantReply);

    // Check for tool usage
    const toolMatch = assistantReply.match(/create_flashcard_set\(['"]\s*(.+?)\s*['"]\)/);
    if (toolMatch) {
      const topic = toolMatch[1].trim();
      const flashcardSet = await createFlashcardSet(topic);
      return `I've created flashcards on "${topic}". [View Flashcards](/flashcards/${flashcardSet.id})`;
    }

    return assistantReply;
  } catch (error) {
    console.error('Error communicating with Anthropic API:', error);
    return 'An error occurred while processing your request. Please try again later.';
  }
}

async function createFlashcardSet(topic: string) {
  try {
    // Validate the topic
    if (!topic || topic.trim() === '') {
      throw new Error('Invalid topic provided for flashcard creation.');
    }

    // Define flashcards based on the topic
    const flashcardsData = [
      { term: `${topic} Term 1`, definition: `${topic} Definition 1` },
      { term: `${topic} Term 2`, definition: `${topic} Definition 2` },
      // Add more as needed
    ];

    // Create a new flashcard set in the database
    const flashcardSet = await prisma.flashcardSet.create({
      data: {
        topic,
        flashcards: {
          create: flashcardsData,
        },
      },
    });

    console.log(`Flashcard set "${topic}"`);
    return flashcardSet;
  } catch (error) {
    console.error('Error creating flashcard set in database:', error);
    throw new Error('Failed to create flashcard set.');
  }
}