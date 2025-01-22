import React from "react";

const PropertySkeleton = () => {
  return (
    <div className="animate-pulse w-full max-w-[400px] overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="h-[200px] bg-gray-200" /> {/* Image placeholder */}
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" /> {/* Title */}
          <div className="h-3 bg-gray-200 rounded w-full" /> {/* Address */}
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 bg-gray-200 rounded" /> /* Property details */
            ))}
          </div>
        </div>
        
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between">
            <div className="h-3 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
          <div className="flex justify-between">
            <div className="h-3 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
          <div className="flex justify-between">
            <div className="h-3 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
        
        <div className="h-8 bg-gray-200 rounded w-full" /> {/* Button */}
      </div>
    </div>
  );
};

export default PropertySkeleton;