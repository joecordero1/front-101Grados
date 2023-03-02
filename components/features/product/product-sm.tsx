import React, { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';

import { CatalogueItem } from '../../../utils/types/catalogueItem';
import { useProgram } from 'hooks';

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
  const {
    product,
    adClass,
    isReviewCount = true,
    isStockCount = false,
    isNew,
    isTop,
  } = props;

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
            // onClick={showQuickviewHandler}
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
            {product.award.name}
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
          {/* <div className="ratings-full">
            <span
              className="ratings"
              style={{ width: 20 * product.ratings + '%' }}
            ></span>
            <span className="tooltiptext tooltip-top">
              {toDecimal(product.ratings)}
            </span>
          </div> */}

          {/* {isReviewCount ? (
            <ALink
              href={`/product/default/${product.slug}`}
              className="rating-reviews"
            >
              ( {product.reviews} reviews )
            </ALink>
          ) : (
            ''
          )} */}
        </div>
        {/* {isStockCount && (
          <div className="count-text">
            Only <strong>{product.stock}</strong> Left
          </div>
        )} */}
      </div>
    </div>
  );
};

export default React.memo(SmallProduct);
