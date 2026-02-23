<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $primaryKey = 'ProductId';

    protected $fillable = [
        "ProductName",
        "ProductCode",
        "ProductStatus",
        "ProductPurchaseAmount",
        "ProductSellingAmount",
        "ProductProfitAmount"
    ];
}
