import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';

function CategorySection () {
    return (
        <section className="grey-section pt-8 pb-4">
            <div className="container">
                <div className="row cols-xl-5 cols-lg-4 cols-md-3 cols-sm-2 cols-1">
                    <div className="category category-ellipse mb-4">
                        <figure className="category-media mr-2">
                            <ALink href={ { pathname: "/shop", query: { category: "hand-bag-and-backpacks" } } }>
                                <LazyLoadImage
                                    src="images/home/category/1.png"
                                    alt="Category"
                                    width="100"
                                    height="100"
                                />
                            </ALink>
                        </figure>
                        <div className="category-content pt-0 text-left">
                            <h4 className="category-name font-weight-normal ls-s">
                                <ALink href={ { pathname: "/shop", query: { category: "hand-bag-and-backpacks" } } }>Hand Bag &amp; Backpacks</ALink>
                            </h4>
                        </div>
                    </div>
                    <div className="category category-ellipse mb-4">
                        <figure className="category-media mr-2">
                            <ALink href={ { pathname: "/shop", query: { category: "computer-hardware-and-software" } } }>
                                <LazyLoadImage
                                    src="images/home/category/2.png"
                                    alt="Category"
                                    width="100"
                                    height="100"
                                />
                            </ALink>
                        </figure>
                        <div className="category-content pt-0 text-left">
                            <h4 className="category-name font-weight-normal ls-s">
                                <ALink href={ { pathname: "/shop", query: { category: "computer-hardware-and-software" } } }>Computer HardWare
                            &amp; Software</ALink>
                            </h4>
                        </div>
                    </div>
                    <div className="category category-ellipse mb-4">
                        <figure className="category-media mr-2">
                            <ALink href={ { pathname: "/shop", query: { category: "home-audio-and-accessories" } } }>
                                <LazyLoadImage
                                    src="images/home/category/3.png"
                                    alt="Category"
                                    width="100"
                                    height="100"
                                />
                            </ALink>
                        </figure>
                        <div className="category-content pt-0 text-left">
                            <h4 className="category-name font-weight-normal ls-s">
                                <ALink href={ { pathname: "/shop", query: { category: "home-audio-and-accessories" } } }>Home Audio &amp; Accessories</ALink>
                            </h4>
                        </div>
                    </div>
                    <div className="category category-ellipse mb-4">
                        <figure className="category-media mr-2">
                            <ALink href={ { pathname: "/shop", query: { category: "watches-and-accessories" } } }>
                                <LazyLoadImage
                                    src="images/home/category/4.png"
                                    alt="Category"
                                    width="100"
                                    height="100"
                                />
                            </ALink>
                        </figure>
                        <div className="category-content pt-0 text-left">
                            <h4 className="category-name font-weight-normal ls-s">
                                <ALink href={ { pathname: "/shop", query: { category: "watches-and-accessories" } } }>Watches &amp; Accessories</ALink>
                            </h4>
                        </div>
                    </div>
                    <div className="category category-ellipse mb-4">
                        <figure className="category-media mr-2">
                            <ALink href={ { pathname: "/shop", query: { category: "healthy-and-beauty" } } }>
                                <LazyLoadImage
                                    src="images/home/category/5.png"
                                    alt="Category"
                                    width="100"
                                    height="100"
                                />
                            </ALink>
                        </figure>
                        <div className="category-content pt-0 text-left">
                            <h4 className="category-name font-weight-normal ls-s">
                                <ALink href={ { pathname: "/shop", query: { category: "healthy-and-beauty" } } }>Healthy &amp; Beauty</ALink>
                            </h4>
                        </div>
                    </div>
                    <div className="category category-ellipse mb-4">
                        <figure className="category-media mr-2">
                            <ALink href={ { pathname: "/shop", query: { category: "rice-cooker" } } }>
                                <LazyLoadImage
                                    src="images/home/category/6.png"
                                    alt="Category"
                                    width="100"
                                    height="100"
                                />
                            </ALink>
                        </figure>
                        <div className="category-content pt-0 text-left">
                            <h4 className="category-name font-weight-normal ls-s">
                                <ALink href={ { pathname: "/shop", query: { category: "rice-cooker" } } }>Home, Garden &amp; Kitchen</ALink>
                            </h4>
                        </div>
                    </div>
                    <div className="category category-ellipse mb-4">
                        <figure className="category-media mr-2">
                            <ALink href={ { pathname: "/shop", query: { category: "office-solution" } } }>
                                <LazyLoadImage
                                    src="images/home/category/7.png"
                                    alt="Category"
                                    width="100"
                                    height="100"
                                />
                            </ALink>
                        </figure>
                        <div className="category-content pt-0 text-left">
                            <h4 className="category-name font-weight-normal ls-s">
                                <ALink href={ { pathname: "/shop", query: { category: "office-solution" } } }>Office Furniture &amp; Accessories</ALink>
                            </h4>
                        </div>
                    </div>
                    <div className="category category-ellipse mb-4">
                        <figure className="category-media mr-2">
                            <ALink href={ { pathname: "/shop", query: { category: "sporting-goods-and-accessories" } } }>
                                <LazyLoadImage
                                    src="images/home/category/8.png"
                                    alt="Category"
                                    width="100"
                                    height="100"
                                />
                            </ALink>
                        </figure>
                        <div className="category-content pt-0 text-left">
                            <h4 className="category-name font-weight-normal ls-s">
                                <ALink href={ { pathname: "/shop", query: { category: "sporting-goods-and-accessories" } } }>Sporting Goods &amp; Accessories</ALink>
                            </h4>
                        </div>
                    </div>
                    <div className="category category-ellipse mb-4">
                        <figure className="category-media mr-2">
                            <ALink href={ { pathname: "/shop", query: { category: "popular-under-25" } } }>
                                <LazyLoadImage
                                    src="images/home/category/9.png"
                                    alt="Category"
                                    width="100"
                                    height="100"
                                />
                            </ALink>
                        </figure>
                        <div className="category-content pt-0 text-left">
                            <h4 className="category-name font-weight-normal ls-s">
                                <ALink href={ { pathname: "/shop", query: { category: "popular-under-25" } } }>Popular Under $25</ALink>
                            </h4>
                        </div>
                    </div>
                    <div className="category category-ellipse mb-4">
                        <figure className="category-media mr-2">
                            <ALink href={ { pathname: "/shop", query: { category: "weekly-top-seller" } } }>
                                <LazyLoadImage
                                    src="images/home/category/10.png"
                                    alt="Category"
                                    width="100"
                                    height="100"
                                />
                            </ALink>
                        </figure>
                        <div className="category-content pt-0 text-left">
                            <h4 className="category-name font-weight-normal ls-s">
                                <ALink href={ { pathname: "/shop", query: { category: "weekly-top-seller" } } }>Weekly Top Seller</ALink>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo( CategorySection );