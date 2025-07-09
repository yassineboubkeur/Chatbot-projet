import React, { useState, useEffect } from "react";
import Sidebar from "../../layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateService() {
  const navigate = useNavigate();
  const { id } = useParams(); // id dyal service
  const [service, setService] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fakeService = {
      name: "Sample Service",
      description: "Sample description",
      price: 150,
      image: null,
    };
    setService(fakeService);
    setPreview("https://via.placeholder.com/150"); // ولا image URL اللي جاي من ال API
  }, [id]);

  const handleUpdateService = (e) => {
    e.preventDefault();
    console.log("Updated service:", service);

    toast.success("Service updated successfully!");
    navigate("/services");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setService({ ...service, image: file });
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
          <h3 className="mb-4">Update Service</h3>
          <form onSubmit={handleUpdateService}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Service Name"
                value={service.name}
                onChange={(e) => setService({ ...service, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Description"
                value={service.description}
                onChange={(e) => setService({ ...service, description: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={service.price}
                onChange={(e) => setService({ ...service, price: e.target.value })}
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
            <button className="btn btn-primary" type="submit">Update Service</button>
          </form>
        </div>
      </div>
    </div>
  );
}
