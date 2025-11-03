import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cartService from "@/services/api/cartService";
import orderService from "@/services/api/orderService";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Cart from "@/components/pages/Cart";
import Empty from "@/components/ui/Empty";
const CartDrawer = ({ isOpen, onClose, onCheckout }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadCartItems = async () => {
    try {
      setLoading(true);
      const items = await cartService.getCartItems();
      setCartItems(items);
    } catch (error) {
      console.error("Error loading cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      await cartService.removeItem(itemId);
    } else {
      await cartService.updateQuantity(itemId, quantity);
    }
    loadCartItems();
};

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
toast.warn('Your cart is empty');
      return;
    }
    
    try {
toast.info('Processing your order...');
      
      // Calculate order totals
      const subtotal = calculateTotal();
      const deliveryFee = 40;
      const total = subtotal + deliveryFee;
      
      // Create order from cart items
      const orderData = {
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          restaurant: item.restaurant
        })),
        subtotal,
        deliveryFee,
        total,
        status: 'confirmed',
        estimatedTime: '25-30 minutes'
      };
      
      const newOrder = await orderService.create(orderData);
      
      // Clear cart after successful order
      await cartService.clearCart();
toast.success('Order placed successfully!');
      // Close drawer and navigate
      onClose();
      navigate(`/orders/${newOrder.Id}/track`);
    } catch (error) {
      console.error('Checkout failed:', error);
toast.error('Failed to place order. Please try again.');
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadCartItems();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
    {isOpen && <>
        {/* Backdrop */}
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose} />
        {/* Drawer */}
        <motion.div
            initial={{
                x: "100%"
            }}
            animate={{
                x: 0
            }}
            exit={{
                x: "100%"
            }}
            transition={{
                type: "spring",
                damping: 25,
                stiffness: 200
            }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div
                className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="flex items-center gap-2">
                    <ApperIcon name="ShoppingCart" className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-display font-semibold text-secondary">Cart ({calculateTotalItems()}items)
                                        </h2>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                    <ApperIcon name="X" className="w-5 h-5" />
                </Button>
            </div>
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {loading ? <div className="flex justify-center py-8">
                    <ApperIcon name="Loader2" className="w-6 h-6 animate-spin text-primary" />
                </div> : cartItems.length === 0 ? <div className="text-center py-12">
                    <div
                        className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ApperIcon name="ShoppingCart" className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-secondary mb-2">Empty Cart</h3>
                    <p className="text-gray-600 mb-4">Add some delicious items to get started</p>
                    <Button variant="primary" onClick={onClose}>Browse Restaurants
                                          </Button>
                </div> : <div className="space-y-4">
                    {cartItems.map(item => <motion.div
                        key={item.Id}
                        layout
                        className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-secondary line-clamp-1">
                                        {item.name}
                                    </h4>
                                    <Badge variant={item.isVeg ? "veg" : "nonveg"} size="sm">
                                        {item.isVeg ? "VEG" : "NON-VEG"}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                    {item.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-primary">₹{item.price}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity(item.Id, item.quantity - 1)}
                                            className="w-8 h-8 p-0">
                                            <ApperIcon name="Minus" className="w-3 h-3" />
                                        </Button>
                                        <span className="text-sm font-medium text-secondary min-w-[2rem] text-center">
                                            {item.quantity}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => updateQuantity(item.Id, item.quantity + 1)}
                                            className="w-8 h-8 p-0">
                                            <ApperIcon name="Plus" className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>)}
                </div>}
            </div>
            {/* Footer */}
            {cartItems.length > 0 && <div className="border-t p-4 bg-gray-50">
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-secondary">Subtotal</span>
                        <span className="font-medium">₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-secondary">Delivery Fee</span>
                        <span className="font-medium">₹40</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold">
                        <span className="text-secondary">Total</span>
                        <span className="text-primary">₹{calculateTotal() + 40}</span>
                    </div>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}>Proceed to Checkout
                                    </Button>
            </div>}
        </motion.div>
    </>}
</AnimatePresence>
  );
};

export default CartDrawer;