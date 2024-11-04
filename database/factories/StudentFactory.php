<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Student::class;

    public function definition(): array
    {
        return [
            'uuid' => (string) Str::uuid(),             // Generate a UUID for each student
            'firstname' => $this->faker->firstName,   // Generate a random first name
            'lastname' => $this->faker->lastName,     // Generate a random last name
            'email' => $this->faker->unique()->safeEmail, // Generate a unique email
            'contact' => $this->faker->phoneNumber,   // Generate a random phone number
            'address' => $this->faker->address,       // Generate a random address
        ];
    }
}
