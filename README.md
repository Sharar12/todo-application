# Todo Application

Full-stack todo application with a Laravel 12 API backend and Next.js 16 frontend.

## Stack

- **Backend**: Laravel 12, MySQL, Sanctum auth
- **Frontend**: Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS v4

## Features

- User registration & login (Sanctum token auth)
- CRUD todos (create, read, update, delete)
- Toggle todo completion status
- Filter by All / Active / Done
- Dark-themed UI

## Setup

### Backend

```bash
cd backend
cp .env.example .env   # configure MySQL database
composer install
php artisan migrate
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local   # set API URL
npm run dev
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/register` | No | Register a new user |
| POST | `/api/login` | No | Login and get token |
| GET | `/api/todos` | Yes | List user's todos |
| POST | `/api/todos` | Yes | Create a todo |
| GET | `/api/todos/{id}` | Yes | Get a single todo |
| PUT | `/api/todos/{id}` | Yes | Update a todo |
| DELETE | `/api/todos/{id}` | Yes | Delete a todo |
| PATCH | `/api/todos/{id}/toggle` | Yes | Toggle completion |
