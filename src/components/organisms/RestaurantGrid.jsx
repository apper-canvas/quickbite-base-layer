import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RestaurantCard from "./RestaurantCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import restaurantService from "@/services/api/restaurantService";

const RestaurantGrid = ({ 
  filters = [], 
  searchQuery = "",
  sortBy = "rating",
  onRestaurantSelect 
}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      setError("");
      
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      
      let data = await restaurantService.getAll();
      
      // Apply search filter
      if (searchQuery) {
        data = data.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisines.some(cuisine => 
            cuisine.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply cuisine filters
      if (filters.length > 0) {
        data = data.filter(restaurant =>
          restaurant.cuisines.some(cuisine => filters.includes(cuisine))
        );
      }
      
      // Apply sorting
      switch (sortBy) {
        case "rating":
          data = data.sort((a, b) => b.rating - a.rating);
          break;
        case "deliveryTime":
          data = data.sort((a, b) => {
            const timeA = parseInt(a.deliveryTime.split("-")[0]);
            const timeB = parseInt(b.deliveryTime.split("-")[0]);
            return timeA - timeB;
          });
          break;
        case "minimumOrder":
          data = data.sort((a, b) => a.minimumOrder - b.minimumOrder);
          break;
        default:
          break;
      }
      
      setRestaurants(data);
    } catch (err) {
      setError("Failed to load restaurants. Please try again.");
      console.error("Error loading restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, [filters, searchQuery, sortBy]);

  if (loading) return <Loading variant="cards" />;
  if (error) return <Error message={error} onRetry={loadRestaurants} />;
  if (restaurants.length === 0) {
    return (
      <Empty
        icon="UtensilsCrossed"
        title="No restaurants found"
        message="Try adjusting your filters or search in a different area."
        actionLabel="Clear Filters"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {restaurants.map((restaurant, index) => (
        <motion.div
          key={restaurant.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <RestaurantCard
            restaurant={restaurant}
            onClick={onRestaurantSelect}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default RestaurantGrid;