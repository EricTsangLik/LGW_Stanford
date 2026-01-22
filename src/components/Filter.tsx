import React from 'react';
import { Region, CourseCategory } from '../types';

export type FilterRegion = Region | 'all';
export type FilterCategory = CourseCategory | 'all' | 'under3' | '3to12' | '12to18' | 'above18';

interface FilterProps {
  selectedRegion: FilterRegion;
  onRegionChange: (region: FilterRegion) => void;
  selectedCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
}

export const Filter: React.FC<FilterProps> = ({ 
  selectedRegion, 
  onRegionChange,
  selectedCategory,
  onCategoryChange
}) => {
  const regions: { id: FilterRegion; label: string }[] = [
    { id: 'all', label: '全部地區' },
    { id: 'hk', label: '香港區' },
    { id: 'kln', label: '九龍區' },
    { id: 'nt', label: '新界區' },
  ];

  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: '全部課程' },
    { id: 'under3', label: '3歲以下' },
    { id: '3to12', label: '3歲 - 12歲' },
    { id: '12to18', label: '12歲 - 18歲' },
    { id: 'above18', label: '18歲以上' },
  ];

  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Region Filter */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => onRegionChange(region.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
              selectedRegion === region.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            {region.label}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
              selectedCategory === cat.id
                ? 'bg-green-600 text-white border-green-600 shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};
