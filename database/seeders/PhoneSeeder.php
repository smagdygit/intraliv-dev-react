<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Phone;
use Carbon\Carbon;

class PhoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('phones')->insert([
            'name' => -1,
            'status' => 'Usable',
            'free' => false,
            'personal' => false,
            'east' => false,
            'lundby' => false,
            'angered' => false,
            'phoniro_status' => 'Yes',
            'comment' => 'No Phone',
            'telenumber' => '',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('phones')->insert([
            'name' => 0,
            'status' => 'Usable',
            'free' => false,
            'personal' => false,
            'east' => false,
            'lundby' => false,
            'angered' => false,
            'phoniro_status' => 'Yes',
            'comment' => 'Unknown Phone ID',
            'telenumber' => '',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);



        for ($i = 1; $i < 20; $i ++) {
            $free = mt_rand(0, 1);
            $personal = mt_rand(0, 1);
            $east = mt_rand(0, 1);
            $lundby = mt_rand(0, 1);
            $angered = mt_rand(0, 1);
            DB::table('phones')->insert([
                'name' => $i,
                'status' => 'Usable',
                'free' => $free,
                'personal' => $personal,
                'east' => $east,
                'lundby' => $lundby,
                'angered' => $angered,
                'phoniro_status' => 'No',
                'comment' => '',
                'telenumber' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        };

        //Phone::factory()->count(10)->create();
    }
}
