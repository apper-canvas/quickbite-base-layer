import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const OrderTracker = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderSteps = [
    { id: "confirmed", label: "Order Confirmed", icon: "CheckCircle" },
    { id: "preparing", label: "Preparing", icon: "ChefHat" },
    { id: "out_for_delivery", label: "Out for Delivery", icon: "Truck" },
    { id: "nearby", label: "Nearby", icon: "MapPin" },
    { id: "delivered", label: "Delivered", icon: "Package" }
  ];

  useEffect(() => {
    // Simulate order tracking
    const simulateOrder = () => {
      setOrder({
        Id: orderId,
        status: "preparing",
        estimatedDeliveryTime: "2024-01-01T14:30:00Z",
        deliveryPartner: {
          name: "Rahul Kumar",
          phone: "+91 98765 43210",
          rating: 4.8
        },
        restaurant: {
          name: "Pizza Palace",
          phone: "+91 98765 43211"
        },
        items: [
          { name: "Margherita Pizza", quantity: 1, price: 299 },
          { name: "Garlic Bread", quantity: 1, price: 149 }
        ],
        total: 488
      });
      setLoading(false);
    };

    setTimeout(simulateOrder, 1000);
  }, [orderId]);

  const getCurrentStepIndex = () => {
    if (!order) return 0;
    return orderSteps.findIndex(step => step.id === order.status);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse bg-gray-200 h-48 rounded-xl"></div>
        <div className="animate-pulse bg-gray-200 h-32 rounded-xl"></div>
      </div>
    );
  }

  const currentStep = getCurrentStepIndex();

  return (
    <div className="space-y-6">
      {/* Order Status Progress */}
      <Card>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-display font-bold text-secondary mb-2">
            Order #{order.Id.slice(-6)}
          </h2>
          <p className="text-gray-600">
            Estimated delivery: {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            {orderSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-primary to-accent text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <ApperIcon name={step.icon} className="w-6 h-6" />
                </motion.div>
                <span className={`text-xs font-medium text-center ${
                  index <= currentStep ? "text-primary" : "text-gray-400"
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Line */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / (orderSteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>
      </Card>

      {/* Delivery Partner Info */}
      {order.deliveryPartner && (
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-secondary">
                  {order.deliveryPartner.name}
                </h3>
                <div className="flex items-center gap-1">
                  <ApperIcon name="Star" className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm text-gray-600">
                    {order.deliveryPartner.rating}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" icon="Phone">
              Call
            </Button>
          </div>
        </Card>
      )}

      {/* Order Details */}
      <Card>
        <h3 className="font-medium text-secondary mb-3">Order Details</h3>
        <div className="space-y-2 mb-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-600">
                {item.name} x {item.quantity}
              </span>
              <span className="font-medium">₹{item.price}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-2">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-primary">₹{order.total}</span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" icon="Phone">
          Call Restaurant
        </Button>
        <Button variant="outline" className="flex-1" icon="MessageCircle">
          Chat Support
        </Button>
      </div>
    </div>
  );
};

export default OrderTracker;