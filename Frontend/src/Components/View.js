import { useEffect, useState } from "react";
import http from "../http";
import { useParams } from "react-router-dom";

export const View = () => {
  
  const [inputs, setInputs] = useState({});

  const {productId} = useParams();

  const fetchAllProduct = () => {
    http.get('/products/'+productId).then((res) =>{

     setInputs({
       ProductName : res.data.data.ProductName,
       ProductPurchaseAmount :  res.data.data.ProductPurchaseAmount,
       ProductSellingAmount :  res.data.data.ProductSellingAmount,
       ProductStatus: res.data.data.ProductStatus === 1 ? "Active" : "Inactive"
     });
    });
  }

  useEffect(() =>{
    fetchAllProduct();
  },[])



  return (
    <div className="container">
      
      <h2>View Product</h2>

    <h5>Product</h5>
    <p>{inputs.ProductName}</p>
    
    <h5>Purchase</h5>
    <p>{inputs.ProductPurchaseAmount}</p>

    <h5>Selling</h5>
    <p>{inputs.ProductSellingAmount}</p>

    <h5>Status</h5>
    <p>{inputs.ProductStatus}</p>

  
    </div>
  );
};
