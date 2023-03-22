import React, { useState } from "react";
import { useRouter } from "next/router";

import ALink from "~/components/features/custom-link";

import DescTwo from "~/components/partials/product/desc/desc-two";

import { AwardVariant, CartItem, VariantType } from "~/utils/types";
import { useCart, useProgram } from "~/hooks";

function DetailAward(props: {
  data: CartItem;
  isSticky?: boolean;
  isDesc?: boolean;
  adClass?: any;
  isNav: boolean;
}) {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { program } = useProgram();
  const {
    data: catalogueItem,
    isSticky = false,
    isDesc = false,
    adClass = "",
  } = props;

  let product = catalogueItem && catalogueItem;
  const addToCartHandler = (variant?: AwardVariant) => {
    items.filter((item) => item.id === product.id)[0]
      ? null
      : addToCart(product, quantity, variant);
  };

  return (
    <div className={`product-details ${isSticky ? "sticky" : ""} ${adClass}`}>
      <h2 className="product-name">{product.award.name}</h2>

      <div className="product-meta">
        Codigo: <span className="product-sku">{product.award.code}</span>
        CATEGORIAS:{" "}
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
        Marca: <span className="product-brand">{product.award.brand.name}</span>
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

      {isDesc ? <DescTwo product={product.award} adClass={adClass} /> : ""}
    </div>
  );
}

export default DetailAward;
