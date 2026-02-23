import { useEffect, useState } from "react";
import http from "../http";
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {
  const navigate = useNavigate();
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

  const handleInputs = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = () => {
    http.put("/products/"+productId, inputs).then((res) => {
      navigate("/");
    });
  };
  return (
    <div className="container">
      <h2>Edit Product</h2>

      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Product Name
          </label>
          <input
            type="text"
            class="form-control"
            name="ProductName"
            value={inputs.ProductName || ""}
            onChange={handleInputs}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Product Purchase Amount
          </label>
          <input
            type="number"
            class="form-control"
            name="ProductPurchaseAmount"
            value={inputs.ProductPurchaseAmount || ""}
            onChange={handleInputs}
            id="exampleInputPassword1"
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Product Selling Amount
          </label>
          <input
            type="number"
            class="form-control"
            name="ProductSellingAmount"
            value={inputs.ProductSellingAmount || ""}
            onChange={handleInputs}
            id="exampleInputPassword1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productStatus" className="form-label">
            Product Status
          </label>
          <select
            className="form-select"
            name="ProductStatus"
            value={inputs.ProductStatus || ""}
            onChange={handleInputs}
            id="productStatus"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button type="button" class="btn btn-primary" onClick={submitForm}>
          Update
        </button>
      </form>
    </div>
  );
};
