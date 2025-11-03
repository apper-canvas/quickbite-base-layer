import { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const LocationPicker = ({ onLocationSelect, currentLocation = null }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState(null);

  const detectLocation = () => {
    setIsDetecting(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: "Current Location" // In real app, reverse geocode this
          };
          setDetectedLocation(location);
          onLocationSelect(location);
          setIsDetecting(false);
        },
        (error) => {
          console.error("Location detection failed:", error);
          setIsDetecting(false);
        }
      );
    } else {
      console.error("Geolocation is not supported");
      setIsDetecting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-xl border border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
            <ApperIcon name="MapPin" className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-secondary">Delivery Location</p>
            <p className="text-sm text-gray-600">
              {currentLocation || detectedLocation ? 
                (currentLocation || detectedLocation.address) : 
                "Select your delivery address"
              }
            </p>
          </div>
        </div>
        
        <Button
          onClick={detectLocation}
          loading={isDetecting}
          variant="outline"
          size="sm"
          icon="Navigation"
        >
          {isDetecting ? "Detecting..." : "Detect"}
        </Button>
      </div>
    </div>
  );
};

export default LocationPicker;