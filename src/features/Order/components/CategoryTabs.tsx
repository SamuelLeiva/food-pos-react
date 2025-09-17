import React from 'react';

type Props = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export const CategoryTabs: React.FC<Props> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    // Añadimos las clases para hacer el contenedor deslizable
    <div className="flex items-center gap-6 border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`
            flex items-center gap-2 py-3 px-1 text-md font-medium transition-colors
            ${
              selectedCategory === category
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }
          `}
        >
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
};