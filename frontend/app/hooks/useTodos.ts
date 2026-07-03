import { useState } from 'react';
import { todosApi } from '../lib/api';

interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export type { Todo };

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todosApi.getAll();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (data: { title: string; description: string }) => {
    await todosApi.create(data);
    await fetchTodos();
  };

  const updateTodo = async (id: number, data: { title?: string; description?: string; completed?: boolean }) => {
    await todosApi.update(id, data);
    await fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await todosApi.delete(id);
    await fetchTodos();
  };

  const toggleTodo = async (id: number) => {
    await todosApi.toggle(id);
    await fetchTodos();
  };

  return {
    todos,
    setTodos,
    loading,
    error,
    setError,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    fetchTodos,
  };
}
