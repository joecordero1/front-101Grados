import React, { useEffect, useState } from 'react';
import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import Custom Components
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';
import { introSlider } from '~/utils/data/carousel';
import { fadeInRightShorter, fadeInLeftShorter } from '~/utils/data/keyframes';

import { useProgram, useSpecialCatalogues } from 'hooks';

function IntroSection(props) {
  const { program } = useProgram();
  const { myCatalogues } = useSpecialCatalogues();
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  // Determinar si es móvil
  const isMobile = screenSize.dynamicWidth <= 990;

  return (
    <div className='row'>
      {!isMobile && (
        <div className='col-lg-9 mb-4'>
          <OwlCarousel
            adClass='owl-theme owl-dot-inner intro-slider animation-slider'
            options={introSlider}
          >
            <div
              className='banner banner-fixed content-middle intro-slide intro-slide1 banner-radius'
              style={{ backgroundColor: '#f8f8f8' }}
            >
              <figure>
                <LazyLoadImage
                  src={program.hero1}
                  alt='Banner'
                  width='330'
                  height='215'
                />
              </figure>
            </div>

            {myCatalogues.length > 0 &&
              myCatalogues.map((catalogue) => (
                <div
                  className='banner banner-fixed content-middle intro-slide intro-slide2 banner-radius'
                  style={{ backgroundColor: '#e2e2e3' }}
                >
                  <ALink
                    href={{
                      pathname: '/shop',
                      query: { catalogueId: catalogue.id },
                    }}
                  >
                    <figure>
                      <LazyLoadImage src={catalogue.coverImage2} alt='Banner' />
                    </figure>
                  </ALink>
                </div>
              ))}
          </OwlCarousel>
        </div>
      )}
      <div className='col-lg-3'>
        <div className='row cols-lg-1 cols-sm-2 cols-1'>
          <div className='intro-banner mb-4'>
            <div
              className='banner banner-fixed content-middle banner-radius overlay-zoom'
              style={{ backgroundColor: '#232323' }}
            >
              {myCatalogues.length > 0 ? (
                <ALink
                  href={{
                    pathname: '/shop',
                    query: { catalogueId: myCatalogues[0].id },
                  }}
                >
                  <figure>
                    <LazyLoadImage
                      src={
                        isMobile && program.heroMobile1
                          ? program.heroMobile1
                          : program.heroSection1
                      }
                      alt='Banner'
                      width='330'
                      height='215'
                    />
                  </figure>
                </ALink>
              ) : (
                <figure>
                  <LazyLoadImage
                    src={
                      isMobile && program.heroMobile1
                        ? program.heroMobile1
                        : program.heroSection1
                    }
                    alt='Banner'
                    width='330'
                    height='215'
                  />
                </figure>
              )}
            </div>
          </div>
          <div className='intro-banner mb-4'>
            <div
              className='banner banner-fixed content-middle banner-radius overlay-zoom'
              style={{ backgroundColor: '#eca5a9' }}
            >
              {myCatalogues.length > 0 ? (
                <ALink
                  href={{
                    pathname: '/shop',
                    query: { catalogueId: myCatalogues[0].id },
                  }}
                >
                  <figure>
                    <LazyLoadImage
                      src={
                        isMobile && program.heroMobile2
                          ? program.heroMobile2
                          : program.heroSection2
                      }
                      alt='Banner'
                      width='330'
                      height='215'
                    />
                  </figure>
                </ALink>
              ) : (
                <figure>
                  <LazyLoadImage
                    src={
                      isMobile && program.heroMobile2
                        ? program.heroMobile2
                        : program.heroSection2
                    }
                    alt='Banner'
                    width='330'
                    height='215'
                  />
                </figure>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(IntroSection);
