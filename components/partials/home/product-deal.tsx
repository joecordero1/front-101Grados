import { useState, useEffect, FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect } from "react-redux";
import Collapse from "react-bootstrap/Collapse";

import ALink from "~/components/features/custom-link";
import Countdown from "~/components/features/countdown";
import Quantity from "~/components/features/quantity";
import { cartActions } from "~/store/cart";
import { toDecimal } from "~/utils";

import { CatalogueItem } from "../../../utils/types/catalogueItem";
import { useCart, useProgram } from "hooks";
import { AwardVariant } from "~/utils/types";

type Props = {
  product: CatalogueItem;
  adClass?: string;
  isReviewCount?: boolean;
  isStockCount?: boolean;
  addToCart: (product: CatalogueItem, quantity: number) => void;
  isNew?: boolean;
  isTop?: boolean;
};

const ProductOne: FC<Props> = (props) => {
  const { product, adClass = "", isNew, isTop } = props;
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { coinName } = useProgram();

  // Get a random rating between 4 and 5 with 1 decimal
  const rating = Math.random() * (5 - 4) + 4;

  // Get a random number between 1 and 100
  const reviewCount = Math.floor(Math.random() * 100) + 1;

  const addToCartHandler = (variant?: AwardVariant) => {
    items.filter((item) => item.id === product.id)[0]
      ? null
      : addToCart(product, quantity, variant);
  };

  return (
    <div className={`product product-single ${adClass}`}>
      <div className="row product-gallery align-items-center pb-0 mb-0 h-100">
        <div className="col-md-6 p-relative mb-4 mb-md-0">
          <div className="w-100">
            <figure className="product-media">
              <ALink href={`/award/${product.id}`}>
                <LazyLoadImage
                  alt="product"
                  src={product.award.mainImage}
                  threshold={500}
                  effect="opacity"
                  width="300"
                  height="338"
                />

                {/* {product.pictures.length >= 2 ? (
                  <LazyLoadImage
                    alt="product"
                    src={
                      process.env.NEXT_PUBLIC_ASSET_URI +
                      product.pictures[1].url
                    }
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
                  <label className="product-label label-new">New</label>
                ) : (
                  ""
                )}
                {isTop ? (
                  <label className="product-label label-top">Top</label>
                ) : (
                  ""
                )}
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
            </figure>
          </div>

          {/* {product.price[0] !== product.price[1] && product.until ? (
            <Countdown
              type={3}
              adClass="d-flex align-items-center font-weight-semi-bolold text-white x-50 w-100 justify-content-center flex-wrap"
            />
          ) : (
            ''
          )} */}
        </div>

        <div className="col-md-6">
          <div className="product-details w-100 pb-0 pl-0">
            <h3 className="product-name">
              <ALink href={`/award/${product.award.id}`}>
                {product.award.name} | {product.award.model}
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
                    <ins className="new-price">
                      ${toDecimal(product.price[0])}
                    </ins>
                    <del className="old-price">
                      ${toDecimal(product.price[1])}
                    </del>
                  </>
                ) : (
                  <del className="new-price">
                    ${toDecimal(product.price[0])} – $
                    {toDecimal(product.price[1])}
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

            <div className="ratings-container">
              <div className="ratings-full">
                <span
                  className="ratings"
                  style={{ width: 20 * rating + "%" }}
                ></span>
              </div>
            </div>

            {/* {product && product.variants.length > 0 ? (
              <>
                {product.variants[0].size ? (
                  <div className="product-form product-size mb-0 pb-2">
                    <label>Screen Size:</label>

                    <div className="product-form-group">
                      <div className="product-variations">
                        {sizes.map((item) => (
                          <ALink
                            href="#"
                            className={`size ${
                              curSize === item.name ? 'active' : ''
                            } ${
                              isDisabled(curColor, item.name) ? 'disabled' : ''
                            }`}
                            key={'size-' + item.name}
                            onClick={() => toggleSizeHandler(item)}
                          >
                            {item.name}
                          </ALink>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}

                {product.variants[0].color ? (
                  <div className="product-form product-color">
                    <label>Resolution:</label>

                    <div className="product-form-group">
                      <div className="product-variations">
                        {colors.map((item) => (
                          <ALink
                            href="#"
                            className={`size ${
                              curColor === item.name ? 'active' : ''
                            } ${
                              isDisabled(item.name, curSize) ? 'disabled' : ''
                            }`}
                            key={'color-' + item.name}
                            onClick={() => toggleColorHandler(item)}
                          >
                            {item.name}
                          </ALink>
                        ))}
                      </div>

                      <Collapse in={'null' !== curColor || 'null' !== curSize}>
                        <div className="card-wrapper overflow-hidden reset-value-button w-100 mb-0">
                          <ALink
                            href="#"
                            className="product-variation-clean"
                            // onClick={resetValueHandler}
                          >
                            Clean All
                          </ALink>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <div className="product-variation-price">
                  <Collapse in={cartActive && curIndex > -1}>
                    <div className="card-wrapper">
                      {curIndex > -1 ? (
                        <div className="single-product-price">
                          {product.variants[curIndex].price ? (
                            product.variants[curIndex].sale_price ? (
                              <div className="product-price mb-0">
                                <ins className="new-price">
                                  $
                                  {toDecimal(
                                    product.variants[curIndex].sale_price
                                  )}
                                </ins>
                                <del className="old-price">
                                  ${toDecimal(product.variants[curIndex].price)}
                                </del>
                              </div>
                            ) : (
                              <div className="product-price mb-0">
                                <ins className="new-price">
                                  ${toDecimal(product.variants[curIndex].price)}
                                </ins>
                              </div>
                            )
                          ) : (
                            ''
                          )}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </Collapse>
                </div>
              </>
            ) : (
              ''
            )} */}

            <div className="product-form product-qty pb-0">
              <div className="product-form-group">
                <div className="mr-2 input-group">
                  <button
                    className="quantity-minus d-icon-minus"
                    onClick={() =>
                      setQuantity(
                        quantity > 0 && quantity !== 1 ? quantity - 1 : 1
                      )
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
                      setQuantity(
                        quantity >= 1 && quantity <= 300 ? quantity + 1 : 1
                      )
                    }
                  ></button>
                </div>
                {product.award.variants.length <= 0 ? (
                  <button
                    className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
                      /* cartActive ? "" : "disabled" */ ""
                    }`}
                    disabled={
                      items.filter((item) => item.id === product.id)[0]
                        ? true
                        : false
                    }
                    onClick={() => addToCartHandler()}
                  >
                    <i className="d-icon-bag"></i>Agregar Al Carrito
                  </button>
                ) : (
                  <button
                    className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold `}
                    disabled={
                      items.filter((item) => item.id === product.id)[0]
                        ? true
                        : false
                    }
                  >
                    <ALink href={`/award/${product.award.id}`}>
                      <i className="d-icon-left-arrow"></i>Elegir Variante
                    </ALink>
                  </button>
                )}
              </div>
            </div>
            <div className="count-text">
              {/* Only <strong>{product.stock}</strong> Left */}
              {product.award.brand.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOne;
