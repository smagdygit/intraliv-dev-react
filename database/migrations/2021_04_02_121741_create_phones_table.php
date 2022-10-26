<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phones', function (Blueprint $table) {
            $table->id();
            $table->integer('name');
            $table->string('status')->default('');
            $table->boolean('free')->default(false);
            $table->boolean('personal')->default(false);
            $table->boolean('east')->default(false);
            $table->boolean('lundby')->default(false);
            $table->boolean('angered')->default(false);
            $table->string('phoniro_status')->default('');
            $table->string('comment')->default('');
            $table->string('telenumber')->default('');
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
        Schema::dropIfExists('phones');
    }
}
