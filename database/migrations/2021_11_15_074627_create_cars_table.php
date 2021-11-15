<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('plate');
            $table->string('bought_location');
            $table->date('bought_date')->nullable();;
            $table->string('brand');
            $table->string('model');
            $table->string('station');
            $table->string('color');
            $table->string('comment');

            $table->boolean('abax');
            $table->boolean('employee_car');
            $table->boolean('benefit');
            $table->boolean('automatic');

            $table->integer('insurance_cost');
            $table->integer('max_mileage');
            
            $table->integer('wheels_summer_amount');
            $table->string('wheels_summer_type');
            $table->integer('wheels_winter_amount');
            $table->string('wheels_winter_type');
            $table->string('wheels_location');
            $table->boolean('winter_wheels_on');

            $table->date('oil_checked')->nullable();;
            $table->date('washed')->nullable();;
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars');
    }
}
