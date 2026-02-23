import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../http";

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    http.get("/products").then((res) => {
      setProducts(res.data);
    });
  };

  const deleteProduct = (productId) => {
    http.delete("/products/"+productId).then((res) => {
      fetchAllProducts();
    });
  };

  return (
    <>
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Sno.</th>
              <th scope="col">Product</th>
              <th scope="col">Status</th>
              <th scope="col">Purchase</th>
              <th scope="col">Selling</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={product.ProductId}>
                  <th>{++index}</th>
                  <td>{product.ProductName}</td>
                  <td>{product.ProductStatus === 1 ? "Active" : "Inactive"}</td>
                  <td>{product.ProductPurchaseAmount}</td>
                  <td>{product.ProductSellingAmount}</td>
                  <td>
                    <Link className="btn btn-primary" to={"/View/"+product.ProductId}>View</Link>
                    <Link className="btn btn-info" to={"/Edit/"+product.ProductId}>Edit</Link>

                    <button className="btn btn-danger" onClick={() => {deleteProduct(product.ProductId)}}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
