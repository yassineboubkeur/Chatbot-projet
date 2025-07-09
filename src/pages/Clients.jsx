import React, { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Clients() {
  // بيانات dynamic عوض static
  const [clients, setClients] = useState([
    { username: "john_doe", email: "john@example.com", phone: "123-456-7890" },
    { username: "jane_smith", email: "jane@example.com", phone: "987-654-3210" },
    { username: "mohamed_ali", email: "mohamed@example.com", phone: "212-600-0000" },
  ]);

  // handle update (مجرد toast هنا)
  const handleUpdate = (client) => {
    toast.info(`Update feature for ${client.username} is not implemented yet.`);
  };

  // handle delete
  const handleDelete = (client) => {
    setClients(clients.filter(c => c.username !== client.username));
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
          </div>
        </div>
      </div>
    </>
  );
}
