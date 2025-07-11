import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Sidebar from "../layouts/Sidebar";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const loadAuthFromStorage = useAuthStore(
    (state) => state.loadAuthFromStorage
  );
  const navigate = useNavigate();

  useEffect(() => {
    loadAuthFromStorage();
  }, [loadAuthFromStorage]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <h2>Welcome to Dashboard</h2>
          <p>
            Hello, <strong>{user.name}</strong>!
          </p>
        </div>
      </div>
    </div>
  );
}
