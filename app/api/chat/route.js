import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = 'asst_DhTE5X8om0VZo8wh6jKTAvQf'
const MAX_RETRIES = 60;

export async function POST(request) {
  console.log('OpenAI object initialized');
  try {
    const { messages } = await request.json();
    console.log('Received messages:', messages);

    const thread = await openai.beta.threads.create();
    console.log('Created thread:', thread);

    await openai.beta.threads.messages.create(
      thread.id,
      { role: 'user', content: messages[messages.length - 1].content }
    );

    const run = await openai.beta.threads.runs.create(
      thread.id,
      { assistant_id: ASSISTANT_ID }
    );
    console.log('Started run:', run);

    let runStatus;
    let retries = 0;
    do {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      console.log('Run status:', runStatus.status);
      retries++;
      if (retries >= MAX_RETRIES) {
        throw new Error('Przekroczono limit czasu oczekiwania na odpowiedź asystenta');
      }
    } while (runStatus.status !== 'completed');

    const messagesResponse = await openai.beta.threads.messages.list(thread.id);
    const lastAssistantMessage = messagesResponse.data.find(message => message.role === 'assistant');

    if (lastAssistantMessage && lastAssistantMessage.content[0].type === 'text') {
      const assistantReply = lastAssistantMessage.content[0].text.value;
      console.log('Assistant reply:', assistantReply);
      return NextResponse.json({ role: 'assistant', content: assistantReply });
    } else {
      throw new Error('Nie znaleziono odpowiedniej odpowiedzi asystenta');
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}