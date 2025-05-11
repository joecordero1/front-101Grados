import React, { useState } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

import DescTwo from '~/components/partials/product/desc/desc-two';

import { AwardVariant, CartItem, VariantType } from '~/utils/types';
import { useCart, useProgram, useLogs, useForm } from '~/hooks';
import { LogType } from '~/utils/types/logType';

function DetailAward(props: {
  data: CartItem;
  isSticky?: boolean;
  isDesc?: boolean;
  adClass?: any;
  isNav: boolean;
}) {
  const { addToCart, items } = useCart();
  const { values, onChange } = useForm({
    quantity: 1,
  });
  const { quantity } = values;
  const { program } = useProgram();
  const {
    data: catalogueItem,
    isSticky = false,
    isDesc = false,
    adClass = '',
  } = props;
  const { dispatchLog } = useLogs();

  let product = catalogueItem && catalogueItem;

  const addToCartHandler = (variant?: AwardVariant) => {
    items.filter((item) => item.id === product.id)[0]
      ? null
      : addToCart(product, quantity, variant);
  };

  return (
    <div className={`product-details ${isSticky ? 'sticky' : ''} ${adClass}`}>
      <h2 className='product-name'>{product.award.name}</h2>

      <div className='product-meta'>
        Codigo: <span className='product-sku'>{product.award.code}</span>
        CATEGORIAS:{' '}
        <span className='product-brand'>
          {product.award?.subcategories?.map((item, index) => (
            <React.Fragment key={item.name + '-' + index}>
              <ALink
                href={{
                  pathname: '/shop',
                  query: { category: item.category.id },
                }}
              >
                {item.name}
              </ALink>
              {index < product.award.subcategories.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </span>
        Marca: <span className='product-brand'>{product.award.brand.name}</span>
        {product.award.model && (
          <span className='product-sku'>Modelo: {product.award.model}</span>
        )}
      </div>

      <div className='product-price'>
        <ins className='new-price'>{`${product.points} ${program.coinName}`}</ins>
      </div>

      <p
        className='product-short-desc'
        dangerouslySetInnerHTML={{ __html: product.award.gptDescription }}
      ></p>
      <p
        className='product-short-desc'
        dangerouslySetInnerHTML={{ __html: product.award.description }}
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
          <h5>Escoge la cantidad y también selecciona una variación:</h5>
          {product.award.variants.map((variant, index) =>
            variant.type === VariantType.COLOR && variant.isActive ? (
              <div className='product-form product-color' key={variant.id}>
                <label>Color:</label>

                <div className='product-variations'>
                  <ALink
                    href='#'
                    key={variant.id}
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

      {isDesc ? <DescTwo product={product.award} adClass={adClass} /> : ''}
    </div>
  );
}

export default DetailAward;
