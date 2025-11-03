import { toast } from 'react-toastify';

// Mock user data for demonstration
const mockUsers = [
  {
    Id: 1,
    name: "John Doe",
    email: "admin@example.com",
    password: "password123",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    Id: 2,
    name: "Jane Smith", 
    email: "user@example.com",
    password: "user123",
    phone: "+1 (555) 987-6543",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9f3c2c5?w=150&h=150&fit=crop&crop=face"
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const authService = {
  async login(email, password) {
    await delay(800); // Simulate network request
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Remove password from returned user object
    const { password: _, ...userWithoutPassword } = user;
    
    // Store in localStorage for session persistence
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  },

  async logout() {
    await delay(300); // Simulate cleanup delay
    
    // Clear stored user data
    localStorage.removeItem('currentUser');
    
    return true;
  },

  getCurrentUser() {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  },

  isAuthenticated() {
    return !!this.getCurrentUser();
  }
};

export default authService;