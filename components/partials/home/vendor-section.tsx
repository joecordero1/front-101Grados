import React, { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';
import { mainSlider12 } from '~/utils/data/carousel';

import { useCategories, useItems } from 'hooks';
import { take } from 'redux-saga/effects';

function VendorSection() {
  const { categories: rawCategories } = useCategories({
    take: 10,
    random: true,
  });

  const categories = rawCategories.slice(0, 4);

  return (
    <section className="mb-10 pb-7">
      <div className="container">
        <h2 className="title title-line title-underline">
          Categorías de la Semana
        </h2>

        <OwlCarousel className="owl-theme" options={mainSlider12}>
          {categories.map((category) => (
            <div className="vendor-widget" key={category.id}>
              <div className="vendor-details">
                <figure
                  className="vendor-logo"
                  style={{
                    width: '100px',
                  }}
                >
                  <ALink href="/vendor/single">
                    <LazyLoadImage
                      src={
                        category.image
                          ? category.image
                          : '../../images/empty.jpg'
                      }
                      alt="Vendor logo"
                      effect="opacity"
                    />
                  </ALink>
                </figure>
                <div className="vendor-personal">
                  <h4 className="vendor-name">
                    <ALink href="#">{category.name}</ALink>
                    {/* <span className="vendor-products-count">
                      ( 16 Products )
                    </span> */}
                  </h4>
                  <div className="ratings-container mb-0">
                    <div className="ratings-full">
                      <span
                        className="ratings"
                        style={{ width: '100%' }}
                      ></span>
                      <span className="tooltiptext tooltip-top">5</span>
                    </div>
                  </div>
                </div>
              </div>
              <CategoryItems categoryId={category.id} />
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
}

const CategoryItems: FC<{
  categoryId: number;
}> = ({ categoryId }) => {
  const { items } = useItems({
    metaProps: {
      take: 3,
    },
    filterOptions: {
      categoriesIds: [categoryId],
      random: true,
    },
  });

  return (
    <>
      <div className="vendor-products grid-type gutter-xs">
        {items.map((item) => (
          <div className="vendor-product" key={item.id}>
            <figure className="product-media">
              <ALink href="/shop">
                <LazyLoadImage
                  src={
                    item.award.mainImage
                      ? item.award.mainImage
                      : '../../images/empty.jpg'
                  }
                  alt="Vendor Product"
                  width="217"
                  height="245"
                  effect="opacity"
                />
              </ALink>
            </figure>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(VendorSection);
