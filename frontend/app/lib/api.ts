const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export function getStoredToken(): string | null {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem('auth_token') || '';
}

export function setStoredToken(token: string) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('auth_token', token);
}

export function getStoredUser(): { name: string; email: string } | null {
  if (typeof localStorage === 'undefined') return null;
  const user = localStorage.getItem('auth_user');
  return user ? JSON.parse(user) : null;
}

export function setStoredUser(user: { name: string; email: string }) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('auth_user', JSON.stringify(user));
}

export function clearStoredToken() {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
}

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getStoredToken()}`,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'Request failed');
  }
  return res.json();
}

export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    request('/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    request('/login', { method: 'POST', body: JSON.stringify(data) }),
};

export const todosApi = {
  getAll: async () => {
    const res = await request('/todos');
    return res.data ?? res;
  },
  create: (data: { title: string; description: string }) =>
    request('/todos', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: { title?: string; description?: string; completed?: boolean }) =>
    request(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request(`/todos/${id}`, { method: 'DELETE' }),
  toggle: (id: number) =>
    request(`/todos/${id}/toggle`, { method: 'PATCH' }),
  get: (id: number) => request(`/todos/${id}`),
};
