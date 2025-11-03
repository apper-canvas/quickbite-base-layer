import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import RatingDisplay from "@/components/molecules/RatingDisplay";
import CartDrawer from "@/components/organisms/CartDrawer";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import restaurantService from "@/services/api/restaurantService";
import cartService from "@/services/api/cartService";

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const loadRestaurant = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await restaurantService.getById(parseInt(id));
      setRestaurant(data);
    } catch (err) {
      setError("Failed to load restaurant details. Please try again.");
      console.error("Error loading restaurant:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (menuItem) => {
    try {
      const cartItem = {
        ...menuItem,
        restaurantId: restaurant.Id,
        restaurantName: restaurant.name,
        quantity: 1
      };
      await cartService.addItem(cartItem);
      toast.success(`${menuItem.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    loadRestaurant();
  }, [id]);

  if (loading) return <Loading variant="cards" />;
  if (error) return <Error message={error} onRetry={loadRestaurant} />;
  if (!restaurant) return <Error message="Restaurant not found" showRetry={false} />;

  const categories = ["All", ...new Set(restaurant.menu.map(item => item.category))];
  const filteredMenu = selectedCategory === "All" 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Restaurant Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          <div className="h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
            <img
              src={restaurant.coverImage}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Back Button */}
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="md"
              className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-secondary hover:bg-white"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            </Button>

            {/* Restaurant Status */}
            <div className="absolute top-4 right-4">
              <Badge variant={restaurant.isOpen ? "success" : "error"} size="md">
                {restaurant.isOpen ? "Open Now" : "Closed"}
              </Badge>
            </div>

            {/* Restaurant Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {restaurant.name}
              </h1>
              <p className="text-lg mb-3 opacity-90">
                {restaurant.description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <RatingDisplay 
                  rating={restaurant.rating} 
                  reviewCount={restaurant.reviewCount}
                  size="md"
                />
                <div className="flex items-center gap-1">
                  <ApperIcon name="Clock" className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ApperIcon name="IndianRupee" className="w-4 h-4" />
                  <span>₹{restaurant.minimumOrder} min order</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cuisines */}
          <div className="flex flex-wrap gap-2 mb-6">
            {restaurant.cuisines.map((cuisine, index) => (
              <Badge key={index} variant="primary" size="md">
                {cuisine}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Menu Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <h3 className="font-display font-semibold text-lg text-secondary mb-4">
                Menu Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-primary to-accent text-white"
                        : "text-secondary hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-display font-semibold text-secondary mb-6"
            >
              {selectedCategory} Menu
            </motion.h2>

            <div className="space-y-4">
              {filteredMenu.map((item, index) => (
                <motion.div
                  key={item.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-medium text-secondary">
                            {item.name}
                          </h4>
                          <Badge 
                            variant={item.isVeg ? "veg" : "nonveg"} 
                            size="sm"
                          >
                            {item.isVeg ? "VEG" : "NON-VEG"}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3 text-sm">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary">
                            ₹{item.price}
                          </span>
                          
                          <Button
                            onClick={() => addToCart(item)}
                            variant="primary"
                            size="sm"
                            disabled={!item.isAvailable || !restaurant.isOpen}
                          >
                            {!item.isAvailable ? "Not Available" : "Add to Cart"}
                          </Button>
                        </div>

                        {item.dietaryInfo && item.dietaryInfo.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.dietaryInfo.map((info, i) => (
                              <Badge key={i} variant="default" size="sm">
                                {info}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {item.image && (
                        <div className="w-24 h-24 md:w-32 md:h-32">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Floating Cart Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-accent text-white rounded-full shadow-2xl flex items-center justify-center z-40"
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

export default RestaurantDetail;