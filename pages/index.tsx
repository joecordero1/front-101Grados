import React from 'react';
import { Helmet } from 'react-helmet';

import { useQuery } from '@apollo/react-hooks';

// Import Apollo Server and Query
import withApollo from '../server/apollo';
import { GET_HOME_DATA } from '../server/queries';

// import Home Components
import NewsletterModal from '~/components/features/modals/newsletter-modal';
import IntroSection from '~/components/partials/home/intro-section';
import ServiceBox from '~/components/partials/home/service-section';
import DealCollection from '~/components/partials/home/deal-collection';
import CategorySection from '~/components/partials/home/category-section';
import BannerOneSection from '~/components/partials/home/banner-one-section';
import VendorSection from '~/components/partials/home/vendor-section';
import Buyable from '~/components/partials/home/buyable';
import BannerTwoSection from '~/components/partials/home/banner-two-section';
import ClothingCollection from '~/components/partials/home/clothing-collection';
import BannerThreeSection from '~/components/partials/home/banner-three-section';
import FoodCollection from '~/components/partials/home/food-collection';
import BestCollection from '~/components/partials/home/best-collection';
import NewsletterSection from '~/components/partials/home/newsletter-section';
import BrandSection from '~/components/partials/home/brand-section';
import BlogSection from '~/components/partials/home/blog-section';
import RecentCollection from '~/components/partials/home/recent-collection';

function HomePage() {
  // const { data, loading, error } = useQuery( GET_HOME_DATA, { variables: { productsCount: 9 } } );
  const data = null;
  const loading = false;
  const onSale = data && data.specialProducts.onSale;
  const bestSelling = data && data.specialProducts.bestSelling;
  const latest = data && data.specialProducts.latest;
  const electronics = data && data.electronics.data;
  const clothings = data && data.clothings.data;
  const foods = data && data.foods.data;
  const posts = data && data.posts.data;

  return (
    <div className="main home">
      <Helmet>
        <title>Tienda - Home</title>
      </Helmet>

      <h1 className="d-none">Tienda - Home</h1>

      <div className="page-content">
        <div className="intro-section">
          <div className="container">
            <IntroSection />

            <ServiceBox />
          </div>
        </div>

        <DealCollection products={onSale} loading={loading} />

        <CategorySection />

        <BannerOneSection />

        <VendorSection />

        <Buyable />

        <BannerTwoSection />

        {/* <ClothingCollection products={clothings} loading={loading} /> */}

        {/* <BannerThreeSection />

        <FoodCollection products={foods} loading={loading} /> */}

        <BestCollection products={bestSelling} loading={loading} />

        {/* <NewsletterSection />

        <BrandSection />

        <BlogSection posts={posts} />

        <RecentCollection products={latest} loading={loading} /> */}
      </div>

      <NewsletterModal />
    </div>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(HomePage);
