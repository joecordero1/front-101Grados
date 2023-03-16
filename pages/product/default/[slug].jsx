import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import imagesLoaded from 'imagesloaded';

import withApollo from '~/server/apollo';
import { GET_PRODUCT } from '~/server/queries';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import MediaFive from '~/components/partials/product/media/media-five';
import DetailThree from '~/components/partials/product/detail/detail-three';
import DescOne from '~/components/partials/product/desc/desc-one';
import RelatedProducts from '~/components/partials/product/related-products';
import ProductSidebar from '~/components/partials/product/product-sidebar';
import ProductNav from '~/components/partials/product/product-nav';

import { mainSlider17 } from '~/utils/data/carousel';

function ProductRightSidebar() {
  const slug = useRouter().query.slug;

  if (!slug) return '';

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { slug },
  });
  const [loaded, setLoadingState] = useState(false);
  const product = data && data.product.data;
  const related = data && data.product.related;

  useEffect(() => {
    if (!loading && product)
      imagesLoaded('main')
        .on('done', function () {
          setLoadingState(true);
        })
        .on('progress', function () {
          setLoadingState(false);
        });
    if (loading) setLoadingState(false);
  }, [loading, product]);

  return (
    <main className="main market1-product single-product">
      <Helmet>
        <title>Tienda | Producto</title>
      </Helmet>

      <h1 className="d-none">Tienda - Product With Right Sidebar</h1>

      {product !== undefined ? (
        <div className={`page-content mb-10 pb-6 ${loaded ? '' : 'd-none'}`}>
          <div className="container skeleton-body">
            <nav className="breadcrumb-nav product-navigation">
              <ul className="breadcrumb pt-0 pb-0 mb-0">
                <li>
                  <ALink href="/shop">
                    <i className="d-icon-home"></i>
                  </ALink>
                </li>
                <li>
                  <ALink href="#" className="active">
                    Products
                  </ALink>
                </li>
                <li>Detail</li>
              </ul>

              <ProductNav product={data && data.product} adClass="mb-0" />
            </nav>

            <div className="row gutter-lg">
              <ProductSidebar />

              <div className="col-xl-9 col-lg-8">
                <div className="product product-single row mb-8">
                  <div className="col-md-6">
                    <MediaFive product={product} />
                  </div>

                  <div className="col-md-6">
                    <DetailThree data={data} isNav={false} />
                  </div>
                </div>

                <DescOne product={product} isDivider={false} />

                <RelatedProducts products={related} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {loaded && !loading ? (
        ''
      ) : (
        <div className="skeleton-body container mb-10">
          <div className="row mt-6 gutter-lg">
            <div className="col-lg-3 right-sidebar sidebar-fixed sticky-sidebar-wrapper">
              <div className="sidebar-content">
                <div className="widget-2"></div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="skel-pro-gallery"></div>
                </div>

                <div className="col-md-6">
                  <div className="skel-pro-summary"></div>
                </div>
              </div>

              <div className="skel-pro-tabs"></div>

              <section className="pt-3 mt-4">
                <h2 className="title justify-content-center">
                  Related Products
                </h2>

                <OwlCarousel
                  adClass="owl-carousel owl-theme owl-nav-full"
                  options={mainSlider17}
                >
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      className="product-loading-overlay"
                      key={'popup-skel-' + item}
                    ></div>
                  ))}
                </OwlCarousel>
              </section>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(
  ProductRightSidebar
);
