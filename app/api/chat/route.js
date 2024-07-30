import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

console.log('Database configuration:', {
  user: process.env.DB_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  passwordSet: !!process.env.DB_PASSWORD
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),
  port: parseInt(process.env.DB_PORT, 10),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = 'asst_DhTE5X8om0VZo8wh6jKTAvQf'
const MAX_RETRIES = 60;

async function updateChatHistory(userId, userMessage, assistantReply) {
  console.log('Starting updateChatHistory');
  console.log('userId:', userId);
  
  if (!userId || userId === 1) {
    console.error('Invalid user ID:', userId);
    return;
  }

  const newMessages = [
    { role: 'user', content: userMessage },
    { role: 'assistant', content: assistantReply }
  ];

  const newMessagesJson = JSON.stringify(newMessages);
  console.log('New messages JSON:', newMessagesJson);

  try {
    console.log('Attempting to connect to the database...');
    const client = await pool.connect();
    console.log('Connected to the database');

    console.log('Executing query...');
    const result = await client.query(
      'UPDATE users SET chat_history = COALESCE(chat_history, \'[]\'::jsonb) || $1::jsonb WHERE id = $2 RETURNING *',
      [newMessagesJson, userId]
    );
    console.log('Query executed successfully');

    client.release();
    console.log('Database connection released');

    console.log('Query result:', result.rows[0]);
  } catch (error) {
    console.error('Error in updateChatHistory:', error);
    console.error('Error stack:', error.stack);
  }
}

export async function POST(request) {
  console.log('OpenAI object initialized');
  try {
    const { messages, userId } = await request.json();
    console.log('Received userId in API route:', userId);
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

      // Zapisz historię czatu
      if (userId) {
        await updateChatHistory(userId, messages[messages.length - 1].content, assistantReply);
      }

      return NextResponse.json({ role: 'assistant', content: assistantReply });
    } else {
      throw new Error('Nie znaleziono odpowiedniej odpowiedzi asystenta');
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}