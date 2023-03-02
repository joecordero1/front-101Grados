import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { mainSlider3 } from '~/utils/data/carousel'

function BannerThreeSection () {
    return (
        <section className="banner-section mb-10 pb-7">
            <div className="container">
                <div className="banner banner-radius" style={ { backgroundImage: "url(images/home/banner/5.jpg)", backgroundColor: "#2f2d2c" } }>
                    <div className="banner-content content-left mr-4">
                        <h3 className="banner-title text-white text-uppercase font-weight-bold ls-m">Today’s Special</h3>
                        <p className="text-white font-weight-normal ls-m">New collection release spring season</p>
                        <ALink href="/shop" className="btn btn-primary btn-link btn-underline">View All Collection<i className="d-icon-arrow-right"></i></ALink>
                    </div>
                    <div className="banner-content content-right">
                        <OwlCarousel adClass="owl-theme" options={ { nav: true, dots: false, items: 1 } }>
                            <div className="banner-item text-center">
                                <h4 className="item-subtitle text-white text-uppercase font-weight-bold ls-m">On Shoes</h4>
                                <h3 className="item-title text-primary ls-m">Up to 30% Off</h3>
                                <ALink href="/shop" className="btn btn-white btn-link btn-slide-right">Shop Now<i className="d-icon-arrow-right"></i></ALink>
                            </div>
                            <div className="banner-item text-center">
                                <h4 className="item-subtitle text-white text-uppercase font-weight-bold ls-m">On Sneakers</h4>
                                <h3 className="item-title text-primary ls-m">Up to 20% Off</h3>
                                <ALink href="/shop" className="btn btn-white btn-link btn-slide-right">Shop Now<i className="d-icon-arrow-right"></i></ALink>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo( BannerThreeSection );