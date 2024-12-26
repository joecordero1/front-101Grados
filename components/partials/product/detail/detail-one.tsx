import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';
import ProductNav from '~/components/partials/product/product-nav';

import { CatalogueItem } from '../../../../utils/types/catalogueItem';
import { useCart, useProgram, useLogs, useForm } from 'hooks';
import { AwardVariant, VariantType } from '~/utils/types';
import { LogType } from '~/utils/types/logType';

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
  const { product, isStickyCart = false, adClass = '', isNav = true } = props;
  const { addToCart, items } = useCart();
  const { values, onChange } = useForm({
    quantity: 1,
  });
  const { quantity } = values;
  const { dispatchLog } = useLogs();

  const addToCartHandler = (variant?: AwardVariant) => {
    items.filter((item) => item.id === product.id)[0]
      ? null
      : addToCart(product, quantity, variant);
  };

  return (
    <div className={'product-details ' + adClass}>
      {isNav ? (
        <div className='product-navigation'>
          <ul className='breadcrumb breadcrumb-lg'>
            <li>
              <ALink href='/'>
                <i className='d-icon-home'></i>
              </ALink>
            </li>
            <li>
              <ALink href='#' className='active'>
                Products
              </ALink>
            </li>
            <li>Detail</li>
          </ul>

          <ProductNav product={product} />
        </div>
      ) : (
        ''
      )}

      <h2 className='product-name'>{product.award.name}</h2>

      <div className='product-meta'>
        Código: <span className='product-sku'>{product.award.code}</span>
        Modelo: <span className='product-sku'>{product.award.model}</span>
        Marca: <span className='product-sku'>{product.award.brand.name}</span>
        Subcategorías:{' '}
        <span className='product-brand'>
          {product.award?.subcategories?.map((item, index) => (
            <React.Fragment key={item.name + '-' + index}>
              <ALink
                href={{ pathname: '/shop', query: { subcategory: item.id } }}
              >
                {item.name}
              </ALink>
              {index < product.award.subcategories.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </span>
      </div>

      <div className='product-price mb-2'>
        <ins className='new-price'>
          {product.points} {coinName}
        </ins>
      </div>

      <p
        className='product-short-desc'
        dangerouslySetInnerHTML={{ __html: product.award.gptDescription }}
      ></p>
      <div className='product-form product-qty pb-0'>
        <label className='d-none'>Cantidad:</label>
        <div className='product-form-group'>
          <div className='mr-2 input-group'>
            <button
              className='quantity-minus d-icon-minus'
              onClick={() =>
                onChange(
                  'quantity',
                  quantity > 0 && quantity !== 1 ? quantity - 1 : 1
                )
              }
            ></button>
            <input
              className='quantity form-control'
              type='number'
              min={1}
              value={quantity}
              name='quantity'
              onChange={(e) =>
                onChange(
                  'quantity',
                  parseInt(
                    e.target.value && e.target.value !== ''
                      ? e.target.value
                      : ''
                  )
                )
              }
            />
            <button
              className='quantity-plus d-icon-plus'
              onClick={() =>
                onChange(
                  'quantity',
                  quantity >= 1 && quantity <= 300 ? quantity + 1 : 1
                )
              }
            ></button>
          </div>
          {product.award.variants.length <= 0 && (
            <button
              className={`btn-product btn-cart text-normal ls-normal font-weight-semi-bold`}
              disabled={
                items.filter((item) => item.id === product.id)[0] ? true : false
              }
              onClick={() => {
                addToCartHandler();
                dispatchLog(LogType.ADD_TO_CART, {
                  awardId: product.award.id,
                  awardPoints: product.points,
                });
              }}
            >
              <i className='d-icon-bag'></i>Agregar Al Carrito
            </button>
          )}
        </div>
      </div>
      {product && product.award.variants.length > 0 ? (
        <>
          <h5>Escoge la cantidad y también selecciona una variación 2:</h5>
          {product.award.variants.map((variant) =>
            variant.type === VariantType.COLOR && variant.isActive ? (
              <div className='product-form product-color' key={variant.id}>
                <label>Color:</label>

                <div className='product-variations'>
                  <ALink
                    href='#'
                    /* className={"color"} */
                    key={variant.id}
                    /*  style={{ backgroundColor: `${variant.name}` }} */
                    onClick={() => {
                      addToCartHandler(variant);
                      dispatchLog(LogType.ADD_TO_CART, {
                        awardId: product.award.id,
                        awardPoints: product.points,
                      });
                    }}
                  >
                    {`${variant.name}-Agregar al carrito`}
                  </ALink>
                </div>
              </div>
            ) : variant.type === VariantType.SIZE && variant.isActive ? (
              <div
                className='product-form product-size mb-0 pb-2'
                key={variant.id}
              >
                <label>Talla:</label>
                <div className='product-form-group'>
                  <div className='product-variations'>
                    <ALink
                      href='#'
                      className={`size`}
                      key={'size-' + variant.id}
                      onClick={() => {
                        addToCartHandler(variant);
                        dispatchLog(LogType.ADD_TO_CART, {
                          awardId: product.award.id,
                          awardPoints: product.points,
                        });
                      }}
                    >
                      {`${variant.name}-Agregar al carrito`}
                    </ALink>
                  </div>
                </div>
              </div>
            ) : variant.type === VariantType.GENERAL && variant.isActive ? (
              <div
                className='product-form product-size mb-0 pb-2'
                key={variant.id}
              >
                <label>Tipo:</label>
                <div className='product-form-group'>
                  <div className='product-variations'>
                    <ALink
                      href='#'
                      className={`size`}
                      key={'size-' + variant.id}
                      onClick={() => {
                        addToCartHandler(variant);
                        dispatchLog(LogType.ADD_TO_CART, {
                          awardId: product.award.id,
                          awardPoints: product.points,
                        });
                      }}
                    >
                      {`${variant.name}-Agregar al carrito`}
                    </ALink>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )
          )}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default DetailOne;
