import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useProgram } from '~/hooks';

function BannerTwoSection() {
  const { program } = useProgram();
  return (
    <section className='category-grid mb-10 pb-3'>
      <div className='container'>
        <div className='row cols-md-2 cols-1'>
          <div className='banner-wrap mb-4'>
            <div
              className='banner banner-fixed content-middle text-right banner-radius'
              style={{ backgroundColor: '#e1e2e2' }}
            >
              <figure>
                <LazyLoadImage
                  src={program.secondSecion1}
                  alt='Category Banner'
                  width='680'
                  height='240'
                />
              </figure>
            </div>
          </div>
          <div className='banner-wrap mb-4'>
            <div
              className='banner banner-fixed content-middle banner-radius'
              style={{ backgroundColor: '#2a292d' }}
            >
              <figure>
                <LazyLoadImage
                  src={program.secondSecion2}
                  alt='Category Banner'
                  width='680'
                  height='240'
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(BannerTwoSection);
