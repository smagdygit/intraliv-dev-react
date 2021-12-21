<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('email');
            $table->integer('staff_number');
            $table->integer('carefox_id');
            $table->integer('group');
            $table->string('employment_type');
            $table->string('phone_status');
            $table->integer('phone_id');
            $table->string('sith_status');
            $table->string('sith_hsa');
            $table->string('home_area');
            $table->boolean('admin');
            $table->boolean('active');
            $table->boolean('education');
            $table->string('door_key');
            $table->string('card');
            $table->string('it_policy');
            $table->string('drivers_license');
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
        Schema::dropIfExists('staff');
    }
}
