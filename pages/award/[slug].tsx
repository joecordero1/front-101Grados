import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Helmet from "react-helmet";
import imagesLoaded from "imagesloaded";

import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";

import MediaFive from "~/components/partials/product/media/media-five";
import DetailThree from "~/components/partials/product/detail/detail-three";
import DescOne from "~/components/partials/product/desc/desc-one";
import RelatedProducts from "~/components/partials/product/related-products";
import ProductSidebar from "~/components/partials/product/product-sidebar";
import ProductNav from "~/components/partials/product/product-nav";

import { mainSlider17 } from "~/utils/data/carousel";
import { useAuth, useItem } from "~/hooks";
import useLogs from "~/hooks/useLogs";
import { LogType } from "~/utils/types/logType";

function ProductRightSidebar() {
  const slug = useRouter().query.slug;
  const { item, loading } = useItem(slug);
  const { dispatchLog } = useLogs();
  const { participant } = useAuth();
  useEffect(() => {
    if (item) {
      console.log("veces");
      dispatchLog(LogType.OPEN_AWARD, participant.id, {
        awardId: item.award.id,
      });
    }
  }, [item]);
  return (
    <main className="main market1-product single-product">
      <Helmet>
        <title>Tienda | Producto</title>
      </Helmet>

      <h1 className="d-none">Tienda - Product With Right Sidebar</h1>

      {item && (
        <div className={`page-content mb-10 pb-6`}>
          <div className="container skeleton-body">
            <nav className="breadcrumb-nav product-navigation">
              <ul className="breadcrumb pt-0 pb-0 mb-0">
                <li>
                  <ALink href="/shop">
                    <i className="d-icon-home"></i>
                  </ALink>
                </li>
                <li>
                  <ALink href="/shop" className="active">
                    Premios
                  </ALink>
                </li>
                <li>Detalle</li>
              </ul>

              <ProductNav product={item && item} adClass="mb-0" />
            </nav>

            <div className="row gutter-lg">
              {/*     <ProductSidebar /> */}

              <div className="col-xl-9 col-lg-8">
                <div className="product product-single row mb-8">
                  <div className="col-md-6">
                    <MediaFive product={item} />
                  </div>

                  <div className="col-md-6">
                    <DetailThree
                      data={{ ...item, quantity: 1 }}
                      isNav={false}
                    />
                  </div>
                </div>
                <RelatedProducts item={item} />
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading ? (
        ""
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
                  Premios Relacionados
                </h2>

                <OwlCarousel
                  adClass="owl-carousel owl-theme owl-nav-full"
                  options={mainSlider17}
                >
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      className="product-loading-overlay"
                      key={"popup-skel-" + item}
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

export default ProductRightSidebar;
