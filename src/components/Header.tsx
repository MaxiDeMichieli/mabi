import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { config } from '@/config';

export const Header: React.FC = () => {
  const { getTotalItems, openCart } = useCartStore();
  const itemCount = getTotalItems();

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-gray-900 text-center py-2.5 px-4">
        <p className="text-xs sm:text-sm text-gray-100 tracking-wide">
          Envío gratis en compras superiores a {config.store.currencySymbol}50.000
        </p>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <Link to="/" className="flex-1 group">
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 tracking-wide group-hover:text-gray-600 transition-colors">
                {config.store.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 tracking-widest uppercase">
                {config.store.description}
              </p>
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-3 hover:bg-gray-50 transition-colors group"
              aria-label={`Carrito de compras (${itemCount} ${itemCount === 1 ? 'producto' : 'productos'})`}
            >
              <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-gray-900 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
