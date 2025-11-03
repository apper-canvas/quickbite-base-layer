import cartItemsData from "@/services/mockData/cartItems.json";

const cartService = {
  async getCartItems() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...cartItemsData];
  },

  async addItem(item) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const existingItemIndex = cartItemsData.findIndex(
      cartItem => cartItem.Id === item.Id && cartItem.restaurantId === item.restaurantId
    );

    if (existingItemIndex >= 0) {
      // If item already exists, increase quantity
      cartItemsData[existingItemIndex].quantity += item.quantity || 1;
      return { ...cartItemsData[existingItemIndex] };
    } else {
      // Add new item
      const newItem = {
        ...item,
        quantity: item.quantity || 1
      };
      cartItemsData.push(newItem);
      return { ...newItem };
    }
  },

  async updateQuantity(itemId, quantity) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = cartItemsData.findIndex(item => item.Id === itemId);
    if (index === -1) {
      throw new Error("Item not found in cart");
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      const removed = cartItemsData.splice(index, 1)[0];
      return { ...removed };
    } else {
      cartItemsData[index].quantity = quantity;
      return { ...cartItemsData[index] };
    }
  },

  async removeItem(itemId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = cartItemsData.findIndex(item => item.Id === itemId);
    if (index === -1) {
      throw new Error("Item not found in cart");
    }
    const removed = cartItemsData.splice(index, 1)[0];
    return { ...removed };
  },

  async clearCart() {
    await new Promise(resolve => setTimeout(resolve, 200));
    cartItemsData.length = 0;
    return true;
  },

  async getCartSummary() {
    await new Promise(resolve => setTimeout(resolve, 150));
    const items = [...cartItemsData];
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    
    return {
      items,
      itemCount,
      subtotal,
      deliveryFee: subtotal >= 300 ? 0 : 40, // Free delivery over ₹300
      taxes: Math.round(subtotal * 0.09), // 9% tax
      total: subtotal + (subtotal >= 300 ? 0 : 40) + Math.round(subtotal * 0.09)
    };
  },

  async applyCoupon(couponCode) {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Simulate coupon validation
    const validCoupons = {
      "SAVE50": { discount: 50, type: "flat" },
      "PERCENT10": { discount: 10, type: "percentage" },
      "FIRSTORDER": { discount: 100, type: "flat", minOrder: 300 }
    };

    const coupon = validCoupons[couponCode.toUpperCase()];
    if (!coupon) {
      throw new Error("Invalid coupon code");
    }

    const summary = await this.getCartSummary();
    if (coupon.minOrder && summary.subtotal < coupon.minOrder) {
      throw new Error(`Minimum order of ₹${coupon.minOrder} required for this coupon`);
    }

    let discount = 0;
    if (coupon.type === "flat") {
      discount = coupon.discount;
    } else if (coupon.type === "percentage") {
      discount = Math.round(summary.subtotal * (coupon.discount / 100));
    }

    return {
      ...summary,
      discount,
      couponCode,
      total: Math.max(0, summary.total - discount)
    };
  }
};

export default cartService;