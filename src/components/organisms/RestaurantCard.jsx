import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import RatingDisplay from "@/components/molecules/RatingDisplay";
import ApperIcon from "@/components/ApperIcon";

const RestaurantCard = ({ restaurant, onClick }) => {
  const {
    id,
    name,
    description,
    coverImage,
    cuisines,
    rating,
    reviewCount,
    deliveryTime,
    minimumOrder,
    deliveryFee,
    isOpen
  } = restaurant;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={() => onClick(restaurant)}
    >
      <Card padding="none" className="overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={coverImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant={isOpen ? "success" : "error"} size="sm">
              {isOpen ? "Open" : "Closed"}
            </Badge>
          </div>

          {/* Delivery Fee Badge */}
          {deliveryFee === 0 && (
            <div className="absolute top-3 right-3">
              <Badge variant="accent" size="sm">
                Free Delivery
              </Badge>
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
              <RatingDisplay rating={rating} reviewCount={reviewCount} size="sm" showCount={false} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-display font-semibold text-secondary mb-1 line-clamp-1">
              {name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {description}
            </p>
          </div>

          {/* Cuisines */}
          <div className="flex flex-wrap gap-1 mb-3">
            {cuisines.slice(0, 3).map((cuisine, index) => (
              <Badge key={index} variant="default" size="sm">
                {cuisine}
              </Badge>
            ))}
            {cuisines.length > 3 && (
              <Badge variant="default" size="sm">
                +{cuisines.length - 3}
              </Badge>
            )}
          </div>

          {/* Info Row */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ApperIcon name="Clock" className="w-4 h-4" />
                <span>{deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="IndianRupee" className="w-4 h-4" />
                <span>₹{minimumOrder} min</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            disabled={!isOpen}
          >
            {isOpen ? "View Menu" : "Currently Closed"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default RestaurantCard;