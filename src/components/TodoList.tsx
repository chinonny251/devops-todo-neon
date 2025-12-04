'use client';

import { useState } from 'react';
import { addTodoServer } from '@/actions';
import type { Todo } from '@/lib/db';  // Import Todo type

interface Props {
  initialTodos: Todo[];  // Typed props
}

export default function TodoList({ initialTodos }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  async function addTodo() {
    await addTodoServer(newTodo);
    setNewTodo('');
    // Refresh list
    const res = await fetch('/api/todos');
    const data: Todo[] = await res.json();
    setTodos(data);
  }

  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

