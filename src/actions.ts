'use server'

import { createTodo } from '@/lib/db'

export async function addTodoServer(newTodo: string) {
  await createTodo(newTodo)
}
