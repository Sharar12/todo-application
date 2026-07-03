'use client';

import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { useEffect } from 'react';
import { authApi, getStoredToken, getStoredUser, setStoredToken, setStoredUser, clearStoredToken, todosApi } from '../lib/api';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import TodoFilter from '../components/TodoFilter';

export default function TodosPage() {
  const { todos, setTodos, loading, error, setError, addTodo, deleteTodo, toggleTodo } = useTodos();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showAuth, setShowAuth] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const data = await authApi.login({ email, password });
      setStoredToken(data.token);
      setStoredUser(data.user);
      setUser(data.user);
      setShowAuth(false);
      await fetchTodos();
    } catch (err) {
      setAuthError('Invalid credentials');
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const data = await authApi.register({ name, email, password });
      setStoredToken(data.token);
      setStoredUser(data.user);
      setUser(data.user);
      setShowAuth(false);
      await fetchTodos();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  const handleLogout = () => {
    clearStoredToken();
    setUser(null);
    setTodos([]);
  };

  const fetchTodos = async () => {
    try {
      const data = await todosApi.getAll();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (showAuth) {
    return (
      <div className="mx-auto max-w-md px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">{isRegister ? 'Register' : 'Login'}</h1>
        {authError && (
          <p className="mb-4 text-sm text-red-400">{authError}</p>
        )}
        <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => { setIsRegister(!isRegister); setAuthError(null); }} className="text-blue-400 hover:underline">
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">My Todos</h1>
          <p className="mt-2 text-gray-400">
            {filteredTodos.filter(t => !t.completed).length} active &middot;{' '}
            {filteredTodos.filter(t => t.completed).length} completed
          </p>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-400">{user.name}</span>
          )}
          {getStoredToken() ? (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Login/Register
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {getStoredToken() && <TodoForm onAddTodo={addTodo} />}

      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

      <div className="mt-4">
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
}
