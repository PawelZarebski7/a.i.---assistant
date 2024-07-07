import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import executeQuery from '@/lib/db';

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    console.log('Próba rejestracji dla email:', email);

    // Sprawdź, czy użytkownik już istnieje
    const existingUser = await executeQuery({
      query: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    });

    if (existingUser.rows.length > 0) {
      console.log('Użytkownik już istnieje');
      return NextResponse.json({ message: 'Użytkownik z tym adresem email już istnieje' }, { status: 400 });
    }

    // Hashowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);

    // Dodanie nowego użytkownika
    const result = await executeQuery({
      query: 'INSERT INTO users (username, email, password, role, created_at, is_active, email_verified, available_queries) VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7) RETURNING id',
      values: [username, email, hashedPassword, 'user', true, false, 10]
    });

    console.log('Użytkownik zarejestrowany:', result.rows[0]);

    return NextResponse.json({ success: true, message: 'Rejestracja udana' }, { status: 201 });
  } catch (error) {
    console.error('Błąd rejestracji:', error);
    return NextResponse.json({ message: 'Wystąpił błąd serwera' }, { status: 500 });
  }
}