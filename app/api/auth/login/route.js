import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import executeQuery from '@/lib/db';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log('Próba logowania dla email:', email);

    const result = await executeQuery({
      query: 'SELECT * FROM users WHERE email = $1',
      values: [email]
    });

    console.log('Wynik zapytania:', result);

    const user = result.rows[0];

    if (!user) {
      console.log('Użytkownik nie znaleziony');
      return NextResponse.json({ message: 'Nieprawidłowe dane logowania' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Nieprawidłowe hasło');
      return NextResponse.json({ message: 'Nieprawidłowe dane logowania' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ success: true, role: user.role });
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    // Aktualizacja last_login
    await executeQuery({
      query: 'UPDATE users SET last_login = NOW() WHERE id = $1',
      values: [user.id]
    });

    console.log('Logowanie udane');
    return response;
  } catch (error) {
    console.error('Błąd logowania:', error);
    return NextResponse.json({ message: 'Wystąpił błąd serwera' }, { status: 500 });
  }
}