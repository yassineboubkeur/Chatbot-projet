import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import "react-toastify/dist/ReactToastify.css";

export default function AddService() {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  const apiUrl = import.meta.env.VITE_API_URL;

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    periode: "", 
  });


  const handleAddService = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/services/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newService,
          price: Number(newService.price),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Service added successfully!");
        navigate("/dashboard/services");
      } else {
        toast.error(result.message || "Failed to add service");
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
          <h3 className="mb-4">Add New Service</h3>
          <form onSubmit={handleAddService}>
            <input
              type="text"
              placeholder="Service Name"
              value={newService.name}
              onChange={e => setNewService({ ...newService, name: e.target.value })}
              required
              className="form-control mb-3"
            />
            <textarea
              placeholder="Description"
              value={newService.description}
              onChange={e => setNewService({ ...newService, description: e.target.value })}
              required
              className="form-control mb-3"
            />
            <input
              type="number"
              placeholder="Price"
              value={newService.price}
              onChange={e => setNewService({ ...newService, price: e.target.value })}
              required
              className="form-control mb-3"
            />
            <input
              type="text"
              placeholder="Periode (e.g. monthly)"
              value={newService.periode}
              onChange={e => setNewService({ ...newService, periode: e.target.value })}
              required
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-success">Add Service</button>
          </form>
        </div>
      </div>
    </div>
  );
}
