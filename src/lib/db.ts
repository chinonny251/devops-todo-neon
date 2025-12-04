import { createPool } from '@vercel/postgres'

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
})

export async function getTodos() {
  return await pool.sql`SELECT * FROM todos ORDER BY created_at DESC`
}

export async function createTodo(text: string) {
  return await pool.sql`INSERT INTO todos (text) VALUES (${text}) RETURNING *`
}
