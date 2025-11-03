import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check for existing session on app load
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const user = await authService.login(email, password);
      setCurrentUser(user);
      toast.success(`Welcome back, ${user.name}!`);
    } catch (error) {
      throw error; // Re-throw to be handled by LoginModal
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      toast.success('Successfully logged out');
    } catch (error) {
      toast.error('Logout failed');
    }
};

return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} onShowLogin={() => setShowLoginModal(true)} onLogout={handleLogout} />} />
          <Route path="/cart" element={<Cart currentUser={currentUser} onShowLogin={() => setShowLoginModal(true)} onLogout={handleLogout} />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail currentUser={currentUser} onShowLogin={() => setShowLoginModal(true)} onLogout={handleLogout} />} />
          <Route path="/orders" element={<Orders currentUser={currentUser} onShowLogin={() => setShowLoginModal(true)} onLogout={handleLogout} />} />
          <Route path="/orders/:orderId/track" element={<OrderTracking currentUser={currentUser} onShowLogin={() => setShowLoginModal(true)} onLogout={handleLogout} />} />
          <Route path="/profile" element={<Profile currentUser={currentUser} onShowLogin={() => setShowLoginModal(true)} onLogout={handleLogout} />} />
          <Route path="/search" element={<Search currentUser={currentUser} onShowLogin={() => setShowLoginModal(true)} onLogout={handleLogout} />} />
        </Routes>
        
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
</div>
    </BrowserRouter>
  );
}

export default App;