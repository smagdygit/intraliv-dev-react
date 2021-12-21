<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMobilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mobiles', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('wp');
            $table->string('name');
            $table->string('model');
            $table->string('usable');
            $table->string('installed');
            $table->string('hardware');
            $table->string('phoniro_status');
            $table->string('phoniro_home_area');
            $table->string('actual_home_area');
            $table->string('location');
            $table->string('sim_status');
            $table->string('sim_code');
            $table->string('sim_number');
            $table->string('belongs_to');
            $table->string('comment');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mobiles');
    }
}
