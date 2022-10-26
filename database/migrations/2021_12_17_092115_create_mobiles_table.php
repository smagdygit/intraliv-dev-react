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
            $table->string('name')->default('');
            $table->string('model')->default('');
            $table->string('usable')->default('');
            $table->string('installed')->default('');
            $table->string('hardware')->default('');
            $table->string('phoniro_status')->default('');
            $table->string('phoniro_home_area')->default('');
            $table->string('actual_home_area')->default('');
            $table->string('location')->default('');
            $table->string('sim_status')->default('');
            $table->string('sim_code')->default('');
            $table->string('sim_number')->default('');
            $table->string('belongs_to')->default('');
            $table->string('comment')->default('');
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
