import { motion } from "framer-motion";

const Loading = ({ variant = "cards" }) => {
  if (variant === "cards") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-md"
          >
            <div className="shimmer h-48 rounded-lg mb-4"></div>
            <div className="space-y-3">
              <div className="shimmer h-6 w-3/4 rounded"></div>
              <div className="shimmer h-4 w-full rounded"></div>
              <div className="flex justify-between items-center">
                <div className="shimmer h-4 w-16 rounded"></div>
                <div className="shimmer h-4 w-20 rounded"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="space-y-4 p-6">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 shadow-sm flex items-center space-x-4"
          >
            <div className="shimmer w-16 h-16 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="shimmer h-5 w-3/4 rounded"></div>
              <div className="shimmer h-4 w-full rounded"></div>
              <div className="shimmer h-4 w-1/2 rounded"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full"
      />
    </div>
  );
};

export default Loading;