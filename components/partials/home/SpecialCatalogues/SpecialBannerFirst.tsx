import React from "react";
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";

import { introSlider } from "~/utils/data/carousel";
import { fadeInRightShorter } from "~/utils/data/keyframes";
import { useSpecialCatalogues } from "hooks";

function SpecialBannerFirst() {
  const { myCatalogues } = useSpecialCatalogues();
  return (
    <section className="mb-5 pb-7">
      <div className="container">
        <OwlCarousel
          adClass="owl-theme owl-dot-inner intro-slider animation-slider"
          options={introSlider}
        >
          {myCatalogues.length > 0 &&
            myCatalogues.map((catalogue) => (
              <div className="banner banner-radius">
                <ALink
                  href={{
                    pathname: "/shop",
                    query: { catalogueId: catalogue.id },
                  }}
                >
                  <figure>
                    <LazyLoadImage src={catalogue.coverImage3} alt="Banner" />
                  </figure>
                </ALink>
                <div className="banner-content text-right">
                  {/* 
                        // @ts-ignore */}
                  <Reveal
                    keyframes={fadeInRightShorter}
                    duration={1000}
                  ></Reveal>
                </div>
              </div>
            ))}
        </OwlCarousel>
      </div>
    </section>
  );
}

export default React.memo(SpecialBannerFirst);
