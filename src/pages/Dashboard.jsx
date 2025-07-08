import React from "react";
import Sidebar from "../layouts/Sidebar";


export default function Dashboard() {
  const userName = "John Doe"; 

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2>Welcome to Dashboard</h2>
          <p>Hello, <strong>{userName}</strong>!</p>
        </div>
      </div>
    </div>
  );
}



/*import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Welcome to Dashboard</h2>
      <p>Hello, <strong>{userName}</strong>!</p>
    </div>
  );
}
*/