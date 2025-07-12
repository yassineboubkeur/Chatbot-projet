import React, { useState, useEffect } from "react";
import Sidebar from "../../layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateService() {
  const navigate = useNavigate();
  const { id } = useParams(); // غادي نجيبو ID من route مثلا /services/edit/5
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);
  const apiUrl = import.meta.env.VITE_API_URL;

  const [service, setService] = useState({
    name: "",
    description: "",
    price: "",
    periode: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${apiUrl}/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setService({
            name: data.data.name,
            description: data.data.description,
            price: data.data.price,
            periode: data.data.periode,
          });
        } else {
          toast.error(data.message || "Failed to load service");
          navigate("/services");
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    };

    fetchService();
  }, [id, apiUrl, token, navigate]);

  const handleUpdateService = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...service,
          price: Number(service.price),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Service updated successfully!");
        navigate("/services");
      } else {
        toast.error(result.message || "Failed to update service");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
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
            <input
              type="text"
              placeholder="Service Name"
              value={service.name}
              onChange={e => setService({ ...service, name: e.target.value })}
              required
              className="form-control mb-3"
            />
            <textarea
              placeholder="Description"
              value={service.description}
              onChange={e => setService({ ...service, description: e.target.value })}
              required
              className="form-control mb-3"
            />
            <input
              type="number"
              placeholder="Price"
              value={service.price}
              onChange={e => setService({ ...service, price: e.target.value })}
              required
              className="form-control mb-3"
            />
            <input
              type="text"
              placeholder="Periode"
              value={service.periode}
              onChange={e => setService({ ...service, periode: e.target.value })}
              required
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary">Update Service</button>
          </form>
        </div>
      </div>
    </div>
  );
}


/*import React, { useState, useEffect } from "react";
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
*/