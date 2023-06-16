import React from "react";
import Reveal from "react-awesome-reveal";
import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSpecialCatalogues from "~/hooks/useCatalogues";
import { introSlider } from "~/utils/data/carousel";
import { fadeInRightShorter } from "~/utils/data/keyframes";

function SpecialBannerSecond() {
  const { myCatalogues } = useSpecialCatalogues();
  return (
    <section className="newsletter-section mb-10 pb-7">
      <div className="container">
        <OwlCarousel
          adClass="owl-theme owl-dot-inner intro-slider animation-slider"
          options={introSlider}
        >
          {myCatalogues.length > 0 &&
            myCatalogues.map((catalogue) => (
              <div className="banner banner-radius">
                <figure>
                  <LazyLoadImage src={catalogue.coverImage4} alt="Banner" />
                </figure>
                <div className="banner-content text-right">
                  {/* 
                        // @ts-ignore */}
                  <Reveal keyframes={fadeInRightShorter} duration={1000}>
                    <ALink
                      href={{
                        pathname: "/shop",
                        query: { catalogueId: catalogue.id },
                      }}
                      className="btn btn-dark btn-outline btn-rounded mt-2"
                    >
                      Premios especiales para tí
                      <i className="d-icon-arrow-right"></i>
                    </ALink>
                  </Reveal>
                </div>
              </div>
            ))}
        </OwlCarousel>
      </div>
    </section>
  );
}

export default React.memo(SpecialBannerSecond);
