<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Product::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([


            "ProductName" => [
                'required',
                'string',
                'min:3',
                'max:100',
                Rule::unique('products', 'ProductName')
            ],

            "ProductStatus" => "sometimes|string",
            "ProductPurchaseAmount" => "required|numeric|min:0",
            "ProductSellingAmount" => "required|numeric|min:0|gte:ProductPurchaseAmount"

        ]);

        $lastProduct = Product::latest('ProductId')->first();
        $nextId = $lastProduct ? $lastProduct->ProductId + 1 : 1;
        $data['ProductCode'] = 'PC' . $nextId;

        $data['ProductStatus'] = ($request->ProductStatus == 'Active') ? 1 : 0;
        $data['ProductProfitAmount'] = ($request->ProductSellingAmount - $request->ProductPurchaseAmount);


        Product::create($data);

        return response()->json([
            "status" => true,
            "message" => "Product created successfully"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json([
            "status" => true,
            "message" => "Product Found",
            "data" => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {

        $request->merge([
            'ProductPurchaseAmount' => $request->ProductPurchaseAmount ?? $product->ProductPurchaseAmount,
            'ProductSellingAmount' => $request->ProductSellingAmount ?? $product->ProductSellingAmount,
        ]);

        $data = $request->validate([


            "ProductName" => [
                'sometimes',
                'string',
                'min:3',
                'max:100',
                Rule::unique('products', 'ProductName')->ignore($product->ProductId, "ProductId")
            ],

            "ProductStatus" => "sometimes|string",
            "ProductPurchaseAmount" => "sometimes|numeric|min:0",
            "ProductSellingAmount" => "sometimes|numeric|min:0|gte:ProductPurchaseAmount"

        ]);

        if ($request->has('ProductStatus')) {
            $data['ProductStatus'] = ($request->ProductStatus == 'Active') ? 1 : 0;
        }

        $purchase = $request->ProductPurchaseAmount ?? $product->ProductPurchaseAmount;
        $selling = $request->ProductSellingAmount ?? $product->ProductSellingAmount;
        $data['ProductProfitAmount'] = $selling - $purchase;


        $product->update($data);

        return response()->json([
            "status" => true,
            "message" => "Product updated successfully",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            "status" => true,
            "message" => "Product deleted successfully"
        ]);
    }
}
