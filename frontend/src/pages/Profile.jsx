// src/pages/Profile.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const isLoadingAuth = useAuthStore((state) => state.isLoadingAuth);
  const loadAuthFromStorage = useAuthStore((state) => state.loadAuthFromStorage);
  const navigate = useNavigate();

  useEffect(() => {
    loadAuthFromStorage();
  }, [loadAuthFromStorage]);

  useEffect(() => {
    if (!isLoadingAuth && !user) {
      navigate("/login");
    }
  }, [user, isLoadingAuth, navigate]);

  if (isLoadingAuth) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null; // أو يمكن ترجع <Navigate to="/login" replace /> 
  }

  return (
    <div className="container mt-4">
      <div className="row">
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
