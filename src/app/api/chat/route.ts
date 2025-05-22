import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';

interface ChatRequest {
  message: string;
}

export async function POST(
  request: Request & { json: () => Promise<ChatRequest> }
) {
  try {
    const { message } = await request.json();
    console.log('Received message:', message);

    if (!message) {
      console.error('No message provided');
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Gemini API key not configured');
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `
      You are a customer service chatbot for Nishat, a leading e-commerce clothing brand in Pakistan...
      [same prompt content as before]
    `;

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: "Got it! I'm ready to assist with info about Nishat. How can I help you today?" }],
        },
      ],
    });

    const result = await chat.sendMessageStream(message);
    const stream = result.stream;

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.text();
          controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Server error:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to process request: ' + errorMessage },
      { status: 500 }
    );
  }
}
