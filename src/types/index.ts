export interface Category {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  images?: string[]; // Multiple images
  stock: number;
  featured: boolean;
  hasSizes: boolean; // Para anillos con talles
  availableSizes?: string[]; // e.g., ["S", "M", "L"] or ["14", "16", "18", "20"]
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string; // Para productos con talle
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface StoreConfig {
  name: string;
  description: string;
  whatsappNumber: string;
  whatsappMessagePrefix: string;
  currencySymbol: string;
}
