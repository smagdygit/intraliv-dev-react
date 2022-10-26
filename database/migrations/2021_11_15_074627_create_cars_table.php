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
            $table->string('plate')->default('');
            $table->string('bought_location')->default('');
            $table->date('bought_date')->nullable();;
            $table->string('brand')->default('');
            $table->string('model')->default('');
            $table->string('station')->default('');
            $table->string('color')->default('');
            $table->string('comment')->default('');

            $table->boolean('abax')->default(false);
            $table->boolean('employee_car')->default(false);
            $table->boolean('benefit')->default(false);
            $table->boolean('automatic')->default(false);

            $table->integer('insurance_cost');
            $table->integer('max_mileage');
            
            $table->integer('wheels_summer_amount');
            $table->string('wheels_summer_type')->default('');
            $table->integer('wheels_winter_amount');
            $table->string('wheels_winter_type')->default('');
            $table->string('wheels_location')->default('');
            $table->boolean('winter_wheels_on')->default(false);

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
