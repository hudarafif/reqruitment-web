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
        Schema::table('jobs', function (Blueprint $table) {
            $table->string('category')->nullable()->after('description');
            $table->enum('job_type', ['Full-time', 'Contract', 'Part-time', 'Internship'])->default('Full-time')->after('category');
            $table->enum('workplace_type', ['Onsite', 'Hybrid', 'Remote'])->default('Onsite')->after('job_type');
            $table->integer('vacancy')->default(1)->after('workplace_type');
            $table->text('location')->nullable()->after('vacancy');
            $table->bigInteger('salary_min')->nullable()->after('location');
            $table->bigInteger('salary_max')->nullable()->after('salary_min');
            
            // Criteria
            $table->enum('gender', ['Male', 'Female', 'Any'])->default('Any')->after('salary_max');
            $table->integer('min_experience')->default(0)->after('gender'); // in years
            $table->string('min_education')->nullable()->after('min_experience');
            $table->integer('min_age')->nullable()->after('min_education');
            $table->integer('max_age')->nullable()->after('min_age');
            $table->text('skills')->nullable()->after('max_age'); // JSON or comma-separated
            
            // Quiz
            $table->boolean('has_screening_question')->default(false)->after('skills');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropColumn([
                'category',
                'job_type',
                'workplace_type',
                'vacancy',
                'location',
                'salary_min',
                'salary_max',
                'gender',
                'min_experience',
                'min_education',
                'min_age',
                'max_age',
                'skills',
                'has_screening_question',
            ]);
        });
    }
};
