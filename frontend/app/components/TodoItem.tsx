'use client';

import { Todo } from '../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`flex items-center justify-between rounded-lg border p-4 ${todo.completed ? 'border-gray-700 bg-gray-800/30' : 'border-blue-500/30 bg-blue-500/5'}`}>
      <div className="flex-1">
        <p className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {todo.title}
        </p>
        {todo.description && (
          <p className="mt-1 text-xs text-gray-500">{todo.description}</p>
        )}
      </div>
      <div className="ml-4 flex items-center gap-2">
        <button
          onClick={() => onToggle(todo.id)}
          className={`rounded-full p-1.5 ${todo.completed ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="rounded-full p-1.5 text-red-400 hover:bg-red-500/10"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
