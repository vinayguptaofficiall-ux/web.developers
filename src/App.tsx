import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { LandingPage } from './pages/LandingPage';
import { BusinessPage } from './pages/BusinessPage';
import { MenuImagesAdminPage } from './pages/MenuImagesAdminPage';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Root Hub Selector Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Explicit Business Routes */}
            <Route path="/a3-kitchen" element={<BusinessPage businessSlug="a3-kitchen" />} />
            <Route path="/froth-and-friends" element={<BusinessPage businessSlug="froth-and-friends" />} />
            <Route path="/arise-cafe" element={<BusinessPage businessSlug="arise-cafe" />} />

            {/* Admin */}
            <Route path="/admin/menu-images" element={<MenuImagesAdminPage />} />

            {/* Catch-all dynamic slug route */}
            <Route path="/:slug" element={<BusinessPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
};

export default App;
