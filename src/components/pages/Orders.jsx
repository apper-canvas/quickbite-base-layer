import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import RatingDisplay from "@/components/molecules/RatingDisplay";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import orderService from "@/services/api/orderService";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      setError("Failed to load orders. Please try again.");
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const reorder = async (orderId) => {
    try {
      const order = orders.find(o => o.Id === orderId);
      if (order) {
        // In a real app, this would add items back to cart
        console.log("Reordering:", order);
        navigate("/checkout");
      }
    } catch (error) {
      console.error("Error reordering:", error);
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "delivered": return "success";
      case "cancelled": return "error";
      case "preparing": 
      case "out_for_delivery":
      case "nearby": return "warning";
      default: return "default";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "confirmed": return "Confirmed";
      case "preparing": return "Preparing";
      case "out_for_delivery": return "Out for Delivery";
      case "nearby": return "Nearby";
      case "delivered": return "Delivered";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  const filterOrders = (orders, tab) => {
    switch (tab) {
      case "active":
        return orders.filter(order => 
          ["confirmed", "preparing", "out_for_delivery", "nearby"].includes(order.status)
        );
      case "completed":
        return orders.filter(order => order.status === "delivered");
      case "cancelled":
        return orders.filter(order => order.status === "cancelled");
      default:
        return orders;
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = filterOrders(orders, activeTab);
  const tabs = [
    { id: "all", label: "All Orders", count: orders.length },
    { id: "active", label: "Active", count: filterOrders(orders, "active").length },
    { id: "completed", label: "Completed", count: filterOrders(orders, "completed").length },
    { id: "cancelled", label: "Cancelled", count: filterOrders(orders, "cancelled").length }
  ];

  if (loading) return <Loading variant="list" />;
  if (error) return <Error message={error} onRetry={loadOrders} />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-secondary mb-2">
                Your Orders
              </h1>
              <p className="text-gray-600">
                Track your food deliveries and reorder your favorites
              </p>
            </div>
            
            <Button
              onClick={() => navigate("/")}
              variant="primary"
              icon="Plus"
            >
              Order Again
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Empty
            icon="Package"
            title="No orders found"
            message={`You don't have any ${activeTab === "all" ? "" : activeTab} orders yet.`}
            actionLabel="Browse Restaurants"
            onAction={() => navigate("/")}
          />
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-secondary">
                          Order #{order.Id.toString().slice(-6)}
                        </h3>
                        <Badge 
                          variant={getStatusVariant(order.status)} 
                          size="md"
                        >
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <ApperIcon name="Store" className="w-4 h-4" />
                          <span>{order.restaurantName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ApperIcon name="Calendar" className="w-4 h-4" />
                          <span>{new Date(order.placedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ApperIcon name="ShoppingBag" className="w-4 h-4" />
                          <span>{order.items.length} items</span>
                        </div>
                      </div>

                      {/* Order Items Preview */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <span key={idx} className="text-sm text-gray-700">
                              {item.name} x {item.quantity}
                              {idx < Math.min(order.items.length, 3) - 1 && ","}
                            </span>
                          ))}
                          {order.items.length > 3 && (
                            <span className="text-sm text-gray-500">
                              +{order.items.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">
                          ₹{order.total}
                        </span>
                        
                        {order.rating && (
                          <RatingDisplay rating={order.rating} showCount={false} />
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 min-w-[150px]">
                      {["confirmed", "preparing", "out_for_delivery", "nearby"].includes(order.status) && (
                        <Button
                          onClick={() => navigate(`/orders/${order.Id}/track`)}
                          variant="primary"
                          size="sm"
                          icon="MapPin"
                        >
                          Track Order
                        </Button>
                      )}
                      
                      {order.status === "delivered" && (
                        <>
                          <Button
                            onClick={() => reorder(order.Id)}
                            variant="outline"
                            size="sm"
                            icon="RotateCcw"
                          >
                            Reorder
                          </Button>
                          {!order.rating && (
                            <Button
                              onClick={() => navigate(`/orders/${order.Id}/rate`)}
                              variant="ghost"
                              size="sm"
                              icon="Star"
                            >
                              Rate Order
                            </Button>
                          )}
                        </>
                      )}
                      
                      <Button
                        onClick={() => navigate(`/orders/${order.Id}`)}
                        variant="ghost"
                        size="sm"
                        icon="Eye"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;