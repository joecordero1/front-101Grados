import React from 'react';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import ShopBanner from '~/components/partials/shop/shop-banner';
import ToolBox from '~/components/partials/shop/toolbox';
import ProductListOne from '~/components/partials/shop/product-list/product-list-one';

import filterData from '~/utils/data/shop';
import { brandSlider2 } from '../../utils/data/carousel';

function ShopHorizontalFilter () {
    const router = useRouter();
    const query = router.query;

    const prices = [
        { min: '0', max: '50' },
        { min: '50', max: '100' },
        { min: '100', max: '200' },
        { min: '200', max: '' }
    ]

    const containsAttrInUrl = ( type, value ) => {
        const currentQueries = query[ type ] ? query[ type ].split( ',' ) : [];
        return currentQueries && ( currentQueries.includes( value ) || ( type === 'max_price' && value === '' ) || ( type === 'min_price' && value === '' ) );
    }

    const getUrlForAttrs = ( type, value ) => {
        let currentQueries = query[ type ] ? query[ type ].split( ',' ) : [];
        currentQueries = containsAttrInUrl( type, value ) ? currentQueries.filter( item => item !== value ) : ( type === 'min_price' || type === 'max_price' ) ? [ value ] : [ ...currentQueries, value ];
        return currentQueries.join( ',' );
    }

    const selectFilterHandler = () => {
        if ( document.querySelectorAll( '.select-items .select-item' ).length === 1 ) {
            document.querySelector( '.select-items' ).removeAttribute( 'style' )
        }
    }

    const cleanAllHandler = () => {
        document.querySelector( '.select-items' ).removeAttribute( 'style' );
    }

    return (
        <main className="main">
            <Helmet>
                <title>Riode React eCommerce Template - Shop Horizontal Filter</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Shop Horizontal Filter</h1>

            <nav className="breadcrumb-nav">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><ALink href="/"><i className="d-icon-home"></i></ALink></li>
                        <li>Riode Shop</li>
                    </ul>
                </div>
            </nav>


            <div className="page-content mb-10 pb-2">
                <div className="container">
                    <ShopBanner />

                    <div className="brand-wrapper mb-8">
                        <OwlCarousel adClass="owl-theme" options={ brandSlider2 }>
                            <figure>
                                <LazyLoadImage
                                    src="images/home/brand/shop/1.jpg"
                                    alt="Brand"
                                    width="197"
                                    height="93"
                                />
                            </figure>
                            <figure>
                                <LazyLoadImage
                                    src="images/home/brand/shop/2.jpg"
                                    alt="Brand"
                                    width="213"
                                    height="100"
                                />
                            </figure>
                            <figure>
                                <LazyLoadImage
                                    src="images/home/brand/shop/3.jpg"
                                    alt="Brand"
                                    width="213"
                                    height="100"
                                />
                            </figure>
                            <figure>
                                <LazyLoadImage
                                    src="images/home/brand/shop/4.jpg"
                                    alt="Brand"
                                    width="213"
                                    height="100"
                                />
                            </figure>
                            <figure>
                                <LazyLoadImage
                                    src="images/home/brand/shop/5.jpg"
                                    alt="Brand"
                                    width="213"
                                    height="100"
                                />
                            </figure>
                            <figure>
                                <LazyLoadImage
                                    src="images/home/brand/shop/6.jpg"
                                    alt="Brand"
                                    width="213"
                                    height="100"
                                />
                            </figure>
                            <figure>
                                <LazyLoadImage
                                    src="images/home/brand/shop/7.jpg"
                                    alt="Brand"
                                    width="213"
                                    height="100"
                                />
                            </figure>
                        </OwlCarousel>
                    </div>

                    <div className="row cols-xl-8 cols-lg-6 cols-md-4 cols-sm-3 cols-2">
                        <div className="category-wrap mb-4">
                            <div className={ `category category-icon ${ query.category === "fashion" ? "active" : "" }` }>
                                <ALink href={ { pathname: '/shop', query: { category: "fashion" } } } scroll={ false }>
                                    <figure className="categroy-media">
                                        <i className="d-icon-t-shirt1"></i>
                                    </figure>
                                    <div className="category-content">
                                        <h4 className="category-name">Fashion</h4>
                                    </div>
                                </ALink>
                            </div>
                        </div>
                        <div className="category-wrap mb-4">
                            <div className={ `category category-icon ${ query.category === "furniture" ? "active" : "" }` }>
                                <ALink href={ { pathname: '/shop', query: { category: "furniture" } } } scroll={ false }>
                                    <figure className="categroy-media">
                                        <i className="d-icon-sofa"></i>
                                    </figure>
                                    <div className="category-content">
                                        <h4 className="category-name">Furniture</h4>
                                    </div>
                                </ALink>
                            </div>
                        </div>
                        <div className="category-wrap mb-4">
                            <div className={ `category category-icon ${ query.category === "sports" ? "active" : "" }` }>
                                <ALink href={ { pathname: '/shop', query: { category: "sports" } } } scroll={ false }>
                                    <figure className="categroy-media">
                                        <i className="d-icon-basketball1"></i>
                                    </figure>
                                    <div className="category-content">
                                        <h4 className="category-name">Sports</h4>
                                    </div>
                                </ALink>
                            </div>
                        </div>
                        <div className="category-wrap mb-4">
                            <div className={ `category category-icon ${ query.category === "toys" ? "active" : "" }` }>
                                <ALink href={ { pathname: '/shop', query: { category: "toys" } } } scroll={ false }>
                                    <figure className="categroy-media">
                                        <i className="d-icon-babycare"></i>
                                    </figure>
                                    <div className="category-babycare">
                                        <h4 className="category-name">Toys</h4>
                                    </div>
                                </ALink>
                            </div>
                        </div>
                        <div className="category-wrap mb-4">
                            <div className={ `category category-icon ${ query.category === "cameras" ? "active" : "" }` }>
                                <ALink href={ { pathname: '/shop', query: { category: "cameras" } } } scroll={ false }>
                                    <figure className="categroy-media">
                                        <i className="d-icon-camera1"></i>
                                    </figure>
                                    <div className="category-content">
                                        <h4 className="category-name">Cameras</h4>
                                    </div>
                                </ALink>
                            </div>
                        </div>
                        <div className="category-wrap mb-4">
                            <div className={ `category category-icon ${ query.category === "gaming" ? "active" : "" }` }>
                                <ALink href={ { pathname: '/shop', query: { category: "gaming" } } } scroll={ false }>
                                    <figure className="categroy-media">
                                        <i className="d-icon-gamepad1"></i>
                                    </figure>
                                    <div className="category-babycare">
                                        <h4 className="category-name">Gaming</h4>
                                    </div>
                                </ALink>
                            </div>
                        </div>
                        <div className="category-wrap mb-4">
                            <div className={ `category category-icon ${ query.category === "headphones" ? "active" : "" }` }>
                                <ALink href={ { pathname: '/shop', query: { category: "headphones" } } } scroll={ false }>
                                    <figure className="categroy-media">
                                        <i className="d-icon-headphone"></i>
                                    </figure>
                                    <div className="category-content">
                                        <h4 className="category-name">Headphones</h4>
                                    </div>
                                </ALink>
                            </div>
                        </div>
                        <div className="category-wrap mb-4">
                            <div className={ `category category-icon ${ query.category === "smartphone" ? "active" : "" }` }>
                                <ALink href={ { pathname: '/shop', query: { category: "smartphone" } } } scroll={ false }>
                                    <figure className="categroy-media">
                                        <i className="d-icon-mobile"></i>
                                    </figure>
                                    <div className="category-content">
                                        <h4 className="category-name">SmartPhone</h4>
                                    </div>
                                </ALink>
                            </div>
                        </div>
                    </div>

                    <ToolBox type="horizontal" />

                    <div className="select-items">
                        {
                            filterData.sizes.map( ( item, index ) =>
                                containsAttrInUrl( 'sizes', item.slug ) ? <ALink className="select-item" href={ { pathname: router.pathname, query: { ...query, page: 1, sizes: getUrlForAttrs( 'sizes', item.slug ), type: router.query.type ? router.query.type : null } } } key={ item + ' - ' + index } onClick={ selectFilterHandler } scroll={ false }>{ item.name }<i className="d-icon-times"></i></ALink> : ''
                            )
                        }
                        {
                            filterData.colors.map( ( item, index ) =>
                                containsAttrInUrl( 'colors', item.slug ) ? <ALink className="select-item" href={ { pathname: router.pathname, query: { ...query, page: 1, sizes: getUrlForAttrs( 'colors', item.slug ) } } } key={ item + ' - ' + index } onClick={ selectFilterHandler } scroll={ false }>{ item.name }<i className="d-icon-times"></i></ALink> : ''
                            )
                        }
                        {
                            prices.map( ( price, index ) =>
                                containsAttrInUrl( 'min_price', price.min ) && containsAttrInUrl( 'max_price', price.max ) ?
                                    <ALink className="select-item" href={ { pathname: router.pathname, query: { ...query, page: 1, min_price: getUrlForAttrs( 'min_price', price.min ), max_price: getUrlForAttrs( 'max_price', price.max ), type: router.query.type ? router.query.type : null } } } key={ price + ' - ' + index } onClick={ selectFilterHandler } scroll={ false }>
                                        {
                                            price.max === '' ? `$${ price.min }.00 +`
                                                :
                                                `$${ price.min }.00 - $${ price.max }.00`

                                        }<i className="d-icon-times"></i>
                                    </ALink> : ''
                            )
                        }
                        <ALink href={ { pathname: router.pathname, query: { type: router.query.type ? router.query.type : null } } } className="filter-clean text-primary" onClick={ cleanAllHandler } scroll={ false }>Clean All</ALink>
                    </div>

                    <div className="row main-content-wrap gutter-lg">
                        <div className="main-content">
                            <ProductListOne isToolbox={ false } itemsPerRow={ 5 } />
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default React.memo( ShopHorizontalFilter );