import React, { useEffect, useState } from "react";
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";

// import Custom Components
import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";
import { introSlider } from "~/utils/data/carousel";
import { fadeInRightShorter, fadeInLeftShorter } from "~/utils/data/keyframes";

import { useProgram, useSpecialCatalogues } from "hooks";

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
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);
  return (
    <div className="row">
      {screenSize.dynamicWidth > 990 && (
        <div className="col-lg-9 mb-4">
          <OwlCarousel
            adClass="owl-theme owl-dot-inner intro-slider animation-slider"
            options={introSlider}
          >
            <div
              className="banner banner-fixed content-middle intro-slide intro-slide1 banner-radius"
              style={{ backgroundColor: "#f8f8f8" }}
            >
              <figure>
                <LazyLoadImage
                  src={program.hero1}
                  alt="Banner"
                  width="330"
                  height="215"
                />
              </figure>

              {/* <div className="banner-content">
              <Reveal keyframes={fadeInLeftShorter} duration={1000}>
                <h5 className="banner-subtitle text-capitalize font-weight-normal">
                  Lifestyle Collection
                </h5>
                <h3 className="banner-title text-uppercase font-weight-bold ls-m">
                  for Ski Clothes
                </h3>
                <div className="banner-price-info font-weight-semi-bold text-body text-uppercase ls-m">
                  Sale Up To <span className="text-primary">30% Off</span>
                </div>
                <ALink
                  href="/shop"
                  className="btn btn-dark btn-outline btn-rounded"
                >
                  Shop Now<i className="d-icon-arrow-right"></i>
                </ALink>
              </Reveal>
            </div> */}
            </div>
            {myCatalogues.length > 0 &&
              myCatalogues.map((catalogue) => (
                <div
                  className="banner banner-fixed content-middle intro-slide intro-slide2 banner-radius"
                  style={{ backgroundColor: "#e2e2e3" }}
                >
                  <ALink
                    href={{
                      pathname: "/shop",
                      query: { catalogueId: catalogue.id },
                    }}
                  >
                    <figure>
                      <LazyLoadImage src={catalogue.coverImage2} alt="Banner" />
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

            {/* <div
            className="banner banner-fixed content-middle intro-slide intro-slide3 banner-radius"
            style={{ backgroundColor: '#d8dee4' }}
          >
            <figure>
              <LazyLoadImage
                src="images/home/slides/3.jpg"
                alt="Banner"
                width="1030"
                height="450"
              />
            </figure>
            <div className="banner-content">
              <Reveal keyframes={fadeInLeftShorter} duration={1000}>
                <h5 className="banner-subtitle text-capitalize font-weight-normal mb-1">
                  Must-Haves
                </h5>
                <h3 className="banner-title text-uppercase font-weight-bold ls-m">
                  for the season
                </h3>
                <div className="banner-price-info font-weight-semi-bold text-dark text-uppercase ls-m">
                  Start At <span className="text-primary">$230.00</span>
                </div>
                <p className="text-dark font-weight-normal">
                  * Get Plus Discount Buying Fashion
                </p>
                <ALink
                  href="/shop"
                  className="btn btn-dark btn-outline btn-rounded"
                >
                  Shop Now<i className="d-icon-arrow-right"></i>
                </ALink>
              </Reveal>
            </div>
          </div> */}
          </OwlCarousel>
        </div>
      )}
      <div className="col-lg-3">
        <div className="row cols-lg-1 cols-sm-2 cols-1">
          <div className="intro-banner mb-4">
            <div
              className="banner banner-fixed content-middle banner-radius overlay-zoom"
              style={{ backgroundColor: "#232323" }}
            >
              {myCatalogues.length > 0 ? (
                <ALink
                  href={{
                    pathname: "/shop",
                    query: { catalogueId: myCatalogues[0].id },
                  }}
                >
                  <figure>
                    <LazyLoadImage
                      src={program.heroSection1}
                      alt="Banner"
                      width="330"
                      height="215"
                    />
                  </figure>
                </ALink>
              ) : (
                <figure>
                  <LazyLoadImage
                    src={program.heroSection1}
                    alt="Banner"
                    width="330"
                    height="215"
                  />
                </figure>
              )}
            </div>
          </div>
          <div className="intro-banner mb-4">
            <div
              className="banner banner-fixed content-middle banner-radius overlay-zoom"
              style={{ backgroundColor: "#eca5a9" }}
            >
              {myCatalogues.length > 0 ? (
                <ALink
                  href={{
                    pathname: "/shop",
                    query: { catalogueId: myCatalogues[0].id },
                  }}
                >
                  <figure>
                    <LazyLoadImage
                      src={program.heroSection2}
                      alt="Banner"
                      width="330"
                      height="215"
                    />
                  </figure>
                </ALink>
              ) : (
                <figure>
                  <LazyLoadImage
                    src={program.heroSection2}
                    alt="Banner"
                    width="330"
                    height="215"
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
