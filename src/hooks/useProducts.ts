import { useState, useEffect } from 'react';
import { fetchStoreData } from '@/services/googleSheets';
import type { Category, Product } from '@/types';

interface UseProductsReturn {
  categories: Category[];
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface CachedData {
  categories: Category[];
  products: Product[];
  timestamp: number;
}

const CACHE_KEY = 'mabi_store_data';
const CACHE_DURATION = 100000; // 100 segundos en milisegundos

// Obtener datos del cache
const getCachedData = (): CachedData | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const data: CachedData = JSON.parse(cached);
    const now = Date.now();
    const isExpired = now - data.timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error reading cache:', error);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

// Guardar datos en el cache
const setCachedData = (categories: Category[], products: Product[]): void => {
  try {
    const data: CachedData = {
      categories,
      products,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving cache:', error);
  }
};

export function useProducts(): UseProductsReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (useCache = true) => {
    try {
      setIsLoading(true);
      setError(null);

      // Intentar obtener datos del cache primero
      if (useCache) {
        const cached = getCachedData();
        if (cached) {
          console.log('📦 Usando datos del cache');
          setCategories(cached.categories);
          setProducts(cached.products);
          setIsLoading(false);
          return;
        }
      }

      // Si no hay cache válido, hacer petición a la API
      console.log('🌐 Solicitando datos de la API');
      const data = await fetchStoreData();
      
      setCategories(data.categories);
      setProducts(data.products);

      // Guardar en cache
      setCachedData(data.categories, data.products);
    } catch (err) {
      console.error('Error fetching store data:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Error al cargar los productos. Por favor, intenta nuevamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    categories,
    products,
    isLoading,
    error,
    refetch: () => fetchData(false), // Forzar recarga desde API
  };
}
