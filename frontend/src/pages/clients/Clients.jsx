import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import "react-toastify/dist/ReactToastify.css";

export default function Clients() {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    

    

    const fetchClients = async () => {
      try {
        const response = await fetch(`${apiUrl}/clients/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Response not OK:", text);
          throw new Error("Failed to fetch clients.");
        }

        const data = await response.json();
        setClients(data.data);
      } catch (error) {
        console.error("Fetch clients error:", error);
        toast.error("Error loading clients. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [apiUrl, navigate, token]);

  const handleUpdate = (id) => {
    navigate(`/clients/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/clients/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message || "Client deleted successfully!");
        setClients(clients.filter(client => client.id !== id));
      } else {
        toast.error(result.message || "Failed to delete client.");
      }
    } catch (error) {
      console.error("Delete client error:", error);
      toast.error("Error deleting client. Please try again later.");
    }
  };

  

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="row">
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Clients List</h3>
            <button
              className="btn btn-success"
              onClick={() => navigate("/dashboard/clients/add")}
            >
              Add New Client
            </button>
          </div>

          {loading ? (
            <div>Loading clients...</div>
          ) : (
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.length > 0 ? (
                  clients.map((client) => (
                    <tr key={client.id}>
                      <td>{client.username}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleUpdate(client.id)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(client.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No clients found.
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
