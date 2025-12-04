import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  const todos = await sql`SELECT * FROM todos ORDER BY created_at DESC`
  return NextResponse.json(todos.rows)
}
