import React, { useState, useMemo, useEffect } from 'react';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductCard } from '@/components/ProductCard';
import { Loading } from '@/components/Loading';
import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useProducts } from '@/hooks/useProducts';

const SCROLL_POSITION_KEY = 'home_scroll_position';

export const HomePage: React.FC = () => {
  const { categories, products, isLoading, error, refetch } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  // Restaurar posición del scroll al montar el componente
  useEffect(() => {
    const savedPosition = sessionStorage.getItem(SCROLL_POSITION_KEY);
    if (savedPosition) {
      // Usar setTimeout para asegurar que el DOM esté completamente renderizado
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition, 10));
        sessionStorage.removeItem(SCROLL_POSITION_KEY);
      }, 0);
    }
  }, []);

  // Guardar posición del scroll antes de desmontar
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    return <Loading fullScreen message="Cargando productos..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <>
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {filteredProducts.length === 0 ? (
          <EmptyState
            type={selectedCategory ? 'no-results' : 'no-products'}
            message={
              selectedCategory
                ? 'No hay productos en esta categoría'
                : 'Pronto agregaremos productos increíbles'
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};
