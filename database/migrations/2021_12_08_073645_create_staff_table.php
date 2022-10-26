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
            $table->string('name')->default('');
            $table->string('email')->default('');
            $table->integer('staff_number');
            $table->integer('carefox_id');
            $table->integer('group');
            $table->string('employment_type')->default('');
            $table->string('phone_status')->default('');
            $table->integer('phone_id');
            $table->string('sith_status')->default('');
            $table->string('sith_hsa')->default('');
            $table->string('home_area')->default('');
            $table->boolean('admin')->default(false);
            $table->boolean('active')->default(false);
            $table->boolean('education')->default(false);
            $table->string('door_key')->default('');
            $table->string('card')->default('');
            $table->string('it_policy')->default('');
            $table->string('drivers_license')->default('');
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
        Schema::dropIfExists('staff');
    }
}
