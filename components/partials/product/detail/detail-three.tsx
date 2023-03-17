import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Collapse from "react-bootstrap/Collapse";

import ALink from "~/components/features/custom-link";
import Countdown from "~/components/features/countdown";
import Quantity from "~/components/features/quantity";
import DescTwo from "~/components/partials/product/desc/desc-two";

import { wishlistActions } from "~/store/wishlist";
import { cartActions } from "~/store/cart";

import { toDecimal } from "~/utils";
import { CartItem, CatalogueItem, VariantType } from "~/utils/types";
import { useCart, useProgram } from "~/hooks";

function DetailOne(props: {
  data: CartItem;
  isSticky?: boolean;
  isDesc?: boolean;
  adClass?: any;
  isNav: boolean;
}) {
  let router = useRouter();
  const { addToCart } = useCart();
  const { program } = useProgram();
  const {
    data: catalogueItem,
    isSticky = false,
    isDesc = false,
    adClass = "",
  } = props;
  const [curColor, setCurColor] = useState("null");
  const [curSize, setCurSize] = useState("null");
  const [curIndex, setCurIndex] = useState(0);
  const [cartActive, setCartActive] = useState(false);
  const [quantity, setQauntity] = useState(1);
  let product = catalogueItem && catalogueItem;
  // decide if the product is wishlisted

  /*  if (product && product.variants.length > 0) {
    if (product.variants[0].name)
      product.data.variants.forEach((item) => {
        if (sizes.findIndex((size) => size.name === item.size.name) === -1) {
          sizes.push({ name: item.size.name, value: item.size.size });
        }
      });

    if (product.data.variants[0].color) {
      product.data.variants.forEach((item) => {
        if (colors.findIndex((color) => color.name === item.color.name) === -1)
          colors.push({ name: item.color.name, value: item.color.color });
      });
    }
  } */

  /* useEffect(() => {
    setCurIndex(-1);
    resetValueHandler();
  }, [product]); */

  /*   useEffect(() => {
    if (product.data.variants.length > 0) {
      if (
        (curSize !== 'null' && curColor !== 'null') ||
        (curSize === 'null' &&
          product.data.variants[0].size === null &&
          curColor !== 'null') ||
        (curColor === 'null' &&
          product.data.variants[0].color === null &&
          curSize !== 'null')
      ) {
        setCartActive(true);
        setCurIndex(
          product.data.variants.findIndex(
            (item) =>
              (item.size !== null &&
                item.color !== null &&
                item.color.name === curColor &&
                item.size.name === curSize) ||
              (item.size === null && item.color.name === curColor) ||
              (item.color === null && item.size.name === curSize),
          ),
        );
      } else {
        setCartActive(false);
      }
    } else {
      setCartActive(true);
    }

    if (product.stock === 0) {
      setCartActive(false);
    }
  }, [curColor, curSize, product]); */

  /*  const wishlistHandler = (e) => {
    e.preventDefault();

    if (toggleWishlist && !isWishlisted) {
      let currentTarget = e.currentTarget;
      currentTarget.classList.add('load-more-overlay', 'loading');
      toggleWishlist(product.data);

      setTimeout(() => {
        currentTarget.classList.remove('load-more-overlay', 'loading');
      }, 1000);
    } else {
      router.push('/pages/wishlist');
    }
  }; */

  const addToCartHandler = () => {
    addToCart(product, 1);
  };

  const resetValueHandler = (e) => {
    setCurColor("null");
    setCurSize("null");
  };

  function changeQty(qty) {
    setQauntity(qty);
  }

  return (
    <div className={`product-details ${isSticky ? "sticky" : ""} ${adClass}`}>
      <h2 className="product-name">{product.award.name}</h2>

      <div className="product-meta">
        SKU: <span className="product-sku">{product.award.code}</span>
        CATEGORIES:{" "}
        <span className="product-brand">
          {product.award.subcategories.map((item, index) => (
            <React.Fragment key={item.name + "-" + index}>
              <ALink
                href={{ pathname: "/shop", query: { category: item.name } }}
              >
                {item.name}
              </ALink>
              {index < product.award.subcategories.length - 1 ? ", " : ""}
            </React.Fragment>
          ))}
        </span>
      </div>

      <div className="product-price">
        <ins className="new-price">{`${product.points} ${program.coinName}`}</ins>
      </div>

      {/* <div className='ratings-container'>
        <div className='ratings-full'>
          <span
            className='ratings'
            style={{ width: 20 * product.data.ratings + '%' }}></span>
          <span className='tooltiptext tooltip-top'>
            {toDecimal(product.data.ratings)}
          </span>
        </div>

        <ALink href='#' className='rating-reviews'>
          ( {product.data.reviews} reviews )
        </ALink>
      </div> */}

      <p
        className="product-short-desc"
        dangerouslySetInnerHTML={{ __html: product.award.description }}
      ></p>

      {product && product.award.variants.length > 0 ? (
        <>
          {product.award.variants.map((variant) =>
            variant.type === VariantType.COLOR ? (
              <div className="product-form product-color">
                <label>Color:</label>

                <div className="product-variations">
                  <ALink
                    href="#"
                    className={"color"}
                    key={variant.id}
                    /* style={{ backgroundColor: `${variant.name}` }} */
                    /* onClick={(e) => toggleColorHandler(item)} */
                  >
                    {variant.name}
                  </ALink>
                </div>
              </div>
            ) : variant.type === VariantType.SIZE ? (
              <div className="product-form product-size mb-0 pb-2">
                <label>Size:</label>

                <div className="product-form-group">
                  <div className="product-variations">
                    <ALink
                      href="#"
                      className={`size`}
                      key={"size-" + variant.id}
                      /*  onClick={(e) => toggleSizeHandler(item)} */
                    >
                      {variant.name}
                    </ALink>
                  </div>

                  {/*  <Collapse in={'null' !== curColor || 'null' !== curSize}>
                <div className='card-wrapper overflow-hidden reset-value-button w-100 mb-0'>
                  <ALink
                    href='#'
                    className='product-variation-clean'
                    onClick={resetValueHandler}>
                    Clean All
                  </ALink>
                </div>
              </Collapse> */}
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </>
      ) : (
        ""
      )}

      <hr className="product-divider"></hr>

      <div className="product-form product-qty pb-0">
        <label className="d-none">QTY:</label>
        <div className="product-form-group">
          <Quantity
            /*    max={product.award.} */
            product={product}
            onChangeQty={changeQty}
          />
          <button
            className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
              /* cartActive ? "" : "disabled" */ ""
            }`}
            onClick={addToCartHandler}
          >
            <i className="d-icon-bag"></i>Add to Cart
          </button>
        </div>
      </div>

      <hr className="product-divider mb-3"></hr>

      <div className="product-footer">
        <div className="social-links mr-4">
          <ALink
            href="#"
            className="social-link social-facebook fab fa-facebook-f"
          ></ALink>
          <ALink
            href="#"
            className="social-link social-twitter fab fa-twitter"
          ></ALink>
          <ALink
            href="#"
            className="social-link social-pinterest fab fa-pinterest-p"
          ></ALink>
        </div>
      </div>

      {isDesc ? <DescTwo product={product.award} adClass={adClass} /> : ""}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
  };
}

export default connect(mapStateToProps, {
  toggleWishlist: wishlistActions.toggleWishlist,
  addToCart: cartActions.addToCart,
})(DetailOne);
