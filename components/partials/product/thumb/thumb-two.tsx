import React, { useEffect, useState } from "react";

import OwlCarousel from "~/components/features/owl-carousel";

import { mainSlider15 } from "~/utils/data/carousel";
import { CartItem, CatalogueItem } from "~/utils/types";

function ThumbTwo(props: {
  product: CatalogueItem;
  index: number;
  onChangeIndex: (thumbIndex: any) => void;
}) {
  const { product, index = 0 } = props;

  const [thumbRef, setThumbRef] = useState(null);

  useEffect(() => {
    if (thumbRef !== null && index >= 0) {
      thumbRef.current.$car.to(index, 300, true);

      if (document.querySelector(".product-thumbs")) {
        document
          .querySelector(".product-thumbs .owl-stage")
          .querySelector(".product-thumb.active") &&
          document
            .querySelector(".product-thumbs .owl-stage")
            .querySelector(".product-thumb.active")
            .classList.remove("active");
        document
          .querySelector(".product-thumbs .owl-stage")
          .querySelectorAll(".owl-item")[index] &&
          document
            .querySelector(".product-thumbs .owl-stage")
            .querySelectorAll(".owl-item")[index] &&
          document
            .querySelector(".product-thumbs .owl-stage")
            .querySelectorAll(".owl-item")
            [index].querySelector(".product-thumb")
            .classList.add("active");
      }
    }
  }, [index]);

  const thumbActiveHandler = (e, thumbIndex) => {
    props.onChangeIndex(thumbIndex);
    document.querySelector(".product-thumbs") &&
      document
        .querySelector(".product-thumbs .owl-stage")
        .querySelector(".product-thumb.active")
        .classList.remove("active");
    e.currentTarget.classList.add("active");
    // window.jQuery( '.quickview-modal .product-single-carousel' ).trigger( 'to.owl.carousel', [ thumbIndex, 100, true ] );
  };

  const changeRefHandler = (carRef) => {
    if (carRef.current !== undefined && thumbRef === null) {
      setThumbRef(carRef);
    }
  };

  return (
    <div className="product-thumbs-wrap product-thumbs-two">
      <OwlCarousel
        adClass="product-thumbs product-thumb-carousel"
        options={mainSlider15}
        onChangeRef={changeRefHandler}
      >
        {product.award.variants.length > 0 &&
        product.award.variants.filter((variant) => variant.image)
          ? product.award.variants.map((variant) => (
              <div
                className={`product-thumb ${index === 0 ? "active" : ""}`}
                onClick={(e) => {
                  thumbActiveHandler(e, index);
                }}
                key={variant.id}
              >
                <img
                  src={variant.image}
                  alt="product thumbnail"
                  width="137"
                  height="137"
                />
              </div>
            ))
          : null}
      </OwlCarousel>
    </div>
  );
}

export default React.memo(ThumbTwo);
