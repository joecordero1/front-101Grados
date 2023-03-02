import React from 'react';

import ALink from '~/components/features/custom-link';

import ProductNine from '~/components/features/product/product-nine';

function ElectronicCollection ( props ) {
    const { products, loading } = props;

    return (
        <section className="mb-10 pb-6">
            <div className="container">
                <h2 className="title title-line title-underline with-link">
                    Consumer Electric
                    <ALink href={ { pathname: "/shop", query: { category: "electronics" } } } className="btn btn-dark btn-link font-weight-semi-bold text-capitalize btn-more">
                        More Products<i className="d-icon-arrow-right"></i>
                    </ALink>
                </h2>

                <div className="product-wrapper products-grid row">
                    <div className="banner-wrapper">
                        <div className="banner banner-fixed content-top banner-radius" style={ { backgroundImage: "url(images/home/banner/3.jpg)", backgroundColor: "#313131" } }>
                            <div className="banner-content">
                                <h4 className="banner-subtitle text-white text-uppercase">New Collection</h4>
                                <h3 className="banner-title text-white font-weight-bold ls-m">Electronic Deals</h3>
                                <div className="banner-price-info text-white font-weight-semi-bold ls-m">
                                    Starting at<strong className="text-secondary">$350.00</strong>
                                </div>
                                <ALink href={ { pathname: "/shop", query: { category: "electronics" } } } className="btn btn-white btn-outline btn-rounded">
                                    Shop Now<i className="d-icon-arrow-right"></i></ALink>
                            </div>
                        </div>
                    </div>
                    {
                        loading ?
                            [ 1, 2, 3, 4, 5, 6, 7, 8 ].map( item => <div className="product-loading-overlay" key={ 'electronic-' + item }></div> )
                            : (
                                products && products.map( ( item, index ) =>
                                    <ProductNine
                                        product={ item }
                                        isCategory={ false }
                                        isRating={ false }
                                        adClass="text-center"
                                        key={ `electronic-${ index }` }
                                    />
                                )
                            )
                    }
                </div>
            </div>
        </section>
    )
}

export default React.memo( ElectronicCollection );
