import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/utils/format';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem, openCart } = useCartStore();

  const images = product?.images && product.images.length > 0 
    ? product.images 
    : product?.imageUrl 
    ? [product.imageUrl] 
    : [];

  useEffect(() => {
    // Reset state when product changes
    setSelectedSize('');
    setQuantity(1);
    setCurrentImageIndex(0);
  }, [product?.id]);

  useEffect(() => {
    // Lock body scroll when modal is open
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const isOutOfStock = product.stock === 0;
  const canAddToCart = !isOutOfStock && (!product.hasSizes || selectedSize);

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    
    addItem(product, quantity, selectedSize || undefined);
    onClose();
    openCart();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-3xl sm:rounded-lg max-h-[95vh] overflow-y-auto animate-slide-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
        </button>

        {/* Image Gallery */}
        <div className="relative aspect-square bg-gray-100">
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {images.length > 1 && (
            <>
              {/* Navigation buttons */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Stock badge */}
          {isOutOfStock && (
            <div className="absolute top-4 left-4 bg-gray-800 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
              Sin stock
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-6 sm:p-8 space-y-5">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
              {product.name}
            </h2>
            <p className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              3 cuotas sin interés de {formatPrice(product.price / 3)}
            </p>
          </div>

          {product.description && (
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.description}
            </p>
          )}

          {/* Stock info */}
          {!isOutOfStock && product.stock <= 10 && (
            <div className="bg-amber-50 border border-amber-100/50 rounded-lg p-3">
              <p className="text-sm text-amber-800 font-medium">
                ¡Solo quedan {product.stock} unidades disponibles!
              </p>
            </div>
          )}

          {/* Size Selector */}
          {product.hasSizes && product.availableSizes && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900 uppercase tracking-wide">
                Talle
              </label>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 border font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-100/50 hover:border-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {product.hasSizes && !selectedSize && (
                <p className="text-sm text-red-600">
                  Por favor selecciona un talle
                </p>
              )}
            </div>
          )}

          {/* Quantity Selector */}
          {!isOutOfStock && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-900 uppercase tracking-wide">
                Cantidad
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="border border-gray-100/50 hover:border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed p-2 transition-colors"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
                </button>
                
                <span className="text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
                  {quantity}
                </span>
                
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="border border-gray-100/50 hover:border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed p-2 transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className="w-full bg-gray-900 text-white py-4 font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mt-6"
          >
            {isOutOfStock
              ? 'Sin stock'
              : product.hasSizes && !selectedSize
              ? 'Selecciona un talle'
              : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  );
};
