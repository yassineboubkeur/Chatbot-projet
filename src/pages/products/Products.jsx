import React, { useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      description: "High-performance laptop for developers.",
      price: 1200,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Smartphone",
      description: "Latest model with great camera.",
      price: 800,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Headphones",
      description: "Noise-cancelling over-ear headphones.",
      price: 200,
      image: "https://via.placeholder.com/80",
    },
  ]);

  const handleUpdate = (id) => {
    toast.info(`Update product with id: ${id}`);
    // navigate(`/products/update/${id}`)
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success(`Product deleted successfully!`);
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Products List</h3>
            <button className="btn btn-success" onClick={() => navigate("/products/add")}>
              Add New Product
            </button>
          </div>
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      width="80"
                      height="80"
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleUpdate(product.id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
