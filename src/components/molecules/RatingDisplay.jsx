import ApperIcon from "@/components/ApperIcon";

const RatingDisplay = ({ 
  rating, 
  reviewCount = 0, 
  size = "sm",
  showCount = true 
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <ApperIcon 
            key={i} 
            name="Star" 
            className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} fill-accent text-accent`} 
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <ApperIcon 
              name="Star" 
              className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} text-gray-300`} 
            />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <ApperIcon 
                name="Star" 
                className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} fill-accent text-accent`} 
              />
            </div>
          </div>
        );
      } else {
        stars.push(
          <ApperIcon 
            key={i} 
            name="Star" 
            className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} text-gray-300`} 
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {renderStars()}
      </div>
      <span className="text-sm font-medium text-secondary">
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount > 0 && (
        <span className="text-sm text-gray-500">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default RatingDisplay;