import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export default async function executeQuery({ query, values = [] }) {
  console.log('Executing query:', query);
  console.log('With values:', values);
  
  if (!query) {
    console.error("Query is null or undefined");
    throw new Error("Query is required");
  }

  try {
    const result = await pool.query(query, values);
    console.log('Query result:', result.rows);
    return { rows: result.rows, rowCount: result.rowCount };
  } catch (error) {
    console.error('[DATABASE_ERROR]', error);
    throw new Error('Database query failed: ' + error.message);
  }
}