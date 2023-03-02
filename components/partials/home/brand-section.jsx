import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';

function BrandSection () {
    return (
        <section className="brand-wrapper mb-10 pb-7">
            <div className="container">
                <h2 className="title title-line title-underline">Featured Brands</h2>

                <div className="row cols-lg-6 cols-md-4 cols-sm-3 cols-2 gutter-xs">
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/1.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/2.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/3.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/4.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/5.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/6.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/7.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/8.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/9.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/10.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/11.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                    <div className="image-wrap">
                        <figure>
                            <ALink href="#">
                                <LazyLoadImage
                                    src="images/home/brand/12.jpg"
                                    alt="Brand"
                                    width="228"
                                    height="100"
                                    effect="opacity"
                                />
                            </ALink>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo( BrandSection );