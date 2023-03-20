import React from 'react';

import ALink from '~/components/features/custom-link';
import { useProgram } from '~/hooks';

import { CatalogueItem } from '~/utils/types';

export default function CartPopup(props: { product: CatalogueItem }) {
  const { product } = props;
  const { program } = useProgram();
  return (
    <div className='minipopup-area'>
      <div className='minipopup-box show' style={{ top: '0' }}>
        <p className='minipopup-title'>Premio Añadido.</p>

        <div className='product product-purchased  product-cart mb-0'>
          <figure className='product-media pure-media'>
            <ALink href={`/award/${product.award.name}`}>
              <img
                src={product.award.mainImage}
                alt='product'
                width='90'
                height='90'
              />
            </ALink>
          </figure>
          <div className='product-detail'>
            <ALink href={`/award/${product.award.id}`} className='product-name'>
              {product.award.name}
            </ALink>
            <span className='price-box'>
              {/*    <span className='product-quantity'>{product.award.}</span> */}
              <span className='product-price'>{`${product.points} ${program.coinName}`}</span>
            </span>
          </div>
        </div>

        <div className='action-group d-flex'>
          <ALink
            href='/pages/cart'
            className='btn btn-sm btn-outline btn-primary btn-rounded'>
            Ver Carrito
          </ALink>
          <ALink
            href='/pages/checkout'
            className='btn btn-sm btn-primary btn-rounded'>
            Finalizar
          </ALink>
        </div>
      </div>
    </div>
  );
}
