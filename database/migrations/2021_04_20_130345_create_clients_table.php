<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('');
            $table->string('care_type')->default('');
            $table->boolean('east')->default(false);
            $table->boolean('lundby')->default(false);
            $table->boolean('angered')->default(false);
            $table->boolean('vh')->default(false);
            $table->boolean('backa')->default(false);
            $table->string('ssn')->default('');
            $table->string('address')->default('');
            $table->string('permitted_hours')->default('');
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
        Schema::dropIfExists('clients');
    }
}
