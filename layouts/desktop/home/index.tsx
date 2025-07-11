import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

// Import Apollo Server and Query
import NewsletterModal from '~/components/features/modals/newsletter-modal';
import IntroSection from '~/components/partials/home/intro-section';
import ServiceBox from '~/components/partials/home/service-section';
import DealCollection from '~/components/partials/home/deal-collection';
import CategorySection from '~/components/partials/home/category-section';
import BannerOneSection from '~/components/partials/home/banner-one-section';
import VendorSection from '~/components/partials/home/vendor-section';
import Buyable from '~/components/partials/home/buyable';
import BannerTwoSection from '~/components/partials/home/banner-two-section';
import BestCollection from '~/components/partials/home/best-collection';

import { useItem, useAuth, useProgram, useSpecialCatalogues } from 'hooks';
import MultipleCategories from 'components/partials/home/multiple-categories';
import SpecialCatalogues from '~/components/partials/home/SpecialCatalogues';
import SpecialBannerFirst from '~/components/partials/home/SpecialCatalogues/SpecialBannerFirst';
import SpecialBannerSecond from '~/components/partials/home/SpecialCatalogues/SpecialBannerSecond';
import { InfiniteScrollComponent } from 'components/partials/shop/product-list/product-list-two';
import { withAuth } from 'components/AuthGuard';

import MainBanner from '~/components/partials/home/MainBanner'


function HomeDesktopPage() {
  const { availablePoints, loginWithToken, isLoggedIn, getAvailablePoints } =
    useAuth();
  const { myCatalogues } = useSpecialCatalogues();
  const { program } = useProgram();
  /*const featuredProduct = {
  id: '1',
  name: 'Producto destacado',
  imageUrl: '/images/celular.jpg',
  points: 120,
}
  */

// ID del producto destacado
  const featuredProductId = '3770'; // <-- Reemplaza con el ID real
  const { item: featuredProduct, loading: loadingFeatured } = useItem(featuredProductId);



  return (
    <div className='main home'>
      <Helmet>
        <title>Tienda - {program.name}</title>
      </Helmet>

      <h1 className='d-none'>Tienda - {program.name}</h1>

      <div className='page-content'>
        <div className='intro-section'>
          <div className='container'>
            <IntroSection />
            {/* Solo muestra el banner si el producto ya cargó */}
            {!loadingFeatured && featuredProduct && (
              <MainBanner
                product={{
  id: featuredProduct.award.id,
  name: featuredProduct.award.name,
  imageUrl: featuredProduct.award.mainImage,
  points: featuredProduct.points,
  brandName: featuredProduct.award.brand.name,
  model: featuredProduct.award.model,
  subcategories: featuredProduct.award.subcategories,
}}

              />
            )}
            <ServiceBox />
          </div>
        </div>

        {program.isStoreActive && (
          <>
            {availablePoints > 0 && <Buyable />}

            {myCatalogues.length > 0 && <SpecialCatalogues />}
            <DealCollection />

            {myCatalogues.length > 0 && <SpecialBannerFirst />}

            <CategorySection />
            {myCatalogues.length > 0 && <SpecialCatalogues />}
            <BannerOneSection />

            <VendorSection />

            <BannerTwoSection />

            <BestCollection />

            <MultipleCategories />

            {myCatalogues.length > 0 && <SpecialBannerSecond />}

            <div className='container'>
              <InfiniteScrollComponent />
            </div>
          </>
        )}
      </div>

      {!program.isStoreActive && (
        <h4 style={{ textAlign: 'center', marginBottom: 60 }}>
          La tienda se encuentra inhabilitada temporalmente <br />
          Vuelve a ingresar más tarde
        </h4>
      )}
      <NewsletterModal />
    </div>
  );
}

export default withAuth(HomeDesktopPage);
