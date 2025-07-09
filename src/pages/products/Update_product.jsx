import React, { useState, useEffect } from "react";
import Sidebar from "../../layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // just to simulate fetching the product
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // simulate fetching from API
    setProduct({
      name: "Sample Product",
      description: "Sample description",
      price: 100,
      image: null,
    });
    setPreview("https://via.placeholder.com/150");
  }, [id]);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    console.log("Updated product:", product);
    toast.success("Product updated successfully!");
    navigate("/products");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
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
          <h3 className="mb-4">Update Product</h3>
          <form onSubmit={handleUpdateProduct}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Description"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {preview && (
              <div className="mb-3">
                <img src={preview} alt="Preview" width="150" style={{ objectFit: "cover" }} />
              </div>
            )}
            <button className="btn btn-primary" type="submit">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}
