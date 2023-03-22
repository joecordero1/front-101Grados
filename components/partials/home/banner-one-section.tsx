import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";
import { useProgram } from "~/hooks";

import { mainSlider6 } from "~/utils/data/carousel";

function BannerOneSection() {
  const { program } = useProgram();
  return (
    <section className="category-wrapper mt-10 pt-6 mb-10 pb-8">
      <div className="container">
        <OwlCarousel className="owl-theme" options={mainSlider6}>
          <div
            className="banner banner-fixed category-banner2 content-middle banner-radius"
            style={{ backgroundColor: "#373a3e" }}
          >
            <figure>
              <LazyLoadImage
                src={program.firstSecion1}
                alt="Category Banner"
                width="446"
                height="180"
              />
            </figure>
          </div>
          <div
            className="banner banner-fixed category-banner1 content-middle banner-radius"
            style={{ backgroundColor: "#e2e2e2" }}
          >
            <figure>
              <LazyLoadImage
                src={program.firstSecion2}
                alt="Category Banner"
                width="446"
                height="180"
              />
            </figure>
          </div>
          <div
            className="banner banner-fixed category-banner1 content-middle banner-radius"
            style={{ backgroundColor: "#d7d6d3" }}
          >
            <figure>
              <LazyLoadImage
                src={program.firstSecion3}
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
