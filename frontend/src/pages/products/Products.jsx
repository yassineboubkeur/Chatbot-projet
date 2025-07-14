import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
     

    const fetchProducts = async () => {

      try {
        const response = await fetch(`${apiUrl}/products/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Response not OK:", text);
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();
        setProducts(data.data);
        console.log(data);
      } catch (error) {
        console.error("Fetch products error:", error);
        toast.error("Error loading products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl, navigate, token]);

  const handleUpdate = (id) => {
    toast.info(`Update product with id: ${id}`);
    // navigate(`/products/update/${id}`);
  };

  const handleDelete = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    const result = await response.json();
    if (response.ok) {
      toast.success(result.message || "Product deleted successfully!");
      setProducts(products.filter(product => product.id !== id));
    } else {
      toast.error(result.message || "Failed to delete product.");
    }
  } catch (error) {
    console.error("Delete product error:", error);
    toast.error("Error deleting product. Please try again later.");
  }
};



  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="row">
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Products List</h3>
            <button
              className="btn btn-success"
              onClick={() => navigate("/dashboard/products/add")}
            >
              Add New Product
            </button>
          </div>
          {loading ? (
            <div>Loading products...</div>
          ) : (
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                      <td>{product.unit}</td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
