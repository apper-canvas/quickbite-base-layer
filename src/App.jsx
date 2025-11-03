import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import authService from "@/services/api/authService";
import Home from "@/components/pages/Home";
import OrderTracking from "@/components/pages/OrderTracking";
import Profile from "@/components/pages/Profile";
import Search from "@/components/pages/Search";
import Cart from "@/components/pages/Cart";
import RestaurantDetail from "@/components/pages/RestaurantDetail";
import Orders from "@/components/pages/Orders";
import LoginModal from "@/components/molecules/LoginModal";
// This file is now only used for legacy compatibility
// All routing logic has been moved to src/router/index.jsx and src/components/organisms/Layout.jsx

// Protected Route Component
function ProtectedRoute({ children, currentUser, onShowLogin }) {
  useEffect(() => {
    if (!currentUser) {
      toast.warning('Please log in to access your profile');
      onShowLogin();
    }
  }, [currentUser, onShowLogin]);

  if (!currentUser) {
    return null; // Return null while login modal is shown
  }

  return children;
}

// All app-level state and routing logic moved to Layout component
// This component is no longer used in the new router architecture
function App() {
  return (
    <div>
      {/* This component is deprecated - routing now handled by RouterProvider */}
    </div>
  );
}
export default App;