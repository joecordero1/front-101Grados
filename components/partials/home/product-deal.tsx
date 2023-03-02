import { useState, useEffect, FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import Collapse from 'react-bootstrap/Collapse';

import ALink from '~/components/features/custom-link';
import Countdown from '~/components/features/countdown';
import Quantity from '~/components/features/quantity';
import { cartActions } from '~/store/cart';
import { toDecimal } from '~/utils';

import { CatalogueItem } from '../../../utils/types/catalogueItem';

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
  const { product, adClass = '', addToCart, isNew, isTop } = props;
  const [curColor, setCurColor] = useState('null');
  const [curSize, setCurSize] = useState('null');
  const [curIndex, setCurIndex] = useState(0);
  const [cartActive, setCartActive] = useState(false);
  const [quantity, setQauntity] = useState(1);

  console.log('product', product);

  let colors = [],
    sizes = [];

  // if (product && product.variants.length > 0) {
  //   if (product.variants[0].size)
  //     product.variants.forEach((item) => {
  //       if (sizes.findIndex((size) => size.name === item.size.name) === -1) {
  //         sizes.push({ name: item.size.name, value: item.size.size });
  //       }
  //     });

  //   if (product.variants[0].color) {
  //     product.variants.forEach((item) => {
  //       if (colors.findIndex((color) => color.name === item.color.name) === -1)
  //         colors.push({ name: item.color.name, value: item.color.color });
  //     });
  //   }
  // }

  // useEffect(() => {
  //   if (product.variants.length > 0) {
  //     if (
  //       (curSize !== 'null' && curColor !== 'null') ||
  //       (curSize === 'null' &&
  //         product.variants[0].size === null &&
  //         curColor !== 'null') ||
  //       (curColor === 'null' &&
  //         product.variants[0].color === null &&
  //         curSize !== 'null')
  //     ) {
  //       setCartActive(true);
  //       setCurIndex(
  //         product.variants.findIndex(
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

  const toggleColorHandler = (color) => {
    // if (!isDisabled(color.name, curSize)) {
    //   if (curColor === color.name) {
    //     setCurColor('null');
    //   } else {
    //     setCurColor(color.name);
    //   }
    // }
  };

  const toggleSizeHandler = (size) => {
    // if (!isDisabled(curColor, size.name)) {
    //   if (curSize === size.name) {
    //     setCurSize('null');
    //   } else {
    //     setCurSize(size.name);
    //   }
    // }
  };

  const addToCartHandler = () => {
    // if (product.stock > 0 && cartActive) {
    //   if (product.variants.length > 0) {
    //     let tmpName = product.name,
    //       tmpPrice;
    //     tmpName += curColor !== 'null' ? '-' + curColor : '';
    //     tmpName += curSize !== 'null' ? '-' + curSize : '';
    //     if (product.price[0] === product.price[1]) {
    //       tmpPrice = product.price[0];
    //     } else if (!product.variants[0].price && product.discount > 0) {
    //       tmpPrice = product.price[0];
    //     } else {
    //       tmpPrice = product.variants[curIndex].sale_price
    //         ? product.variants[curIndex].sale_price
    //         : product.variants[curIndex].price;
    //     }
    //     addToCart({
    //       ...product,
    //       name: tmpName,
    //       qty: quantity,
    //       price: tmpPrice,
    //     });
    //   } else {
    //     addToCart({ ...product, qty: quantity, price: product.price[0] });
    //   }
    // }
  };

  const resetValueHandler = (e) => {
    setCurColor('null');
    setCurSize('null');
  };

  function isDisabled(color, size) {
    // if (color === 'null' || size === 'null') return false;
    // if (sizes.length === 0) {
    //   return (
    //     product.variants.findIndex((item) => item.color.name === curColor) ===
    //     -1
    //   );
    // }
    // if (colors.length === 0) {
    //   return (
    //     product.variants.findIndex((item) => item.size.name === curSize) === -1
    //   );
    // }
    // return (
    //   product.variants.findIndex(
    //     (item) => item.color.name === color && item.size.name === size
    //   ) === -1
    // );
  }

  function changeQty(qty) {
    setQauntity(qty);
  }

  return (
    <div className={`product product-single ${adClass}`}>
      <div className="row product-gallery align-items-center pb-0 mb-0 h-100">
        <div className="col-md-6 p-relative mb-4 mb-md-0">
          <div className="w-100">
            <figure className="product-media">
              <ALink href={`/product/default/${product.award.id}`}>
                <LazyLoadImage
                  alt="product"
                  // src={
                  //   process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[0].url
                  // }
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
                  ''
                )}
                {isTop ? (
                  <label className="product-label label-top">Top</label>
                ) : (
                  ''
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
              <ALink href={`/product/default/${product.award.id}`}>
                {product.award.name}
              </ALink>
            </h3>

            <div className="product-price">
              <ins className="new-price">{product.points}</ins>
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
                {/* <Quantity
                  adClass="input-group mr-2 mb-0"
                  max={product.stock}
                  product={product}
                  onChangeQty={changeQty}
                /> */}
                <button
                  className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold mb-0 ${
                    cartActive ? '' : 'disabled'
                  }`}
                  onClick={addToCartHandler}
                  // onClick={addToCartHandler}
                >
                  <i className="d-icon-bag"></i>Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data ? state.wishlist.data : [],
  };
}

export default connect(null, { addToCart: cartActions.addToCart })(ProductOne);
