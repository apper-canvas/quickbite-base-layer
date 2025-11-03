import restaurantsData from "@/services/mockData/restaurants.json";

const restaurantService = {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...restaurantsData];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const restaurant = restaurantsData.find(r => r.Id === id);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    return { ...restaurant };
  },

  async create(restaurant) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...restaurantsData.map(r => r.Id)) + 1;
    const newRestaurant = { ...restaurant, Id: newId };
    restaurantsData.push(newRestaurant);
    return { ...newRestaurant };
  },

  async update(id, data) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = restaurantsData.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error("Restaurant not found");
    }
    restaurantsData[index] = { ...restaurantsData[index], ...data };
    return { ...restaurantsData[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = restaurantsData.findIndex(r => r.Id === id);
    if (index === -1) {
      throw new Error("Restaurant not found");
    }
    const deleted = restaurantsData.splice(index, 1)[0];
    return { ...deleted };
  },

  async searchByLocation(latitude, longitude, radius = 10) {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Simulate location-based filtering (in real app, would use geolocation calculations)
    return [...restaurantsData.filter(r => r.isOpen)];
  },

  async searchByCuisine(cuisines) {
    await new Promise(resolve => setTimeout(resolve, 250));
    if (!Array.isArray(cuisines) || cuisines.length === 0) {
      return [...restaurantsData];
    }
    return [...restaurantsData.filter(restaurant => 
      restaurant.cuisines.some(cuisine => cuisines.includes(cuisine))
    )];
  },

  async getPopular() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...restaurantsData.filter(r => r.rating >= 4.0).slice(0, 10)];
  }
};

export default restaurantService;