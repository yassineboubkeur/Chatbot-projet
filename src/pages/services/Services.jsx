import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Services() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${apiUrl}/services`);
        if (!response.ok) {
          throw new Error("Failed to fetch services.");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Fetch services error:", error);
        toast.error("Error loading services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [apiUrl]);

  const handleUpdate = (id) => {
    toast.info(`Update service with id: ${id}`);
    // navigate(`/services/update/${id}`);
  };

  const handleDelete = (id) => {
    setServices(services.filter(service => service.id !== id));
    toast.success(`Service deleted successfully!`);
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h3 className="mb-4 d-flex justify-content-between align-items-center">
            Services List
            <button
              className="btn btn-success"
              onClick={() => navigate("/services/add")}
            >
              Add New Service
            </button>
          </h3>

          {loading ? (
            <div>Loading services...</div>
          ) : (
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
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <img
                        src={service.image}
                        alt={service.name}
                        width="80"
                        height="80"
                        style={{ objectFit: "cover" }}
                      />
                    </td>
                    <td>{service.name}</td>
                    <td>{service.description}</td>
                    <td>${service.price}</td>
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
                ))}
                {services.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No services found.
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
