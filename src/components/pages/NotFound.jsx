import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <ApperIcon name="UtensilsCrossed" size={80} className="text-primary mx-auto mb-4" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-secondary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-secondary mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for seems to have gotten lost in our kitchen. 
          Let's get you back to the good stuff!
        </p>
        
        <div className="space-y-4">
          <Link to="/">
            <Button size="lg" className="w-full">
              <ApperIcon name="Home" size={20} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/search">
            <Button variant="outline" size="lg" className="w-full">
              <ApperIcon name="Search" size={20} className="mr-2" />
              Search Restaurants
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;