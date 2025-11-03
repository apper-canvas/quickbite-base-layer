import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import RestaurantGrid from "@/components/organisms/RestaurantGrid";
import FilterChips from "@/components/molecules/FilterChips";
import CartDrawer from "@/components/organisms/CartDrawer";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const Home = () => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortBy, setSortBy] = useState("rating");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cuisineFilters = [
    { id: "Indian", label: "Indian" },
    { id: "Chinese", label: "Chinese" },
    { id: "Italian", label: "Italian" },
    { id: "American", label: "American" },
    { id: "Thai", label: "Thai" },
    { id: "Mexican", label: "Mexican" },
    { id: "Japanese", label: "Japanese" },
    { id: "Lebanese", label: "Lebanese" }
  ];

  const handleRestaurantSelect = (restaurant) => {
    navigate(`/restaurant/${restaurant.Id}`);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8 mb-8"
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-secondary mb-4">
              Hungry? We've got you{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                covered
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover amazing food from the best restaurants in your area. 
              Fast delivery, great prices, and delicious meals await!
            </p>
          </div>
        </motion.section>

        {/* Quick Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-display font-semibold text-secondary mb-4">
            What's on your mind?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: "Pizza", icon: "Pizza", color: "from-red-400 to-red-600" },
              { name: "Burger", icon: "Beef", color: "from-yellow-400 to-yellow-600" },
              { name: "Chinese", icon: "UtensilsCrossed", color: "from-green-400 to-green-600" },
              { name: "Indian", icon: "Flame", color: "from-orange-400 to-orange-600" },
              { name: "Desserts", icon: "Cake", color: "from-pink-400 to-pink-600" },
              { name: "Healthy", icon: "Salad", color: "from-emerald-400 to-emerald-600" },
              { name: "Coffee", icon: "Coffee", color: "from-amber-400 to-amber-600" },
              { name: "More", icon: "MoreHorizontal", color: "from-purple-400 to-purple-600" }
            ].map((category, index) => (
              <motion.button
                key={category.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => setSelectedFilters([category.name])}
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <ApperIcon name={category.icon} className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-secondary">{category.name}</p>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Filters and Sorting */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-display font-semibold text-secondary mb-3">
                Restaurants near you
              </h2>
              <FilterChips
                filters={cuisineFilters}
                selectedFilters={selectedFilters}
                onFilterChange={setSelectedFilters}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="min-w-[150px]"
              >
                <option value="rating">Sort by Rating</option>
                <option value="deliveryTime">Delivery Time</option>
                <option value="minimumOrder">Min Order</option>
              </Select>
              
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ApperIcon name="ShoppingCart" className="w-5 h-5" />
                <Badge 
                  variant="primary" 
                  size="sm" 
                  className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Restaurant Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <RestaurantGrid
            filters={selectedFilters}
            sortBy={sortBy}
            onRestaurantSelect={handleRestaurantSelect}
          />
        </motion.section>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Floating Cart Button - Mobile */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-2xl flex items-center justify-center z-40 md:hidden"
      >
        <ApperIcon name="ShoppingCart" className="w-6 h-6" />
        <Badge 
          variant="accent" 
          size="sm" 
          className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center text-xs text-secondary"
        >
          3
        </Badge>
      </motion.button>
    </div>
  );
};

export default Home;