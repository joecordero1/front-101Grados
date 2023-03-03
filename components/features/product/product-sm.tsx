import React, { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';

import { CatalogueItem } from '../../../utils/types/catalogueItem';
import { useProgram, useGeneral } from 'hooks';
import { toDecimal } from '~/utils';

type Props = {
  product: CatalogueItem;
  adClass?: string;
  isReviewCount?: boolean;
  isStockCount?: boolean;
  isNew?: boolean;
  isTop?: boolean;
};

const SmallProduct: FC<Props> = (props) => {
  const { coinName } = useProgram();
  const { openModal } = useGeneral();
  const {
    product,
    adClass,
    isReviewCount = true,
    isStockCount = false,
    isNew,
    isTop,
  } = props;

  // Get a random rating between 4 and 5 with 1 decimal
  const rating = Math.random() * (5 - 4) + 4;

  // Get a random number between 1 and 100
  const reviewCount = Math.floor(Math.random() * 100) + 1;

  return (
    <div className={`product product-list-sm ${adClass}`}>
      <figure className="product-media">
        <ALink href={`/product/default/${product.award.id}`}>
          <LazyLoadImage
            alt="product"
            // src={process.env.NEXT_PUBLIC_ASSET_URI + product.award.mainImage}
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
              width="300"
              height="338"
              effect="opacity"
              wrapperClassName="product-image-hover"
            />
          ) : (
            ''
          )} */}
        </ALink>

        <div className="product-label-group">
          {isNew ? <label className="product-label label-new">New</label> : ''}
          {isTop ? <label className="product-label label-top">Top</label> : ''}
        </div>

        <div className="product-action">
          <ALink
            href="#"
            className="btn-product btn-quickview"
            title="Quick View"
            onClick={() => openModal(product)}
          >
            Vista Rápida
          </ALink>
        </div>
      </figure>

      <div className="product-details">
        <div className="product-cat">
          {product.award.subcategories.map((item, index) => (
            <React.Fragment key={item.name + '-' + index}>
              <ALink
                href={{ pathname: '/shop', query: { subcategory: item.id } }}
              >
                {item.name}
                {index < product.award.subcategories.length - 1 ? ', ' : ''}
              </ALink>
            </React.Fragment>
          ))}
        </div>

        <h3 className="product-name">
          <ALink href={`/product/default/${product.award.id}`}>
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
        <div className="ratings-container">
          <div className="ratings-full">
            <span
              className="ratings"
              style={{ width: 20 * rating + '%' }}
            ></span>
            <span className="tooltiptext tooltip-top">{toDecimal(rating)}</span>
          </div>

          {isReviewCount ? (
            <ALink href="#" className="rating-reviews">
              ( {reviewCount} )
            </ALink>
          ) : (
            ''
          )}
        </div>
        {isStockCount && (
          <div className="count-text">
            {/* Only <strong>{product.stock}</strong> Left */}
            {product.award.brand.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SmallProduct);
