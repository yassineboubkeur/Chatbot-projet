import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct() {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
   const apiUrl = import.meta.env.VITE_API_URL;

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    unit: "",
  });
  
  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/products/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Product added successfully!");
        navigate("/dashboard/products");
      } else {
        toast.error(result.message || "Failed to add product");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

 

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="row">
        <div className="col-md-9">
          <h3 className="mb-4">Add New Product</h3>
          <form onSubmit={handleAddProduct}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Unit (e.g. kg, piece)"
                value={newProduct.unit}
                onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-success" type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
