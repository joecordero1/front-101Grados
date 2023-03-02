import React from 'react';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';
import ProductNine from '~/components/features/product/product-nine';
import { productSlider } from '~/utils/data/carousel';

import { useItems } from 'hooks';

function BestCollection(props) {
  const { items, loading } = useItems({
    metaProps: {
      take: 5,
    },
    filterOptions: {
      random: true,
    },
  });

  return (
    <section className="mb-10 pb-3">
      <div className="container">
        <h2 className="title title-line title-underline with-link">
          Premios más Canjeados
          <ALink
            href="/shop"
            className="btn btn-dark btn-link font-weight-semi-bold text-capitalize btn-more"
          >
            Más Premios<i className="d-icon-arrow-right"></i>
          </ALink>
        </h2>

        {loading ? (
          <OwlCarousel adClass="owl-theme" options={productSlider}>
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                className="product-loading-overlay"
                key={'best-selling-skel-' + item}
              ></div>
            ))}
          </OwlCarousel>
        ) : (
          <OwlCarousel adClass="owl-theme" options={productSlider}>
            {items.map((item, index) => (
              <ProductNine
                adClass="text-center"
                product={item}
                isStockCount={true}
                key={`top-selling-product ${index}`}
              />
            ))}
          </OwlCarousel>
        )}
      </div>
    </section>
  );
}

export default React.memo(BestCollection);
