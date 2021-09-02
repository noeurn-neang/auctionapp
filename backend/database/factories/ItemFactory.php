<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->name(),
            'description' => $this->faker->unique()->text(),
            'image_url' => 'https://via.placeholder.com/300.png/09f/fff',
            'price' => $this->faker->numberBetween(100, 300),
            'last_bid_amount' => 0,
            'closing_date' => now()->addDays(2)
        ];
    }
}
