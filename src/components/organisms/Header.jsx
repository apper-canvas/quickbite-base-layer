import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import LocationPicker from "@/components/molecules/LocationPicker";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState("Bangalore");
  const [cartItemCount] = useState(3); // This would come from global state

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLocationSelect = (location) => {
    setCurrentLocation(location.address);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        {/* Top Row - Logo and Actions */}
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="UtensilsCrossed" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                QuickBite
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/orders" className="text-secondary hover:text-primary transition-colors font-medium">
                Orders
              </Link>
              <Link to="/profile" className="text-secondary hover:text-primary transition-colors font-medium">
                Profile
              </Link>
            </nav>

            {/* Cart Button */}
            <Link to="/cart">
              <Button variant="outline" size="md" className="relative">
                <ApperIcon name="ShoppingCart" className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="md" className="md:hidden">
              <ApperIcon name="Menu" className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Bottom Row - Location and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
          <div className="lg:col-span-1">
            <LocationPicker
              currentLocation={currentLocation}
              onLocationSelect={handleLocationSelect}
            />
          </div>
          
          <div className="lg:col-span-2">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;