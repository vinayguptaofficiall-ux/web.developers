import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { BUSINESSES } from '../data/businesses';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { BusinessInfo } from '../components/BusinessInfo';
import { MenuSection } from '../components/MenuSection';
import { FoodDetailModal } from '../components/FoodDetailModal';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { FloatingMobileCart } from '../components/FloatingMobileCart';
import { GallerySection } from '../components/GallerySection';
import { ReviewsSection } from '../components/ReviewsSection';
import { LocationSection } from '../components/LocationSection';
import { ContactCTA } from '../components/ContactCTA';
import { Footer } from '../components/Footer';
import { Helmet } from 'react-helmet-async';

interface BusinessPageProps {
  businessSlug?: string;
}

export const BusinessPage: React.FC<BusinessPageProps> = ({ businessSlug }) => {
  const params = useParams<{ slug: string }>();
  const activeSlug = businessSlug || params.slug;

  const business = activeSlug ? BUSINESSES[activeSlug] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSlug]);

  if (!business) {
    return <Navigate to="/a3-kitchen" replace />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": business.category.includes('Restaurant') ? "Restaurant" : "CafeOrCoffeeShop",
    "name": business.name,
    "image": business.hero.bgImage,
    "telephone": business.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.street,
      "addressLocality": "Vijayawada",
      "addressRegion": "Andhra Pradesh",
      "postalCode": business.address.pincode,
      "addressCountry": "IN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": business.rating,
      "reviewCount": business.reviewCount
    },
    "url": business.googleMapsUrl
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-300 relative">
      <Helmet>
        <title>{business.metaSEO.title}</title>
        <meta name="description" content={business.metaSEO.description} />
        <meta name="keywords" content={business.metaSEO.keywords.join(', ')} />
        <meta property="og:title" content={business.metaSEO.title} />
        <meta property="og:description" content={business.metaSEO.description} />
        <meta property="og:image" content={business.hero.bgImage} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Navbar currentBusiness={business} />

      <main className="flex-1">
        <Hero business={business} />
        <BusinessInfo business={business} />
        <MenuSection business={business} />
        <GallerySection business={business} />
        <ReviewsSection business={business} />
        <LocationSection business={business} />
        <ContactCTA business={business} />
      </main>

      <Footer business={business} />

      {/* Global Interactive E-Commerce Overlays */}
      <FoodDetailModal business={business} />
      <CartDrawer business={business} />
      <CheckoutModal business={business} />
      <FloatingMobileCart business={business} />
    </div>
  );
};
