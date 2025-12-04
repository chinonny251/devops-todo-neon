import { sql } from '@vercel/postgres';

export type Todo = {
  id: number;
  text: string;
  created_at: Date | string;
};

export async function getTodos() {
  return await sql<Todo>`SELECT * FROM todos ORDER BY created_at DESC`;
}

export async function createTodo(text: string) {
  return await sql<Todo>`INSERT INTO todos (text) VALUES (${text}) RETURNING *`;
}
