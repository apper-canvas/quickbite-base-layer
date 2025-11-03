import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import OrderTracker from "@/components/organisms/OrderTracker";

const OrderTracking = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-secondary mb-2">
              Track Your Order
            </h1>
            <p className="text-gray-600">
              Follow your delicious meal on its way to you!
            </p>
          </div>

          <OrderTracker orderId={orderId} />
        </motion.div>
      </main>
    </div>
  );
};

export default OrderTracking;