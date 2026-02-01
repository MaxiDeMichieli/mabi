import React from 'react';
import { clsx } from 'clsx';
import type { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="bg-white border-b border-gray-50 sticky top-[100px] sm:top-[120px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {/* All products button */}
          <button
            onClick={() => onSelectCategory(null)}
            className={clsx(
              'px-4 sm:px-6 py-2 sm:py-2.5 text-xs font-medium whitespace-nowrap transition-all duration-300 tracking-widest uppercase flex-shrink-0',
              selectedCategory === null
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-100/50 hover:border-gray-200'
            )}
          >
            Todos
          </button>

          {/* Category buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={clsx(
                'px-4 sm:px-6 py-2 sm:py-2.5 text-xs font-medium whitespace-nowrap transition-all duration-300 tracking-widest uppercase flex-shrink-0',
                selectedCategory === category.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-100/50 hover:border-gray-200'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
