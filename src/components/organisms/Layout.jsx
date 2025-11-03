import { Outlet, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '@/components/organisms/Header';
import LoginModal from '@/components/molecules/LoginModal';
import authService from '@/services/api/authService';

// Protected Route component
const ProtectedRoute = ({ children, currentUser, onShowLogin }) => {
  if (!currentUser) {
    onShowLogin();
    return null;
  }
  return children;
};

function Layout() {
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

  const contextValue = {
    currentUser,
    onShowLogin: () => setShowLoginModal(true),
    onLogout: handleLogout,
    ProtectedRoute: ({ children }) => (
      <ProtectedRoute currentUser={currentUser} onShowLogin={() => setShowLoginModal(true)}>
        {children}
      </ProtectedRoute>
    )
  };

  return (
    <div className="App">
      <Header 
        currentUser={currentUser} 
        onLogout={handleLogout} 
        onShowLogin={() => setShowLoginModal(true)} 
      />
      <Outlet context={contextValue} />
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default Layout;

// Custom hook for accessing outlet context
export const useAppContext = () => {
  return useOutletContext();
};