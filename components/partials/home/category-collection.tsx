import React, { FC } from 'react';

import ALink from '~/components/features/custom-link';
import ProductSm from '~/components/features/product/product-sm';
import ProductDeal from '~/components/partials/home/product-deal';

import { useItems } from 'hooks';
import { Category } from '~/utils/types';

type Props = {
  category: Category;
};

const CategoryCollection: FC<Props> = (props) => {
  const { items: rawItems, loading } = useItems({
    filterOptions: {
      categoriesIds: [props.category.id],
      random: true,
    },
  });

  const items = rawItems.slice(0, 5);

  return (
    <section className="product-deals-wrapper mb-10 pb-6">
      <div className="container">
        <h2 className="title title-line title-underline with-link">
          {props.category.name}
          <ALink
            href="/shop"
            className="btn btn-dark btn-link text-capitalize font-weight-semi-bold btn-more"
          >
            Más Premios<i className="d-icon-arrow-right"></i>
          </ALink>
        </h2>

        <div className="row grid-type">
          <div className="product-single-wrap">
            {loading ? (
              <div className="product-loading-overlay" key="deal-skel"></div>
            ) : (
              items &&
              items.length > 0 && (
                <ProductDeal
                  adClass="h-100"
                  product={
                    // Take a random item from the list
                    items[Math.floor(Math.random() * items.length)]
                  }
                />
              )
            )}
          </div>
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  className="product-loading-overlay"
                  key={'deal-skel-' + item}
                ></div>
              ))
            : items &&
              items
                .filter((item, index) => index !== 4)
                .map((item, index) => (
                  <ProductSm
                    product={item}
                    isStockCount={true}
                    key={`deal-product ${index}`}
                    isTop={true}
                  />
                ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(CategoryCollection);
