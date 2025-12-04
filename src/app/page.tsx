import { getTodos } from '@/lib/db';
import TodoList from '@/components/TodoList';

export default async function Home() {
  const todosResult = await getTodos();
  
  return (
    <main>
      <h1>My Todos</h1>
      <TodoList initialTodos={todosResult.rows} />
    </main>
  );
}
