import React, { useState, useEffect } from "react";
import Sidebar from "../../layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import "react-toastify/dist/ReactToastify.css";

export default function Services() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    const fetchServices = async () => {
      try {
        const response = await fetch(`${apiUrl}/services/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Response not OK:", text);
          throw new Error("Failed to fetch services.");
        }

        const data = await response.json();
        setServices(data.data); // حسب JSON ديال API ديالك
      } catch (error) {
        console.error("Fetch services error:", error);
        toast.error("Error loading services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [apiUrl, navigate, user, token]);

  const handleUpdate = (id) => {
    navigate(`/services/edit/${id}`);
    // navigate(`/services/update/${id}`);
  };

  const handleDelete = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/services/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    const result = await response.json();
    if (response.ok) {
      toast.success(result.message || "Service deleted successfully!");
      setServices(services.filter(service => service.id !== id));
    } else {
      toast.error(result.message || "Failed to delete service.");
    }
  } catch (error) {
    console.error("Delete service error:", error);
    toast.error("Error deleting service. Please try again later.");
  }
};


  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="row">
        <div className="col-md-3"><Sidebar /></div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Services List</h3>
            <button
              className="btn btn-success"
              onClick={() => navigate("/services/add")}
            >
              Add New Service
            </button>
          </div>

          {loading ? (
            <div>Loading services...</div>
          ) : (
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Periode</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((service) => (
                    <tr key={service.id}>
                      
                      <td>{service.name}</td>
                      <td>{service.description}</td>
                      <td>${service.price}</td>
                      <td>{service.periode}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleUpdate(service.id)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(service.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No services found.</td>
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
