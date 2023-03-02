import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { mainSlider12 } from '~/utils/data/carousel';

function VendorSection () {
    return (
        <section className="mb-10 pb-7">
            <div className="container">
                <h2 className="title title-line title-underline">Top Weekly Vendors</h2>

                <OwlCarousel className="owl-theme" options={ mainSlider12 }>
                    <div className="vendor-widget">
                        <div className="vendor-details">
                            <figure className="vendor-logo">
                                <ALink href="/vendor/single">
                                    <LazyLoadImage
                                        src="images/home/vendor/logo-1.png"
                                        alt="Vendor logo"
                                        width="70"
                                        height="70"
                                        effect="opacity"
                                    />
                                </ALink>
                            </figure>
                            <div className="vendor-personal">
                                <h4 className="vendor-name">
                                    <ALink href="#">Vendor 1 </ALink>
                                    <span className="vendor-products-count">( 16 Products )</span>
                                </h4>
                                <div className="ratings-container mb-0">
                                    <div className="ratings-full">
                                        <span className="ratings" style={ { width: "100%" } }></span>
                                        <span className="tooltiptext tooltip-top">5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vendor-products grid-type gutter-xs">
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/1.jpg"
                                            alt="Vendor Product"
                                            width="217"
                                            height="245"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/2.jpg"
                                            alt="Vendor Product"
                                            width="108"
                                            height="120"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/3.jpg"
                                            alt="Vendor Product"
                                            width="108"
                                            height="120"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div className="vendor-widget">
                        <div className="vendor-details">
                            <figure className="vendor-logo">
                                <ALink href="/vendor/single">
                                    <LazyLoadImage
                                        src="images/home/vendor/logo-2.png"
                                        alt="Vendor logo"
                                        width="70"
                                        height="70"
                                        effect="opacity"
                                    />
                                </ALink>
                            </figure>
                            <div className="vendor-personal">
                                <h4 className="vendor-name">
                                    <ALink href="#">Vendor 2 </ALink>
                                    <span className="vendor-products-count">( 20 Products )</span>
                                </h4>
                                <div className="ratings-container mb-0">
                                    <div className="ratings-full">
                                        <span className="ratings" style={ { width: "100%" } }></span>
                                        <span className="tooltiptext tooltip-top">5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vendor-products grid-type gutter-xs">
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/4.jpg"
                                            alt="Vendor Product"
                                            width="217"
                                            height="245"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/5.jpg"
                                            alt="Vendor Product"
                                            width="108"
                                            height="120"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/6.jpg"
                                            alt="Vendor Product"
                                            width="108"
                                            height="120"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div className="vendor-widget">
                        <div className="vendor-details">
                            <figure className="vendor-logo">
                                <ALink href="/vendor/single">
                                    <LazyLoadImage
                                        src="images/home/vendor/logo-3.png"
                                        alt="Vendor logo"
                                        width="70"
                                        height="70"
                                        effect="opacity"
                                    />
                                </ALink>
                            </figure>
                            <div className="vendor-personal">
                                <h4 className="vendor-name">
                                    <ALink href="#">Vendor 3 </ALink>
                                    <span className="vendor-products-count">( 15 Products )</span>
                                </h4>
                                <div className="ratings-container mb-0">
                                    <div className="ratings-full">
                                        <span className="ratings" style={ { width: "100%" } }></span>
                                        <span className="tooltiptext tooltip-top">5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vendor-products grid-type gutter-xs">
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/7.jpg"
                                            alt="Vendor Product"
                                            width="217"
                                            height="245"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/8.jpg"
                                            alt="Vendor Product"
                                            width="108"
                                            height="120"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/9.jpg"
                                            alt="Vendor Product"
                                            width="108"
                                            height="120"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div className="vendor-widget">
                        <div className="vendor-details">
                            <figure className="vendor-logo">
                                <ALink href="/vendor/single">
                                    <LazyLoadImage
                                        src="images/home/vendor/logo-4.png"
                                        alt="Vendor logo"
                                        width="70"
                                        height="70"
                                        effect="opacity"
                                    />
                                </ALink>
                            </figure>
                            <div className="vendor-personal">
                                <h4 className="vendor-name">
                                    <ALink href="#">Vendor 4 </ALink>
                                    <span className="vendor-products-count">( 30 Products )</span>
                                </h4>
                                <div className="ratings-container mb-0">
                                    <div className="ratings-full">
                                        <span className="ratings" style={ { width: "100%" } }></span>
                                        <span className="tooltiptext tooltip-top">5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vendor-products grid-type gutter-xs">
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/10.jpg"
                                            alt="Vendor Product"
                                            width="217"
                                            height="245"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/11.jpg"
                                            alt="Vendor Product"
                                            width="108"
                                            height="120"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                            <div className="vendor-product">
                                <figure className="product-media">
                                    <ALink href="/shop">
                                        <LazyLoadImage
                                            src="images/home/vendor/12.jpg"
                                            alt="Vendor Product"
                                            width="108"
                                            height="120"
                                            effect="opacity"
                                        />
                                    </ALink>
                                </figure>
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
        </section>
    )
}

export default React.memo( VendorSection );