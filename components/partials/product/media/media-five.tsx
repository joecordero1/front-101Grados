import { useState, useEffect } from "react";
import { Magnifier } from "react-image-magnifiers";

import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";

import ThumbTwo from "~/components/partials/product/thumb/thumb-two";
import MediaLightBox from "~/components/partials/product/light-box";

import { mainSlider3 } from "~/utils/data/carousel";
import { CartItem, CatalogueItem } from "~/utils/types";

export default function MediaFive(props: {
  product: CatalogueItem;
  adClass?: any;
}) {
  const { product, adClass = "" } = props;
  const [index, setIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [isOpen, setOpenState] = useState(false);
  const [mediaRef, setMediaRef] = useState(null);

  useEffect(() => {
    setIndex(0);
  }, [window.location.pathname]);

  useEffect(() => {
    if (mediaRef !== null && mediaRef.current !== null && index >= 0) {
      mediaRef.current.$car.to(index, 300, true);
    }
  }, [index]);

  const setIndexHandler = (mediaIndex) => {
    if (mediaIndex !== index) {
      setIndex(mediaIndex);
    }
  };

  const changeRefHandler = (carRef) => {
    if (carRef.current !== undefined) {
      setMediaRef(carRef);
    }
  };

  const changeOpenState = (openState) => {
    setOpenState(openState);
  };

  const openLightBox = () => {
    setOpenState(true);
  };

  let events = {
    onTranslate: function (e) {
      if (!e.target) return;
      if (document.querySelector(".product-thumbs")) {
        document
          .querySelector(".product-thumbs")
          .querySelector(".product-thumb.active")
          .classList.remove("active");
        document
          .querySelector(".product-thumbs")
          .querySelectorAll(".product-thumb")
          [e.item.index].classList.add("active");
      }
    },
  };

  return (
    <div
      className={`product-gallery product-gallery-vertical product-gallery-sticky ${adClass}`}
    >
      {/*     <div className="product-label-group">
                {
                    product.stock === 0 ?
                        <label className="product-label label-out">out</label> : ""
                }

                {
                    product.is_top ?
                        <label className="product-label label-top">top</label> : ""
                }

                {
                    product.is_new ?
                        <label className="product-label label-new">new</label> : ""
                }

                {
                    product.discount ?
                        <label className="product-label label-sale">sale</label> : ""
                }
            </div> */}

      <OwlCarousel
        adClass="product-single-carousel owl-theme owl-nav-inner"
        options={mainSlider3}
        onChangeIndex={setIndexHandler}
        onChangeRef={changeRefHandler}
        events={events}
      >
        {product.award.variants.length > 0 ? (
          product.award.variants.map(
            (variant) =>
              variant.image && (
                <div key={variant.id}>
                  <Magnifier
                    imageSrc={variant.image}
                    imageAlt="magnifier"
                    largeImageSrc={variant.image}
                    dragToMove={false}
                    mouseActivation="hover"
                    cursorStyleActive="crosshair"
                    className="product-image large-image"
                  />
                </div>
              )
          )
        ) : (
          <div>
            <Magnifier
              imageSrc={product.award.mainImage}
              imageAlt="magnifier"
              largeImageSrc={product.award.mainImage}
              dragToMove={false}
              mouseActivation="hover"
              cursorStyleActive="crosshair"
              className="product-image large-image"
            />
          </div>
        )}
      </OwlCarousel>

      <ALink href="#" className="product-image-full" onClick={openLightBox}>
        <i className="d-icon-zoom"></i>
      </ALink>

      <ThumbTwo
        product={product}
        index={index}
        onChangeIndex={setIndexHandler}
      />

      <MediaLightBox
        images={
          product.award.variants.length > 0
            ? product.award.variants.map(
                (variant) => variant.image && variant.image
              )
            : null
        }
        isOpen={isOpen}
        changeOpenState={changeOpenState}
        index={index}
        product={product}
      />
    </div>
  );
}
