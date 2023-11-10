import React from 'react';

import ALink from '~/components/features/custom-link';
import ProductNine from '~/components/features/product/product-nine';

import { useItems, useAuth, useProgram } from 'hooks';
import { Catalogue } from '~/utils/types';

interface SpecialCollectionProps {
  catalogue: Catalogue;
}

function SpecialCollection({ catalogue }: SpecialCollectionProps) {
  const { availablePoints } = useAuth();
  const { coinName } = useProgram();

  const { items, loading } = useItems({
    metaProps: {
      take: 8,
    },
    filterOptions: {
      catalogueId: catalogue.id,
      random: true,
    },
  });

  return (
    <section className="mb-10 pb-6">
      <div className="container">
        <h2 className="title title-line title-underline with-link">
          {catalogue.name}
          <ALink
            href={{ pathname: '/shop', query: { catalogueId: catalogue.id } }}
            className="btn btn-dark btn-link font-weight-semi-bold text-capitalize btn-more"
          >
            Más Premios<i className="d-icon-arrow-right"></i>
          </ALink>
        </h2>

        <div className="product-wrapper products-grid row">
          <div className="banner-wrapper">
            <div className="banner banner-fixed content-top banner-radius">
              <img
                src={catalogue.coverImage}
                alt="cover-image"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  className="product-loading-overlay"
                  key={'electronic-' + item}
                ></div>
              ))
            : items.map((item, index) => (
                <ProductNine
                  product={item}
                  isCategory={false}
                  isRating={false}
                  adClass="text-center"
                  key={`electronic-${index}`}
                />
              ))}
        </div>
      </div>
    </section>
  );
}

export default SpecialCollection;
