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
            $table->string('name')->default('');
            $table->string('email')->default('');
            $table->string('care_id_1')->default('');
            $table->string('care_id_2')->default('');
            $table->integer('phone_id');
            $table->string('sith')->default('');
            $table->boolean('admin')->default(false);
            $table->boolean('active')->default(false);
            $table->boolean('east')->default(false);
            $table->boolean('lundby')->default(false);
            $table->boolean('angered')->default(false);
            $table->string('policy_it_signed')->default('');
            $table->string('comment')->default('');
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
