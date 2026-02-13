<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('candidate_profiles', function (Blueprint $table) {
            $table->string('birth_place', 100)->nullable();
            $table->string('gender', 20)->nullable(); // 'Male', 'Female'
            $table->string('religion', 50)->nullable();
            $table->text('ktp_address')->nullable();
            $table->integer('height')->nullable(); // in cm
            $table->integer('weight')->nullable(); // in kg
            $table->string('last_education', 20)->nullable();
            $table->string('school_name', 150)->nullable();
            $table->string('major', 100)->nullable();
            $table->decimal('gpa', 4, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('candidate_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'birth_place',
                'gender',
                'religion',
                'ktp_address',
                'height',
                'weight',
                'last_education',
                'school_name',
                'major',
                'gpa',
            ]);
        });
    }
};
