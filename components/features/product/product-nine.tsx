import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect } from "react-redux";

import ALink from "~/components/features/custom-link";
import { cartActions } from "~/store/cart";
import { modalActions } from "~/store/modal";
import { wishlistActions } from "~/store/wishlist";
import { toDecimal } from "~/utils";

import { useCart, useProgram } from "hooks";
import { CartItem, CatalogueItem } from "../../../utils/types/catalogueItem";

type Props = {
  product: CartItem;
  adClass?: string;
  toggleWishlist?: (product: CatalogueItem) => void;
  wishlist?: CatalogueItem[];
  openQuickview?: (slug: string) => void;
  isCategory?: boolean;
  isRating?: boolean;
  isStockCount?: boolean;
};

const ProductOne: FC<Props> = (props) => {
  const {
    product,
    adClass,
    toggleWishlist,
    wishlist,
    openQuickview,
    isCategory = true,
    isRating = true,
    isStockCount = false,
  } = props;
  const { coinName } = useProgram();
  const { addToCart, items } = useCart();

  //   // decide if the product is wishlisted
  //   let isWishlisted;
  //   isWishlisted =
  //     wishlist.findIndex((item) => item.slug === product.slug) > -1
  //       ? true
  //       : false;

  // Mark as true randomly with 90% probability of false
  const isNew = Math.random() < 0.9 ? false : true;
  const isTop = Math.random() < 0.9 ? false : true;

  const showQuickviewHandler = () => {
    // openQuickview(product.slug);
  };

  const wishlistHandler = (e) => {
    if (toggleWishlist) {
      toggleWishlist(product);
    }

    e.preventDefault();
    let currentTarget = e.currentTarget;
    currentTarget.classList.add("load-more-overlay", "loading");

    setTimeout(() => {
      currentTarget.classList.remove("load-more-overlay", "loading");
    }, 1000);
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    items.filter((item) => item.id === product.id)[0]
      ? null
      : addToCart(product, 1);
  };

  return (
    <div className={`product ${adClass}`}>
      <figure className="product-media">
        <ALink href={`/award/${product.award.id}`}>
          <LazyLoadImage
            alt="product"
            // src={process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[0].url}
            src={product.award.mainImage}
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
              effect="opacity"
              width="300"
              height="338"
            />
          ) : (
            ''
          )} */}
        </ALink>

        <div className="product-label-group">
          {isNew ? (
            <label className="product-label label-new">Nuevo</label>
          ) : (
            ""
          )}
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
          {product.award.variants.length > 0 ? (
            <a
              href={`product/default/${product.award.id}`}
              className="btn-product-icon btn-cart"
              title="Elegir Talla"
            >
              <i className="d-icon-right-arrow"></i>
            </a>
          ) : (
            <a
              href={"#"}
              onClick={addToCartHandler}
              className="btn-product-icon btn-cart"
              title="Añadir"
            >
              <i className="d-icon-bag"></i>
            </a>
          )}
        </div>
      </figure>

      <div className="product-details">
        {isCategory && (
          <div className="product-cat">
            {product.award.subcategories.map((item, index) => (
              <React.Fragment key={item.name + "-" + index}>
                <ALink
                  href={{
                    pathname: "/shop",
                    query: { subcategory: item.id },
                  }}
                >
                  {item.name}
                  {index < product.award.subcategories.length - 1 ? ", " : ""}
                </ALink>
              </React.Fragment>
            ))}
          </div>
        )}

        <h3 className="product-name">
          <ALink href={`/award/${product.award.id}`}>
            {product.award.name}
          </ALink>
        </h3>

        <div className="product-price">
          <ins className="new-price">
            {product.points} {coinName}
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
        {/* 
        {isRating && (
          <div className="ratings-container">
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
          </div>
        )}

        {isStockCount && (
          <div className="count-text">
            Only <strong>{product.stock}</strong> Left
          </div>
        )} */}

        <div className="count-text">{product.award.brand.name}</div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
  ...modalActions,
})(ProductOne);
