<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('care_id_1');
            $table->string('care_id_2');
            $table->integer('phone_id');
            $table->string('sith');
            $table->boolean('admin');
            $table->boolean('active');
            $table->boolean('east');
            $table->boolean('lundby');
            $table->boolean('angered');
            $table->string('policy_it_signed');
            $table->string('comment');
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
        Schema::dropIfExists('employees');
    }
}
