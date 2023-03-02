import React from 'react';

import OwlCarousel from '~/components/features/owl-carousel';

import { serviceSlider } from '~/utils/data/carousel';

function ServiceBox ( props ) {
    return (
        <div className="service-wrapper mt-2 mb-10">
            <div className="service-list">
                <OwlCarousel adClass="owl-theme" options={ serviceSlider }>
                    <div className="icon-box icon-box-side icon-box1">
                        <i className="icon-box-icon d-icon-truck"></i>
                        <div className="icon-box-content">
                            <h4 className="icon-box-title text-capitalize lh-1">Free Shipping &amp; Return</h4>
                            <p className="lh-1">Free shipping on orders over $99</p>
                        </div>
                    </div>

                    <div className="icon-box icon-box-side icon-box2">
                        <i className="icon-box-icon d-icon-service"></i>
                        <div className="icon-box-content">
                            <h4 className="icon-box-title text-capitalize lh-1">Customer Support 24/7</h4>
                            <p className="lh-1">Instant access to perfect support</p>
                        </div>
                    </div>

                    <div className="icon-box icon-box-side icon-box3">
                        <i className="icon-box-icon d-icon-secure"></i>
                        <div className="icon-box-content">
                            <h4 className="icon-box-title text-capitalize lh-1">100% Secured Payment</h4>
                            <p className="lh-1">We ensure secure payment!</p>
                        </div>
                    </div>

                    <div className="icon-box icon-box-side icon-box4">
                        <i className="icon-box-icon d-icon-money"></i>
                        <div className="icon-box-content">
                            <h4 className="icon-box-title text-capitalize lh-1">Money Back Guarantee</h4>
                            <p className="lh-1">Any back within 30 days</p>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
        </div>
    )
}

export default React.memo( ServiceBox );