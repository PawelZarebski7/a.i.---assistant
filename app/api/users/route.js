import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;

  try {
    // Get total count of users
    const countResult = await pool.query('SELECT COUNT(*) FROM users');
    const totalUsers = parseInt(countResult.rows[0].count);

    // Get users for the current page
    const result = await pool.query(`
      SELECT id, username, email, role, created_at, last_login, is_active, email_verified, available_queries 
      FROM users
      ORDER BY id DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    return NextResponse.json({
      users: result.rows,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      totalUsers: totalUsers
    }, { status: 200 });

  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'An error occurred while fetching users' }, { status: 500 });
  }
}

export async function PUT(request) {
    try {
      const { id, username, email, role } = await request.json();
  
      if (!id) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }
  
      let query = 'UPDATE users SET ';
      const values = [];
      let paramCount = 1;
  
      if (username) {
        query += `username = $${paramCount}, `;
        values.push(username);
        paramCount++;
      }
      if (email) {
        query += `email = $${paramCount}, `;
        values.push(email);
        paramCount++;
      }
      if (role) {
        query += `role = $${paramCount}, `;
        values.push(role);
        paramCount++;
      }
  
      query = query.slice(0, -2); // Remove last comma and space
      query += ` WHERE id = $${paramCount} RETURNING *`;
      values.push(id);
  
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json({ user: result.rows[0], message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ error: 'An error occurred while updating the user' }, { status: 500 });
    }
  }
  
  // DELETE - Delete
  export async function DELETE(request) {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
  
      if (!id) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }
  
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
  
      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json({ error: 'An error occurred while deleting the user' }, { status: 500 });
    }
  }