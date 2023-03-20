import React, { useState } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

import DescTwo from '~/components/partials/product/desc/desc-two';

import { CartItem, VariantType } from '~/utils/types';
import { useCart, useProgram } from '~/hooks';

function DetailOne(props: {
  data: CartItem;
  isSticky?: boolean;
  isDesc?: boolean;
  adClass?: any;
  isNav: boolean;
}) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { program } = useProgram();
  const {
    data: catalogueItem,
    isSticky = false,
    isDesc = false,
    adClass = '',
  } = props;

  let product = catalogueItem && catalogueItem;

  const addToCartHandler = () => {
    addToCart(product, quantity);
  };

  return (
    <div className={`product-details ${isSticky ? 'sticky' : ''} ${adClass}`}>
      <h2 className='product-name'>{product.award.name}</h2>

      <div className='product-meta'>
        Codigo: <span className='product-sku'>{product.award.code}</span>
        CATEGORIAS:{' '}
        <span className='product-brand'>
          {product.award.subcategories.map((item, index) => (
            <React.Fragment key={item.name + '-' + index}>
              <ALink
                href={{ pathname: '/shop', query: { category: item.name } }}>
                {item.name}
              </ALink>
              {index < product.award.subcategories.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </span>
        Marca: <span className='product-brand'>{product.award.brand.name}</span>
      </div>

      <div className='product-price'>
        <ins className='new-price'>{`${product.points} ${program.coinName}`}</ins>
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
        className='product-short-desc'
        dangerouslySetInnerHTML={{ __html: product.award.description }}></p>

      {product && product.award.variants.length > 0 ? (
        <>
          {product.award.variants.map((variant) =>
            variant.type === VariantType.COLOR ? (
              <div className='product-form product-color'>
                <label>Color:</label>

                <div className='product-variations'>
                  <ALink
                    href='#'
                    className={'color'}
                    key={variant.id}
                    /* style={{ backgroundColor: `${variant.name}` }} */
                    /* onClick={(e) => toggleColorHandler(item)} */
                  >
                    {variant.name}
                  </ALink>
                </div>
              </div>
            ) : variant.type === VariantType.SIZE ? (
              <div className='product-form product-size mb-0 pb-2'>
                <label>Size:</label>

                <div className='product-form-group'>
                  <div className='product-variations'>
                    <ALink
                      href='#'
                      className={`size`}
                      key={'size-' + variant.id}
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
              ''
            ),
          )}
        </>
      ) : (
        ''
      )}

      <hr className='product-divider'></hr>

      <div className='product-form product-qty pb-0'>
        <label className='d-none'>Cantidad:</label>
        <div className='product-form-group'>
          <div className='mr-2 input-group'>
            <button
              className='quantity-minus d-icon-minus'
              onClick={() =>
                setQuantity(quantity > 0 && quantity !== 1 ? quantity - 1 : 1)
              }></button>
            <input
              className='quantity form-control'
              type='number'
              min='1'
              max='300'
              value={quantity}
            />
            <button
              className='quantity-plus d-icon-plus'
              onClick={() =>
                setQuantity(quantity >= 1 && quantity <= 300 ? quantity + 1 : 1)
              }></button>
          </div>

          <button
            className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold ${
              /* cartActive ? "" : "disabled" */ ''
            }`}
            onClick={addToCartHandler}>
            <i className='d-icon-bag'></i>Agregar Al Carrito
          </button>
        </div>
      </div>

      <hr className='product-divider mb-3'></hr>

      {isDesc ? <DescTwo product={product.award} adClass={adClass} /> : ''}
    </div>
  );
}

export default DetailOne;
