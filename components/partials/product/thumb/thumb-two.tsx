import React, { useEffect, useState } from "react";

import OwlCarousel from "~/components/features/owl-carousel";
import ProductEight from "~/components/features/product/product-eight";

import { mainSlider15 } from "~/utils/data/carousel";
import { CatalogueItem } from "~/utils/types";

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
      <ProductEight item={product} />
    </div>
  );
}

export default React.memo(ThumbTwo);
