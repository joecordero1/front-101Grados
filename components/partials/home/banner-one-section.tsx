import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { mainSlider6 } from '~/utils/data/carousel';

function BannerOneSection() {
  return (
    <section className="category-wrapper mt-10 pt-6 mb-10 pb-8">
      <div className="container">
        <OwlCarousel className="owl-theme" options={mainSlider6}>
          <div
            className="banner banner-fixed category-banner2 content-middle banner-radius"
            style={{ backgroundColor: '#373a3e' }}
          >
            <figure>
              <LazyLoadImage
                src="https://storage.googleapis.com/lala4_dev_bucket/store/images/0b1ee8b9-e9a5-4968-add2-6d99996df701-180a4aab-86d1-4d8d-b4c8-b6d3c5b9b682.jpg"
                alt="Category Banner"
                width="446"
                height="180"
              />
            </figure>
          </div>
          <div
            className="banner banner-fixed category-banner1 content-middle banner-radius"
            style={{ backgroundColor: '#e2e2e2' }}
          >
            <figure>
              <LazyLoadImage
                src="https://storage.googleapis.com/lala4_dev_bucket/store/images/491d9a4f-227d-45a0-9d09-aa338c6a62ae-b9f1b2e1-e37b-4145-9997-5600cd7280e0.jpg"
                alt="Category Banner"
                width="446"
                height="180"
              />
            </figure>
          </div>
          <div
            className="banner banner-fixed category-banner1 content-middle banner-radius"
            style={{ backgroundColor: '#d7d6d3' }}
          >
            <figure>
              <LazyLoadImage
                src="https://storage.googleapis.com/lala4_dev_bucket/store/images/59935b4d-2664-4287-be9b-ec1eb6d76ffd-9130edf4-6721-4b29-b34a-9b51d01d82ef.jpg"
                alt="Category Banner"
                width="446"
                height="180"
              />
            </figure>
          </div>
        </OwlCarousel>
      </div>
    </section>
  );
}

export default React.memo(BannerOneSection);
