import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";
import { toDecimal } from "~/utils";

import { useProgram, useGeneral } from "hooks";
import { CatalogueItem } from "../../../utils/types/catalogueItem";

type Props = {
  item: CatalogueItem;
  adClass?: string;
  toggleWishlist?: (item: CatalogueItem) => void;
  wishlist?: CatalogueItem[];
  addToCart?: (item: CatalogueItem) => void;
  openQuickview?: (slug: string) => void;
  isCategory?: boolean;
  isNew?: boolean;
  isTop?: boolean;
};

const ProductTwo: FC<Props> = (props) => {
  const {
    item,
    adClass = "text-center",
    addToCart,
    openQuickview,
    isCategory = true,
    isNew,
    isTop,
  } = props;
  const { coinName } = useProgram();
  const { openModal } = useGeneral();

  // decide if the product is wishlisted
  // let isWishlisted;
  // isWishlisted =
  //   wishlist.findIndex((item) => item.slug === product.slug) > -1
  //     ? true
  //     : false;

  const showQuickviewHandler = () => {
    // openQuickview(product.slug);
  };

  const wishlistHandler = (e) => {
    // if (toggleWishlist) {
    //   toggleWishlist(product);
    // }
    // e.preventDefault();
    // let currentTarget = e.currentTarget;
    // currentTarget.classList.add('load-more-overlay', 'loading');
    // setTimeout(() => {
    //   currentTarget.classList.remove('load-more-overlay', 'loading');
    // }, 1000);
  };

  const addToCartHandler = (e) => {
    // e.preventDefault();
    // addToCart({ ...product, qty: 1, price: product.price[0] });
  };

  return (
    <div className={`product text-left ${adClass}`}>
      <figure className="product-media">
        <ALink href={`/award/${item.award.id}`}>
          <LazyLoadImage
            alt="product"
            src={item.award.mainImage}
            threshold={500}
            effect="opacity"
            width="300"
            height="338"
          />

          {/* {product.pictures.length >= 2 ? (
            <LazyLoadImage
              alt="product"
              src={process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[1].url}
              threshold={500}
              width="300"
              height="338"
              effect="opacity"
              wrapperClassName="product-image-hover"
            />
          ) : (
            ''
          )} */}
        </ALink>

        <div className="product-label-group">
          {isNew ? <label className="product-label label-new">New</label> : ""}
          {isTop ? <label className="product-label label-top">Top</label> : ""}
          {/* {product.discount > 0 ? (
            product.variants.length === 0 ? (
              <label className="product-label label-sale">
                {product.discount}% OFF
              </label>
            ) : (
              <label className="product-label label-sale">Sale</label>
            )
          ) : (
            ''
          )} */}
        </div>

        <div className="product-action-vertical">
          {/* {product.variants.length > 0 ? (
            <ALink
              href={`/product/default/${product.slug}`}
              className="btn-product-icon btn-cart"
              title="Go to product"
            >
              <i className="d-icon-arrow-right"></i>
            </ALink>
          ) : (
            <a
              href="#"
              className="btn-product-icon btn-cart"
              title="Add to cart"
              onClick={addToCartHandler}
            >
              <i className="d-icon-bag"></i>
            </a>
          )} */}
          {/* <a
            href="#"
            className="btn-product-icon btn-wishlist"
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={wishlistHandler}
          >
            <i
              className={isWishlisted ? 'd-icon-heart-full' : 'd-icon-heart'}
            ></i>
          </a> */}
        </div>

        <div className="product-action">
          <ALink
            href="#"
            className="btn-product btn-quickview"
            title="Quick View"
            onClick={() => openModal(item)}
          >
            Vista Rápida
          </ALink>
        </div>
      </figure>

      <div className="product-details">
        <div className="product-cat">
          {item.award.subcategories.map((subcategory, index) => (
            <React.Fragment key={subcategory.name + "-" + index}>
              <ALink
                href={{
                  pathname: "/shop",
                  query: { subcategory: subcategory.id },
                }}
              >
                {subcategory.name}
                {index < item.award.subcategories.length - 1 ? ", " : ""}
              </ALink>
            </React.Fragment>
          ))}
        </div>

        <h3 className="product-name">
          <ALink href={`/award/${item.id}`}>
            {`${item.award.name} ${
              item.award.model ? "-" + item.award.model : ""
            }-${item.award.brand.name}`}
          </ALink>
        </h3>

        <div className="product-price">
          <ins className="new-price">
            {item.points} {coinName}
          </ins>
          {/* {product.price[0] !== product.price[1] ? (
            product.variants.length === 0 ||
            (product.variants.length > 0 && !product.variants[0].price) ? (
              <>
                <ins className="new-price">${toDecimal(product.price[0])}</ins>
                <del className="old-price">${toDecimal(product.price[1])}</del>
              </>
            ) : (
              <del className="new-price">
                ${toDecimal(product.price[0])} – ${toDecimal(product.price[1])}
              </del>
            )
          ) : (
            <ins className="new-price">${toDecimal(product.price[0])}</ins>
          )} */}
        </div>

        {/* <div className="ratings-container">
          <div className="ratings-full">
            <span
              className="ratings"
              style={{ width: 20 * product.ratings + '%' }}
            ></span>
            <span className="tooltiptext tooltip-top">
              {toDecimal(product.ratings)}
            </span>
          </div>

          <ALink
            href={`/product/default/${product.slug}`}
            className="rating-reviews"
          >
            ( {product.reviews} reviews )
          </ALink>
        </div> */}
      </div>
    </div>
  );
};

export default ProductTwo;
