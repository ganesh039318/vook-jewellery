import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { CartProvider, useCart } from './store/cart';
import Header from './components/Header';
import Ticker from './components/Ticker';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell() {
  const { isOpen } = useCart();
  return (
    <div className="min-h-dvh flex flex-col">
      <ScrollToTop />
      <div
        className="page-wrapper flex-1 flex flex-col"
        style={{ transform: isOpen ? 'translateX(-80px)' : 'none' }}
      >
        <Ticker />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  );
}
