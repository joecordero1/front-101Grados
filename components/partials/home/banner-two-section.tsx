import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function BannerTwoSection() {
  return (
    <section className="category-grid mb-10 pb-3">
      <div className="container">
        <div className="row cols-md-2 cols-1">
          <div className="banner-wrap mb-4">
            <div
              className="banner banner-fixed content-middle text-right banner-radius"
              style={{ backgroundColor: '#e1e2e2' }}
            >
              <figure>
                <LazyLoadImage
                  src="https://storage.googleapis.com/lala4_dev_bucket/store/images/a1182088-f4e4-4124-a433-95bd654c5c52-49fe00ee-f100-4dfe-b628-7980d4e31a38.jpg"
                  alt="Category Banner"
                  width="680"
                  height="240"
                />
              </figure>
            </div>
          </div>
          <div className="banner-wrap mb-4">
            <div
              className="banner banner-fixed content-middle banner-radius"
              style={{ backgroundColor: '#2a292d' }}
            >
              <figure>
                <LazyLoadImage
                  src="https://storage.googleapis.com/lala4_dev_bucket/store/images/ef38b26a-43c9-4ef7-bb00-10b1fba29bb8-abcc747d-d929-4cf4-b529-94120c13dd8f.jpg"
                  alt="Category Banner"
                  width="680"
                  height="240"
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
