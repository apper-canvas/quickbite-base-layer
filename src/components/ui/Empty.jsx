import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  icon = "UtensilsCrossed",
  title = "Nothing here yet",
  message = "It looks like there's no content to display right now.",
  actionLabel = "Explore",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-10 h-10 text-primary" />
        </div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-display font-bold text-secondary mb-2"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 max-w-md text-lg"
      >
        {message}
      </motion.p>

      {onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onAction}
          className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-xl font-display font-semibold hover:scale-105 hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <ApperIcon name="Search" className="w-4 h-4" />
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;