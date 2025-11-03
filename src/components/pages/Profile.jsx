import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import Header from "@/components/organisms/Header";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  const [addresses] = useState([
    {
      Id: 1,
      label: "Home",
      addressLine1: "123 Main Street",
      addressLine2: "Apartment 4B",
      landmark: "Near Central Park",
      city: "Bangalore",
      isDefault: true
    },
    {
      Id: 2,
      label: "Work",
      addressLine1: "456 Business District",
      addressLine2: "Floor 15, Tower A",
      landmark: "Opposite Metro Station",
      city: "Bangalore",
      isDefault: false
    }
  ]);

  const [paymentMethods] = useState([
    {
      Id: 1,
      type: "card",
      last4: "1234",
      brand: "Visa",
      isDefault: true
    },
    {
      Id: 2,
      type: "upi",
      identifier: "john@paytm",
      isDefault: false
    }
  ]);

const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "addresses", label: "Addresses", icon: "MapPin" },
    { id: "payments", label: "Payments", icon: "CreditCard" },
    { id: "preferences", label: "Preferences", icon: "Settings" }
  ];

const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      // Clear user data and redirect to home
      localStorage.removeItem('authToken');
      sessionStorage.clear();
      window.location.href = '/';
    }
  };

  const handleProfileUpdate = () => {
    console.log("Profile updated:", profileData);
  };

  const renderProfileContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
              <Input
                label="Email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />
              <Input
                label="Phone"
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </div>
            
            <Button onClick={handleProfileUpdate} variant="primary" className="w-full">
              Update Profile
            </Button>
          </div>
        );

      case "addresses":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-secondary">Saved Addresses</h3>
              <Button variant="primary" size="sm" icon="Plus">
                Add Address
              </Button>
            </div>
            
            {addresses.map((address) => (
              <Card key={address.Id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-secondary">{address.label}</h4>
                      {address.isDefault && (
                        <Badge variant="primary" size="sm">Default</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {address.addressLine1}, {address.addressLine2}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.landmark}, {address.city}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" icon="Edit2" />
                    <Button variant="ghost" size="sm" icon="Trash2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

      case "payments":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-secondary">Payment Methods</h3>
              <Button variant="primary" size="sm" icon="Plus">
                Add Payment Method
              </Button>
            </div>
            
            {paymentMethods.map((method) => (
              <Card key={method.Id} className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                      <ApperIcon name={method.type === "card" ? "CreditCard" : "Smartphone"} className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary">
                        {method.type === "card" ? 
                          `${method.brand} ending in ${method.last4}` : 
                          method.identifier
                        }
                      </p>
                      {method.isDefault && (
                        <Badge variant="primary" size="sm">Default</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" icon="Edit2" />
                    <Button variant="ghost" size="sm" icon="Trash2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        );

case "preferences":
        return (
          <div className="space-y-6">
            <Card className="p-4">
              <h4 className="font-medium text-secondary mb-3">Notifications</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Order Updates</span>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Promotions</span>
                  <Button variant="outline" size="sm">Disabled</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">New Restaurants</span>
                  <Button variant="outline" size="sm">Enabled</Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-medium text-secondary mb-3">Dietary Preferences</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Vegetarian</Badge>
                <Badge variant="default">Gluten-Free</Badge>
                <Badge variant="default">Vegan</Badge>
                <Badge variant="default">Keto</Badge>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-medium text-secondary mb-3">Account</h4>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  icon="LogOut"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-secondary mb-2">
              Account Settings
            </h1>
            <p className="text-gray-600">
              Manage your profile, addresses, and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-primary to-accent text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <ApperIcon name={tab.icon} className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              <Card className="p-6">
                {renderProfileContent()}
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;