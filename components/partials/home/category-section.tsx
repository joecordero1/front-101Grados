import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';

import { useCategories } from 'hooks';

function CategorySection() {
  const { categories } = useCategories();

  return (
    <section className="grey-section pt-8 pb-4">
      <div className="container">
        <div className="row cols-xl-5 cols-lg-4 cols-md-3 cols-sm-2 cols-1">
          {categories.map((category) => (
            <div className="category category-ellipse mb-4" key={category.id}>
              <figure className="category-media mr-2">
                <ALink
                  href={{
                    pathname: '/shop',
                    query: { category: category.id },
                  }}
                >
                  <LazyLoadImage
                    src={
                      category.image ? category.image : '../../images/empty.jpg'
                    }
                    alt="Category"
                    width="100"
                    height="100"
                  />
                </ALink>
              </figure>
              <div className="category-content pt-0 text-left">
                <h4 className="category-name font-weight-normal ls-s">
                  <ALink
                    href={{
                      pathname: '/shop',
                      query: { category: 'hand-bag-and-backpacks' },
                    }}
                  >
                    {category.name}
                  </ALink>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(CategorySection);
