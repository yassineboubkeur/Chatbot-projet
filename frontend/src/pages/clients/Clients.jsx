import React, { useState, useEffect } from "react";
import Sidebar from "../../layouts/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore"; // ✅
import { useNavigate } from "react-router-dom"; // ✅
import "react-toastify/dist/ReactToastify.css";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const user = useAuthStore(state => state.user); // ✅
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${apiUrl}/clients`);
        if (!response.ok) {
          throw new Error("Failed to fetch clients.");
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Fetch clients error:", error);
        toast.error("Error loading clients. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [apiUrl]);

  const handleUpdate = (client) => {
    toast.info(`Update feature for ${client.username} is not implemented yet.`);
  };

  const handleDelete = (client) => {
    setClients(clients.filter((c) => c.username !== client.username));
    toast.success(`${client.username} deleted successfully.`);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h3 className="mb-4">Clients List</h3>
            {loading ? (
              <div>Loading clients...</div>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, index) => (
                    <tr key={index}>
                      <td>{client.username}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleUpdate(client)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(client)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {clients.length === 0 && (
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
    </>
  );
}
