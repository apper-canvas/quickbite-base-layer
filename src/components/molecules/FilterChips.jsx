import { useState } from "react";
import Badge from "@/components/atoms/Badge";

const FilterChips = ({ filters, onFilterChange, selectedFilters = [] }) => {
  const handleChipClick = (filterId) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleChipClick(filter.id)}
          className="transition-all duration-200 hover:scale-105"
        >
          <Badge
            variant={selectedFilters.includes(filter.id) ? "primary" : "default"}
            className="cursor-pointer"
          >
            {filter.label}
          </Badge>
        </button>
      ))}
    </div>
  );
};

export default FilterChips;