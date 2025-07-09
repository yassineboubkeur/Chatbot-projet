import React from "react";
import Sidebar from "../../layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Services() {
  const navigate = useNavigate();

  const [services, setServices] = React.useState([
    {
      id: 1,
      name: "Web Development",
      description: "Building modern and responsive websites.",
      price: 500,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Graphic Design",
      description: "Logos, banners, and visual content.",
      price: 300,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "SEO Optimization",
      description: "Improve your website ranking on Google.",
      price: 200,
      image: "https://via.placeholder.com/80",
    },
  ]);

  const handleUpdate = (id) => {
    toast.info(`Update service with id: ${id}`);
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
        </div>
      </div>
    </div>
  );
}
