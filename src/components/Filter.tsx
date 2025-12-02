import React from 'react';
import { Region } from '../types';

export type FilterRegion = Region | 'all';

interface FilterProps {
  selectedRegion: FilterRegion;
  onRegionChange: (region: FilterRegion) => void;
}

export const Filter: React.FC<FilterProps> = ({ selectedRegion, onRegionChange }) => {
  const regions: { id: FilterRegion; label: string }[] = [
    { id: 'all', label: '全部' },
    { id: 'hk', label: '香港區' },
    { id: 'kln', label: '九龍區' },
    { id: 'nt', label: '新界區' },
  ];

  return (
    <div className="filter-container">
      {regions.map((region) => (
        <button
          key={region.id}
          onClick={() => onRegionChange(region.id)}
          className={`filter-btn ${selectedRegion === region.id ? 'active' : ''}`}
        >
          {region.label}
        </button>
      ))}
    </div>
  );
};
