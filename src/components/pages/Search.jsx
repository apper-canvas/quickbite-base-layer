import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import RestaurantGrid from "@/components/organisms/RestaurantGrid";
import FilterChips from "@/components/molecules/FilterChips";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortBy, setSortBy] = useState("rating");
  const [priceRange, setPriceRange] = useState("all");
  const [deliveryTime, setDeliveryTime] = useState("all");
  const [minRating, setMinRating] = useState("all");

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

  const handleSearch = () => {
    setSearchParams({ q: searchQuery });
  };

  const handleRestaurantSelect = (restaurant) => {
    navigate(`/restaurant/${restaurant.Id}`);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setPriceRange("all");
    setDeliveryTime("all");
    setMinRating("all");
  };

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h1 className="text-3xl font-display font-bold text-secondary mb-4">
              Find Your Perfect Meal
            </h1>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search restaurants, cuisines, dishes..."
                  icon="Search"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} variant="primary" size="md">
                Search
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-semibold text-secondary">
                  Filters
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearFilters}
                  className="text-primary"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Cuisines */}
                <div>
                  <h4 className="font-medium text-secondary mb-3">Cuisines</h4>
                  <FilterChips
                    filters={cuisineFilters}
                    selectedFilters={selectedFilters}
                    onFilterChange={setSelectedFilters}
                  />
                </div>

                {/* Sort By */}
                <div>
                  <Select
                    label="Sort By"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="rating">Rating</option>
                    <option value="deliveryTime">Delivery Time</option>
                    <option value="minimumOrder">Min Order</option>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Select
                    label="Price Range"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <option value="all">All Prices</option>
                    <option value="budget">₹ Budget Friendly</option>
                    <option value="mid">₹₹ Mid Range</option>
                    <option value="premium">₹₹₹ Premium</option>
                  </Select>
                </div>

                {/* Delivery Time */}
                <div>
                  <Select
                    label="Delivery Time"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                  >
                    <option value="all">Any Time</option>
                    <option value="fast">Under 30 min</option>
                    <option value="medium">30-45 min</option>
                    <option value="slow">45+ min</option>
                  </Select>
                </div>

                {/* Rating */}
                <div>
                  <Select
                    label="Minimum Rating"
                    value={minRating}
                    onChange={(e) => setMinRating(e.target.value)}
                  >
                    <option value="all">Any Rating</option>
                    <option value="4">4.0+ ⭐⭐⭐⭐</option>
                    <option value="4.5">4.5+ ⭐⭐⭐⭐⭐</option>
                  </Select>
                </div>

                {/* Quick Filters */}
                <div>
                  <h4 className="font-medium text-secondary mb-3">Quick Filters</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ApperIcon name="Truck" className="w-4 h-4 mr-2" />
                      Free Delivery
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ApperIcon name="Leaf" className="w-4 h-4 mr-2" />
                      Pure Veg
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ApperIcon name="Star" className="w-4 h-4 mr-2" />
                      Top Rated
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {searchQuery && (
                <div className="mb-6">
                  <h2 className="text-xl font-display font-semibold text-secondary mb-2">
                    Search results for "{searchQuery}"
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ApperIcon name="MapPin" className="w-4 h-4" />
                    <span>Delivering to Bangalore</span>
                  </div>
                </div>
              )}

              {/* Active Filters */}
              {selectedFilters.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-secondary">Active filters:</span>
                    {selectedFilters.map((filter) => (
                      <Badge
                        key={filter}
                        variant="primary"
                        className="cursor-pointer"
                        onClick={() => setSelectedFilters(prev => prev.filter(f => f !== filter))}
                      >
                        {filter}
                        <ApperIcon name="X" className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <RestaurantGrid
                filters={selectedFilters}
                searchQuery={searchQuery}
                sortBy={sortBy}
                onRestaurantSelect={handleRestaurantSelect}
              />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;