import React from 'react';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { withAuth } from '~/components/AuthGuard';
import OwlCarousel from '~/components/features/owl-carousel';
import { InfiniteScrollComponent } from '~/components/partials/shop/product-list/product-list-two';
import { useProgram } from '~/hooks';
import { mobileSlider } from '~/utils/data/carousel';
import CategoriesMenu from './categoriesMenu';
import SearchForm from '../../../components/common/partials/footer-search-box';
const Home = () => {
  const { program } = useProgram();
  return (
    <>
      <div className='main-home'>
        <Helmet>
          <title>Tienda - {program.name}</title>
        </Helmet>
        <SearchForm />
        <div className='m-5'>
          <div className='categories-container mt-3 mb-3'>
            <CategoriesMenu />
          </div>
          <OwlCarousel
            adClass='owl-theme owl-dot-inner intro-slider animation-slider'
            options={mobileSlider}
          >
            <div
              className='banner banner-fixed content-middle intro-slide intro-slide1 banner-radius'
              style={{ backgroundColor: '#f8f8f8' }}
            >
              <figure>
                <LazyLoadImage
                  src={program.appBanner1}
                  alt='Banner'
                  width='100%'
                  height='100%'
                />
              </figure>
            </div>
            <div
              className='banner banner-fixed content-middle intro-slide intro-slide2 banner-radius'
              style={{ backgroundColor: '#f8f8f8' }}
            >
              <figure>
                <LazyLoadImage
                  src={program.appBanner2}
                  alt='Banner'
                  width='100%'
                  height='100%'
                />
              </figure>
            </div>

            <div
              className='banner banner-fixed content-middle intro-slide intro-slide3 banner-radius'
              style={{ backgroundColor: '#f8f8f8' }}
            >
              <figure>
                <LazyLoadImage
                  src={program.appBanner3}
                  alt='Banner'
                  width='100%'
                  height='100%'
                />
              </figure>
            </div>
          </OwlCarousel>
        </div>

        <div className='container'>
          <InfiniteScrollComponent />
        </div>
      </div>
    </>
  );
};

export default withAuth(Home);
