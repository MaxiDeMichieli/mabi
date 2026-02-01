import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Minus, Plus, X, ZoomIn } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/utils/format';
import { Loading } from '@/components/Loading';
import { ErrorMessage } from '@/components/ErrorMessage';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products, isLoading, error, refetch } = useProducts();
  const { addItem, openCart } = useCartStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const product = products.find((p) => p.id === productId);

  const images = product?.images && product.images.length > 0
    ? product.images
    : product?.imageUrl
    ? [product.imageUrl]
    : [];

  // Scroll inmediato al tope usando useLayoutEffect (sincrónico antes del paint)
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [productId]);

  // Scroll adicional después del render para asegurar
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
    return () => clearTimeout(timer);
  }, [productId]);

  useEffect(() => {
    setSelectedSize('');
    setQuantity(1);
    setCurrentImageIndex(0);
  }, [productId]);

  // Cerrar lightbox con ESC y navegación con flechas
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Si hay una entrada del lightbox en el historial, usar back
        if (window.history.state?.lightboxOpen) {
          window.history.back();
        } else {
          setIsLightboxOpen(false);
          document.body.style.overflow = 'unset';
        }
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  // Manejar botón atrás del navegador para cerrar lightbox
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (isLightboxOpen) {
        e.preventDefault();
        closeLightbox();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isLightboxOpen]);

  // Limpiar overflow al desmontar
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (isLoading) {
    return <Loading fullScreen message="Cargando producto..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-light text-gray-900 mb-4">
            Producto no encontrado
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 underline underline-offset-4 transition-colors"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;
  const canAddToCart = !isOutOfStock && (!product.hasSizes || selectedSize);

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    addItem(product, quantity, selectedSize || undefined);
    openCart();
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    // Agregar entrada al historial para el lightbox
    window.history.pushState({ lightboxOpen: true }, '');
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => {
            // Si hay una entrada del lightbox en el historial, usar back
            if (window.history.state?.lightboxOpen) {
              window.history.back();
            } else {
              closeLightbox();
            }
          }}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Si hay una entrada del lightbox en el historial, usar back
              if (window.history.state?.lightboxOpen) {
                window.history.back();
              } else {
                closeLightbox();
              }
            }}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-colors z-50"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full z-50">
              <span className="text-white text-sm font-light tracking-wide">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          )}

          {/* Main Image */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 sm:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentImageIndex]}
              alt={`${product.name} ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-colors"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-4 rounded-full transition-colors"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6">
              <div className="flex gap-3 sm:gap-4 overflow-x-auto py-2 px-1">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden transition-all ${
                      index === currentImageIndex
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm tracking-wide">Volver a la tienda</span>
        </button>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 overflow-hidden group cursor-zoom-in" onClick={openLightbox}>
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Zoom Indicator */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-6 h-6 text-gray-700" />
                </div>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors z-10"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors z-10"
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>
                </>
              )}

              {isOutOfStock && (
                <div className="absolute top-4 left-4 bg-gray-900 text-white text-sm font-medium px-4 py-2 tracking-wide">
                  AGOTADO
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2 px-1 -mx-1">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 overflow-hidden transition-all ${
                      index === currentImageIndex
                        ? 'ring-2 ring-gray-900 ring-offset-2'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8 lg:pt-8">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="space-y-2 mb-6">
                <div className="text-4xl font-light text-gray-900 tracking-wide">
                  {formatPrice(product.price)}
                </div>
                {!isOutOfStock && (
                  <p className="text-sm text-gray-500">
                    o 3 cuotas sin interés de <span className="font-medium">{formatPrice(product.price / 3)}</span>
                  </p>
                )}
              </div>

              {product.description && (
                <p className="text-gray-600 leading-relaxed text-base">
                  {product.description}
                </p>
              )}
            </div>

            {/* Stock Warning */}
            {!isOutOfStock && product.stock <= 10 && (
              <div className="border border-amber-100/50 bg-amber-50 px-4 py-3">
                <p className="text-sm text-amber-900">
                  Solo quedan <span className="font-semibold">{product.stock} unidades</span> disponibles
                </p>
              </div>
            )}

            {/* Size Selector */}
            {product.hasSizes && product.availableSizes && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-900 uppercase tracking-widest">
                  Talle
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border text-sm font-medium tracking-wide transition-all ${
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
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-900 uppercase tracking-widest">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="border border-gray-100/50 hover:border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed p-3 transition-colors"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
                  </button>

                  <span className="text-xl font-light text-gray-900 min-w-[3rem] text-center tracking-wide">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="border border-gray-100/50 hover:border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed p-3 transition-colors"
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
              className="w-full bg-gray-900 text-white py-5 text-sm font-medium uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isOutOfStock
                ? 'Agotado'
                : product.hasSizes && !selectedSize
                ? 'Selecciona un talle'
                : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
