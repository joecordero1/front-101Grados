import React from 'react';
import Helmet from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';

import SidebarFilterOne from '~/components/partials/vendor/sidebar-filter-one';
import ProductListOne from '../../components/partials/shop/product-list/product-list-one';

function VendorSingle () {
    return (
        <main className="main vendor">
            <Helmet>
                <title>Riode React eCommerce Template | Vendor Detail </title>
            </Helmet>

            <div className="page-content mb-10">
                <div className="container">
                    <nav className="breadcrumb-nav">
                        <ul className="breadcrumb">
                            <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                            <li><ALink href="/vendor">Store</ALink></li>
                            <li>Vendor Detail</li>
                        </ul>
                    </nav>

                    <div className="row gutter-lg">
                        <SidebarFilterOne />

                        <div className="col-xl-9 col-lg-8 main-content">
                            <div className="vendor-store-banner banner banner-fixed banner-radius mb-4">
                                <figure>
                                    <LazyLoadImage
                                        src="images/home/vendor/store/7.jpg"
                                        alt="Vendor"
                                        width="1030"
                                        height="500"
                                        effect="opacity"
                                    />
                                </figure>
                                <div className="vendor-store-content banner-content">
                                    <figure>
                                        <LazyLoadImage
                                            src="images/home/vendor/store/vendor.png"
                                            alt="Vendor avatar"
                                            width="80"
                                            height="80"
                                            effect="opacity"
                                        />
                                    </figure>
                                    <h2 className="vendor-store-title">Sterling Captial Group</h2>
                                    <ul>
                                        <li>
                                            <i className="d-icon-map"></i>
                                            <span className="street"> Steven Street,</span>
                                            <span className="city"> El Carjon,</span>
                                            <span className="state"> California,</span>
                                            <span className="country"> United States (US) </span>
                                        </li>
                                        <li>
                                            <i className="d-icon-phone"></i>
                                            <ALink href="tel:123456789">123456789</ALink>
                                        </li>
                                        <li>
                                            <i className="d-icon-star-full"></i>
                                            <span>4.67 rating from 9 reviews</span>
                                        </li>
                                        <li>
                                            <i className="d-icon-bag"></i>
                                            <span>Store Open</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <ProductListOne isToolbox={ false } adClass="mt-6" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default React.memo( VendorSingle );