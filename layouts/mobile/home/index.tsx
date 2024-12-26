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
        <div className='mt-1 ml-1 mr-1'>
          <div className='categories-container mt-3'>
            <CategoriesMenu />
          </div>
          <div className='banners-container mb-2'>
            <OwlCarousel
              adClass='owl-theme owl-dot-inner intro-slider animation-slider'
              options={mobileSlider}
            >
              {/* Banner 1 */}
              <div className='banner banner-fixed content-middle intro-slide intro-slide1 banner-radius'>
                <figure className='responsive-banner'>
                  <LazyLoadImage
                    src={
                      program.appBanner1 !== null
                        ? program.appBanner1
                        : program.hero1
                    }
                    alt='Banner'
                    className='responsive-image'
                  />
                </figure>
              </div>

              {/* Banner 2 */}
              <div className='banner banner-fixed content-middle intro-slide intro-slide2 banner-radius'>
                <figure className='responsive-banner'>
                  <LazyLoadImage
                    src={
                      program.appBanner2 !== null
                        ? program.appBanner2
                        : program.heroSection1
                    }
                    alt='Banner'
                    className='responsive-image'
                  />
                </figure>
              </div>

              {/* Banner 3 */}
              <div className='banner banner-fixed content-middle intro-slide intro-slide2 banner-radius'>
                <figure className='responsive-banner'>
                  <LazyLoadImage
                    src={
                      program.appBanner3 !== null
                        ? program.appBanner3
                        : program.heroSection2
                    }
                    alt='Banner'
                    className='responsive-image'
                  />
                </figure>
              </div>
            </OwlCarousel>
          </div>
        </div>

        <div className='container'>
          <InfiniteScrollComponent />
        </div>
      </div>
    </>
  );
};

export default withAuth(Home);
