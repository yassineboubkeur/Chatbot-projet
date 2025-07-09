import React, { useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function AddService() {
  const navigate = useNavigate();
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    image: null,    
  });
  const [preview, setPreview] = useState(null);

  const handleAddService = (e) => {
    e.preventDefault();

    console.log("Service to add:", newService);
    toast.success("Service added successfully!");

    // ممكن هنا دير FormData للإرسال ل API
    // const formData = new FormData();
    // formData.append("name", newService.name);
    // formData.append("description", newService.description);
    // formData.append("price", newService.price);
    // formData.append("image", newService.image);

    navigate("/services");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewService({ ...newService, image: file });
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
          <h3 className="mb-4">Add New Service</h3>
          <form onSubmit={handleAddService}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Service Name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
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
            <button className="btn btn-success" type="submit">Add Service</button>
          </form>
        </div>
      </div>
    </div>
  );
}
