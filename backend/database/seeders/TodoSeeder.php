<?php

namespace Database\Seeders;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Seeder;

class TodoSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::factory()->create();

        $todos = [
            ['title' => 'Learn Laravel', 'description' => 'Complete the Laravel tutorial', 'completed' => false],
            ['title' => 'Build a Todo App', 'description' => 'Create a full-stack todo application', 'completed' => false],
            ['title' => 'Deploy to production', 'description' => 'Deploy the app to a cloud server', 'completed' => false],
        ];

        foreach ($todos as $todo) {
            Todo::create([
                'user_id' => $user->id,
                'title' => $todo['title'],
                'description' => $todo['description'],
                'completed' => $todo['completed'],
            ]);
        }
    }
}
