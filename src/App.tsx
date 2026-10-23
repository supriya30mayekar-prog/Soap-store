import React, { useState, useEffect } from 'react';
import { SOAP_PRODUCTS } from './data/soaps';
import { SoapProduct, CartItem, OrderDetails } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { TrioBuilder } from './components/TrioBuilder';
import { CraftStory } from './components/CraftStory';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ScentQuizModal } from './components/ScentQuizModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';

export default function App() {
  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('soapy_cart_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Start with 1 complimentary bar to showcase active cart
    return [{ product: SOAP_PRODUCTS[1], quantity: 1 }];
  });

  const [selectedProduct, setSelectedProduct] = useState<SoapProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<string>('');

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('soapy_cart_v2', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Cart operations
  const handleAddToCart = (product: SoapProduct, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => !it.isBundle && it.product.id === product.id
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity }];
    });

    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  const handleAddTrioToCart = (trioBars: SoapProduct[]) => {
    // Representative lead item is first bar, with custom trio bundle tag
    const leadProduct = trioBars[0];
    const bundleNames = trioBars.map((b) => b.name);

    setCartItems((prev) => [
      ...prev,
      {
        product: leadProduct,
        quantity: 1,
        isBundle: true,
        bundleItems: bundleNames,
      },
    ]);

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToCheckout = (discount: number, code: string) => {
    setAppliedDiscount(discount);
    setDiscountCode(code);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    setConfirmedOrder(order);
    setIsCheckoutOpen(false);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E2320]">
      {/* 3-Zone Top Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onShopClick={() => handleNavigate('products')}
          onQuizClick={() => setIsQuizOpen(true)}
          onTrioClick={() => handleNavigate('trio-builder')}
        />

        {/* Featured Products Catalog */}
        <ProductGrid
          products={SOAP_PRODUCTS}
          onSelectProduct={(soap) => setSelectedProduct(soap)}
          onAddToCart={(soap) => handleAddToCart(soap, 1)}
          addedProductId={addedProductId}
        />

        {/* Custom 3-Bar Bundle Trio Builder */}
        <TrioBuilder
          products={SOAP_PRODUCTS}
          onAddTrioToCart={handleAddTrioToCart}
        />

        {/* Traditional Craft & Saponification Story */}
        <CraftStory />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        soap={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(soap, qty) => {
          handleAddToCart(soap, qty);
          setSelectedProduct(null);
          setIsCartOpen(true);
        }}
      />

      {/* Scent & Skin Finder Quiz Modal */}
      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={SOAP_PRODUCTS}
        onAddToCart={(product) => {
          handleAddToCart(product, 1);
          setIsCartOpen(true);
        }}
      />

      {/* Slide-over Shopping Bag */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discount={appliedDiscount}
        discountCode={discountCode}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmed Receipt Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />
    </div>
  );
}
