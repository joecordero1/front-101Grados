import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function BannerTwoSection () {
    return (
        <section className="category-grid mb-10 pb-3">
            <div className="container">
                <div className="row cols-md-2 cols-1">
                    <div className="banner-wrap mb-4">
                        <div className="banner banner-fixed content-middle text-right banner-radius" style={ { backgroundColor: "#e1e2e2" } }>
                            <figure>
                                <LazyLoadImage
                                    src="images/home/category/14.jpg"
                                    alt="Category Banner"
                                    width="680"
                                    height="240"
                                />
                            </figure>
                            <div className="banner-content">
                                <h4 className="banner-subtitle text-uppercase text-body ls-s">Best Seller</h4>
                                <h3 className="banner-title font-weight-bold ls-m">
                                    Wireless Speaker &amp;<br />
                                    <span className="font-weight-normal text-uppercase">Smartphone</span>
                                </h3>
                                <div className="banner-price-info font-weight-semi-bold text-body ls-m">
                                    Starting at<strong className="font-weight-bold text-secondary">$190.00</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="banner-wrap mb-4">
                        <div className="banner banner-fixed content-middle banner-radius" style={ { backgroundColor: "#2a292d" } }>
                            <figure>
                                <LazyLoadImage
                                    src="images/home/category/15.jpg"
                                    alt="Category Banner"
                                    width="680"
                                    height="240"
                                />
                            </figure>
                            <div className="banner-content">
                                <h4 className="banner-subtitle text-uppercase text-white ls-s">New Arrivals</h4>
                                <h3 className="banner-title font-weight-bold text-white ls-m">
                                    Highly Recommend<br />
                                    <span className="font-weight-normal text-uppercase">Lifestyle Shoes</span>
                                </h3>
                                <div className="banner-price-info font-weight-semi-bold text-white ls-m">
                                    From<strong className="font-weight-bold text-secondary">$70.00</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo( BannerTwoSection );