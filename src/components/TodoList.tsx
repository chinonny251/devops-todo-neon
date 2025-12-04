'use client'

import { useState } from 'react'
import { addTodoServer } from '@/actions' // server action

interface Todo {
  id: number
  text: string
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos)
  const [newTodo, setNewTodo] = useState('')

  async function addTodo() {
    await addTodoServer(newTodo)
    setNewTodo('')
    const freshTodos = await fetch('/api/todos').then(res => res.json())
    setTodos(freshTodos)
  }

  return (
    <>
      <input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
      </ul>
    </>
  )
}
