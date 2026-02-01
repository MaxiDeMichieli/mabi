import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/utils/format';
import { openWhatsApp } from '@/utils/whatsapp';

export const Cart: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const total = getTotalPrice();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    openWhatsApp(items, total);
    closeCart();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-white shadow-2xl z-50 flex flex-col animate-slide-up sm:animate-none">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <h2 className="font-serif text-2xl font-light text-gray-900 tracking-wide">
            Carrito
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-6 py-16">
              <ShoppingBag className="w-24 h-24 text-gray-200" strokeWidth={1} />
              <div className="text-center space-y-2">
                <p className="text-lg font-light text-gray-700 tracking-wide">Tu carrito está vacío</p>
                <p className="text-sm text-gray-500">
                  Agrega productos para comenzar tu compra
                </p>
              </div>
            </div>
          ) : (
            <>
              {items.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                
                return (
                  <div
                    key={`${item.product.id}-${item.selectedSize || 'no-size'}`}
                    className="flex gap-5 pb-6 border-b border-gray-50 last:border-0"
                  >
                    {/* Product Image */}
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-28 h-28 object-cover"
                    />

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 pr-2">
                          <h3 className="font-light text-gray-900 text-sm line-clamp-2 mb-1">
                            {item.product.name}
                          </h3>
                          {item.selectedSize && (
                            <p className="text-xs text-gray-500 tracking-wide">
                              Talle {item.selectedSize}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedSize)}
                          className="text-gray-400 hover:text-gray-700 transition-colors"
                          aria-label="Eliminar producto"
                        >
                          <X className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-100/50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                            className="p-2 hover:bg-gray-50 transition-colors"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-3 h-3 text-gray-600" strokeWidth={1.5} />
                          </button>
                          
                          <span className="text-sm font-light text-gray-900 px-4 min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                            disabled={item.quantity >= item.product.stock}
                            className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-3 h-3 text-gray-600" strokeWidth={1.5} />
                          </button>
                        </div>

                        <span className="font-light text-lg text-gray-900 tracking-wide">{formatPrice(itemTotal)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-50 p-6 space-y-6 bg-white">
            {/* Total */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-light text-gray-600 tracking-wide uppercase">Total</span>
                <span className="text-3xl font-light text-gray-900 tracking-wide">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="text-xs text-gray-500 text-right">
                o 3 cuotas sin interés de {formatPrice(total / 3)}
              </p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full bg-gray-900 text-white py-5 text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Comprar por WhatsApp
            </button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Serás redirigido a WhatsApp para finalizar tu compra
            </p>
          </div>
        )}
      </div>
    </>
  );
};
