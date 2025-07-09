import React, { useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function AddProduct() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log("Product to add:", newProduct);
    toast.success("Product added successfully!");

    // ممكن هنا دير FormData للإرسال ل API
    // const formData = new FormData();
    // formData.append("name", newProduct.name);
    // formData.append("description", newProduct.description);
    // formData.append("price", newProduct.price);
    // formData.append("image", newProduct.image);

    navigate("/products");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct({ ...newProduct, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
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
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            {preview && (
              <div className="mb-3">
                <img src={preview} alt="Preview" width="150" style={{ objectFit: "cover" }} />
              </div>
            )}
            <button className="btn btn-success" type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
