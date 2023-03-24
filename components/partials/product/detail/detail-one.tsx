import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Collapse from "react-bootstrap/Collapse";

import ALink from "~/components/features/custom-link";
import Countdown from "~/components/features/countdown";
import Quantity from "~/components/features/quantity";
import ProductNav from "~/components/partials/product/product-nav";
import { wishlistActions } from "~/store/wishlist";
import { cartActions } from "~/store/cart";

import { toDecimal } from "~/utils";
import { CatalogueItem } from "../../../../utils/types/catalogueItem";
import { useCart, useProgram } from "hooks";
import { AwardVariant, VariantType } from "~/utils/types";

type Props = {
  product: CatalogueItem;
  adClass?: string;
  isStickyCart?: boolean;
  isNav?: boolean;
  toggleWishlist?: any;
  addToCart?: any;
  wishlist?: any;
  cartItems?: any;
};

const DetailOne: FC<Props> = (props) => {
  const { coinName } = useProgram();
  let router = useRouter();
  const { product, isStickyCart = false, adClass = "", isNav = true } = props;
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);

  // // decide if the product is wishlisted
  // let isWishlisted,
  //   colors = [],
  //   sizes = [];
  // isWishlisted =
  //   wishlist.findIndex((item) => item.slug === product.data.slug) > -1
  //     ? true
  //     : false;

  // if (product.data && product.data.variants.length > 0) {
  //   if (product.data.variants[0].size)
  //     product.data.variants.forEach((item) => {
  //       if (sizes.findIndex((size) => size.name === item.size.name) === -1) {
  //         sizes.push({ name: item.size.name, value: item.size.size });
  //       }
  //     });

  //   if (product.data.variants[0].color) {
  //     product.data.variants.forEach((item) => {
  //       if (colors.findIndex((color) => color.name === item.color.name) === -1)
  //         colors.push({ name: item.color.name, value: item.color.color });
  //     });
  //   }
  // }

  // useEffect(() => {
  //   if (product.data.variants.length > 0) {
  //     if (
  //       (curSize !== 'null' && curColor !== 'null') ||
  //       (curSize === 'null' &&
  //         product.data.variants[0].size === null &&
  //         curColor !== 'null') ||
  //       (curColor === 'null' &&
  //         product.data.variants[0].color === null &&
  //         curSize !== 'null')
  //     ) {
  //       setCartActive(true);
  //       setCurIndex(
  //         product.data.variants.findIndex(
  //           (item) =>
  //             (item.size !== null &&
  //               item.color !== null &&
  //               item.color.name === curColor &&
  //               item.size.name === curSize) ||
  //             (item.size === null && item.color.name === curColor) ||
  //             (item.color === null && item.size.name === curSize)
  //         )
  //       );
  //     } else {
  //       setCartActive(false);
  //     }
  //   } else {
  //     setCartActive(true);
  //   }

  //   if (product.stock === 0) {
  //     setCartActive(false);
  //   }
  // }, [curColor, curSize, product]);

  const wishlistHandler = (e) => {
    // e.preventDefault();
    // if (toggleWishlist && !isWishlisted) {
    //   let currentTarget = e.currentTarget;
    //   currentTarget.classList.add('load-more-overlay', 'loading');
    //   toggleWishlist(product.data);
    //   setTimeout(() => {
    //     currentTarget.classList.remove('load-more-overlay', 'loading');
    //   }, 1000);
    // } else {
    //   router.push('/pages/wishlist');
    // }
  };

  const addToCartHandler = (variant?: AwardVariant) => {
    items.filter((item) => item.id === product.id)[0]
      ? null
      : addToCart(product, quantity, variant);
  };

  function isDisabled(color, size) {
    // if (color === 'null' || size === 'null') return false;
    // if (sizes.length === 0) {
    //   return (
    //     product.data.variants.findIndex(
    //       (item) => item.color.name === curColor
    //     ) === -1
    //   );
    // }
    // if (colors.length === 0) {
    //   return (
    //     product.data.variants.findIndex(
    //       (item) => item.size.name === curSize
    //     ) === -1
    //   );
    // }
    // return (
    //   product.data.variants.findIndex(
    //     (item) => item.color.name === color && item.size.name === size
    //   ) === -1
    // );
  }

  return (
    <div className={"product-details " + adClass}>
      {isNav ? (
        <div className="product-navigation">
          <ul className="breadcrumb breadcrumb-lg">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>
              <ALink href="#" className="active">
                Products
              </ALink>
            </li>
            <li>Detail</li>
          </ul>

          <ProductNav product={product} />
        </div>
      ) : (
        ""
      )}

      <h2 className="product-name">{product.award.name}</h2>

      <div className="product-meta">
        Código: <span className="product-sku">{product.award.code}</span>
        Modelo: <span className="product-sku">{product.award.model}</span>
        Marca: <span className="product-sku">{product.award.brand.name}</span>
        Subcategorías:{" "}
        <span className="product-brand">
          {product.award.subcategories.map((item, index) => (
            <React.Fragment key={item.name + "-" + index}>
              <ALink
                href={{ pathname: "/shop", query: { subcategory: item.id } }}
              >
                {item.name}
              </ALink>
              {index < product.award.subcategories.length - 1 ? ", " : ""}
            </React.Fragment>
          ))}
        </span>
      </div>

      <div className="product-price mb-2">
        <ins className="new-price">
          {product.points} {coinName}
        </ins>
      </div>

      <p
        className="product-short-desc"
        dangerouslySetInnerHTML={{ __html: product.award.description }}
      ></p>
      <div className="product-form product-qty pb-0">
        <label className="d-none">Cantidad:</label>
        <div className="product-form-group">
          <div className="mr-2 input-group">
            <button
              className="quantity-minus d-icon-minus"
              onClick={() =>
                setQuantity(quantity > 0 && quantity !== 1 ? quantity - 1 : 1)
              }
            ></button>
            <input
              className="quantity form-control"
              type="number"
              min="1"
              max="300"
              value={quantity}
            />
            <button
              className="quantity-plus d-icon-plus"
              onClick={() =>
                setQuantity(quantity >= 1 && quantity <= 300 ? quantity + 1 : 1)
              }
            ></button>
          </div>
          {product.award.variants.length <= 0 && (
            <button
              className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
                /* cartActive ? "" : "disabled" */ ""
              }`}
              disabled={
                items.filter((item) => item.id === product.id)[0] ? true : false
              }
              onClick={() => addToCartHandler()}
            >
              <i className="d-icon-bag"></i>Agregar Al Carrito
            </button>
          )}
        </div>
      </div>
      {product && product.award.variants.length > 0 ? (
        <>
          <h5>
            escoge la cantidad y da click en la variante y el premio se agregara
            al carrito
          </h5>
          {product.award.variants.map((variant) =>
            variant.type === VariantType.COLOR && variant.isActive ? (
              <div className="product-form product-color">
                <label>Color:</label>

                <div className="product-variations">
                  <ALink
                    href="#"
                    /* className={"color"} */
                    key={variant.id}
                    /*  style={{ backgroundColor: `${variant.name}` }} */
                    onClick={() => addToCartHandler(variant)}
                  >
                    {variant.name}
                  </ALink>
                </div>
              </div>
            ) : variant.type === VariantType.SIZE && variant.isActive ? (
              <div className="product-form product-size mb-0 pb-2">
                <label>Talla:</label>
                <div className="product-form-group">
                  <div className="product-variations">
                    <ALink
                      href="#"
                      className={`size`}
                      key={"size-" + variant.id}
                      onClick={() => addToCartHandler(variant)}
                    >
                      {variant.name}
                    </ALink>
                  </div>
                </div>
              </div>
            ) : variant.type === VariantType.GENERAL && variant.isActive ? (
              <div className="product-form product-size mb-0 pb-2">
                <label>Tipo:</label>
                <div className="product-form-group">
                  <div className="product-variations">
                    <ALink
                      href="#"
                      className={`size`}
                      key={"size-" + variant.id}
                      onClick={() => addToCartHandler(variant)}
                    >
                      {variant.name}
                    </ALink>
                  </div>
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
    </div>
  );
};

export default DetailOne;
