import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Cart } from '@/components/Cart';
import { HomePage } from '@/pages/HomePage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { config } from '@/config';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
        </Routes>

        {/* Shopping Cart */}
        <Cart />

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-50 py-12 sm:py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-gray-900 tracking-wide">
                {config.store.name}
              </h3>
              <p className="text-gray-500 text-sm tracking-widest uppercase">
                {config.store.description}
              </p>
              <div className="pt-6">
                <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
                <p className="text-xs text-gray-400 tracking-wide">
                  © {new Date().getFullYear()} Todos los derechos reservados
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
