import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeItem: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, selectedSize) => {
        // Validate size if product requires it
        if (product.hasSizes && !selectedSize) {
          console.error('Size is required for this product');
          return;
        }

        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === selectedSize
          );

          if (existingItemIndex > -1) {
            // Update quantity if item already exists
            const newItems = [...state.items];
            const newQuantity = newItems[existingItemIndex].quantity + quantity;
            
            // Check stock
            if (newQuantity > product.stock) {
              console.warn('Not enough stock');
              return state;
            }
            
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newQuantity,
            };
            
            return { items: newItems };
          } else {
            // Add new item
            if (quantity > product.stock) {
              console.warn('Not enough stock');
              return state;
            }
            
            return {
              items: [
                ...state.items,
                {
                  product,
                  quantity,
                  selectedSize,
                },
              ],
            };
          }
        });
      },

      removeItem: (productId, selectedSize) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.product.id === productId && item.selectedSize === selectedSize)
          ),
        }));
      },

      updateQuantity: (productId, quantity, selectedSize) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedSize);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.product.id === productId && item.selectedSize === selectedSize) {
              // Check stock
              if (quantity > item.product.stock) {
                console.warn('Not enough stock');
                return item;
              }
              
              return { ...item, quantity };
            }
            return item;
          });
          
          return { items: newItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'mabi-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);
