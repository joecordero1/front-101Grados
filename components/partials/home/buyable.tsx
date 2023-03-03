import React from 'react';

import ALink from '~/components/features/custom-link';
import ProductNine from '~/components/features/product/product-nine';

import { useItems, useAuth, useProgram } from 'hooks';

function ElectronicCollection() {
  const { availablePoints } = useAuth();
  const { coinName } = useProgram();
  const { items, loading } = useItems({
    metaProps: {
      take: 8,
    },
    filterOptions: {
      buyable: true,
      random: true,
    },
  });

  return (
    <section className="mb-10 pb-6">
      <div className="container">
        <h2 className="title title-line title-underline with-link">
          Cómpralos Ahora
          <ALink
            href={{ pathname: '/shop', query: { category: 'electronics' } }}
            className="btn btn-dark btn-link font-weight-semi-bold text-capitalize btn-more"
          >
            Más Premios<i className="d-icon-arrow-right"></i>
          </ALink>
        </h2>

        <div className="product-wrapper products-grid row">
          <div className="banner-wrapper">
            <div
              className="banner banner-fixed content-top banner-radius"
              style={{
                // backgroundImage: 'url(images/home/banner/3.jpg)',
                // backgroundImage:
                //   'url(https://zanzibarworld.com/wp-content/uploads/2022/04/f1fd2bd5-e90f-48fa-85d1-840e2c4ace3b.jpg)',
                backgroundColor: '#313131',
              }}
            >
              <div className="banner-content">
                <h4 className="banner-subtitle text-white text-uppercase">
                  Te mereces lo mejor
                </h4>
                <h3 className="banner-title text-white font-weight-bold ls-m">
                  Disponibles con tus puntos
                </h3>
                <div className="banner-price-info text-white font-weight-semi-bold ls-m">
                  Hasta{' '}
                  <strong className="text-secondary">
                    {availablePoints} {coinName}
                  </strong>
                </div>
                <ALink
                  href={{
                    pathname: '/shop',
                    query: { category: 'electronics' },
                  }}
                  className="btn btn-white btn-outline btn-rounded"
                >
                  Comprar Ahora<i className="d-icon-arrow-right"></i>
                </ALink>
              </div>
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

export default React.memo(ElectronicCollection);
