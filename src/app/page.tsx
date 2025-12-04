

import { getTodos } from '@/lib/db'
import TodoList from '@/components/TodoList'

export default async function Home() {
  const todos = await getTodos()
  
  return <TodoList initialTodos={todos.rows} />
}

