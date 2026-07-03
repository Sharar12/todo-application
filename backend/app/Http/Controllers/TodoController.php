<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the user's todos.
     */
    public function index(Request $request)
    {
        $todos = $request->user()->todos()
            ->when($request->input('completed', null), function ($query, $status) {
                $query->where('completed', $status);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json($todos);
    }

    /**
     * Store a newly created todo.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $todo = $request->user()->todos()->create($validated);

        return response()->json($todo, 201);
    }

    /**
     * Display the specified todo.
     */
    public function show(Todo $todo)
    {
        $todo->load('user');

        return response()->json($todo);
    }

    /**
     * Update the specified todo.
     */
    public function update(Request $request, Todo $todo)
    {
        $request->user()->todos()->update($todo->id, $request->validated());

        $todo->refresh();

        return response()->json($todo);
    }

    /**
     * Remove the specified todo.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response()->json(null, 204);
    }

    /**
     * Toggle the completed status of a todo.
     */
    public function toggle(Todo $todo)
    {
        $todo->update(['completed' => !$todo->completed]);

        return response()->json($todo->fresh());
    }
}
