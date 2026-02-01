import React from 'react';
import { Search, Package } from 'lucide-react';

interface EmptyStateProps {
  type?: 'no-products' | 'no-results';
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-products',
  message,
}) => {
  const config = {
    'no-products': {
      icon: Package,
      title: 'No hay productos disponibles',
      description: message || 'Pronto agregaremos nuevos productos increíbles',
    },
    'no-results': {
      icon: Search,
      title: 'No encontramos productos',
      description: message || 'Intenta con otra categoría o vuelve más tarde',
    },
  };

  const { icon: Icon, title, description } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md">{description}</p>
    </div>
  );
};
