import React from "react";
import Sidebar from "../layouts/Sidebar";

export default function Clients() {
  // بيانات static
  const clients = [
    { username: "john_doe", email: "john@example.com", phone: "123-456-7890" },
    { username: "jane_smith", email: "jane@example.com", phone: "987-654-3210" },
    { username: "mohamed_ali", email: "mohamed@example.com", phone: "212-600-0000" },
  ];

  return (
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
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={index}>
                  <td>{client.username}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
