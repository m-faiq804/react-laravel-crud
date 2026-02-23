<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id("ProductId");
            $table->string("ProductName", 100)->unique();
            $table->string("ProductCode", 10)->unique();
            $table->boolean('ProductStatus')->default(1); 
            $table->double("ProductPurchaseAmount", 10, 2);
            $table->double("ProductSellingAmount", 10, 2);
            $table->double("ProductProfitAmount", 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
