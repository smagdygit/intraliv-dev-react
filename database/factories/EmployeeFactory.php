<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'care_id_1' => mt_rand(100, 999),
            'care_id_2' => mt_rand(10000, 99999),
            'phone_id' => mt_rand(1, 19),
            'sith' => 'Yes',
            'admin' => false,
            'active' => true,
            'east' => true,
            'lundby' => true,
            'angered' => true,
            'policy_it_signed' => '',
            'comment' => '',
        ];
    }
}
