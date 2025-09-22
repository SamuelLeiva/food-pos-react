import React from 'react';
import type { MenuItem } from '../features/menu/types/MenuItem';

type Props = {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
};

export const MenuItemCard: React.FC<Props> = ({ item, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      onClick={() => onSelect(item)}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="text-md font-semibold text-gray-800 truncate">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-blue-600">
            ${item.price.toFixed(2)}
          </span>
          {item.price && (
            <span className="text-sm text-gray-400 line-through">
              ${item.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};