import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { formatPrice } from '@/utils/format';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white block transition-all duration-500 hover:-translate-y-1 pb-6 border-b border-gray-50"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 mb-5">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Badges */}
        {isOutOfStock && (
          <div className="absolute top-4 left-4">
            <span className="bg-gray-900 text-white text-xs font-medium px-4 py-1.5 tracking-wide">
              AGOTADO
            </span>
          </div>
        )}
        {!isOutOfStock && isLowStock && (
          <div className="absolute top-4 left-4">
            <span className="bg-amber-500 text-white text-xs font-medium px-4 py-1.5 tracking-wide">
              ÚLTIMAS UNIDADES
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2 px-1">
        <h3 className="font-light text-gray-900 text-sm sm:text-base tracking-wide line-clamp-2 min-h-[2.5rem] group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>

        <div className="space-y-1">
          <div className={`text-lg font-light tracking-wide ${isOutOfStock ? 'text-gray-400' : 'text-gray-900'}`}>
            {formatPrice(product.price)}
          </div>
          
          {!isOutOfStock && (
            <div className="text-xs text-gray-500">
              3x {formatPrice(product.price / 3)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
