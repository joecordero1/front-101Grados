import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { productSlider2 } from '~/utils/data/carousel';

function BrandSection ( props ) {
    const { products, loading } = props;

    return (
        <section className="recent-product mb-10 pb-8">
            <div className="container">
                <h2 className="title title-line title-underline">Your Recently Viewed Products</h2>

                {

                    loading ?
                        <OwlCarousel adClass="owl-theme" options={ productSlider2 }>
                            {
                                [ 1, 2, 3, 4, 5, 6, 7, 8 ].map( item =>
                                    <div className="product-loading-overlay" key={ 'recent-' + item }></div> )
                            }
                        </OwlCarousel>
                        :
                        <OwlCarousel adClass="owl-theme" options={ productSlider2 }>
                            {
                                products && products.map( ( item, index ) =>
                                    <ALink href={ `/product/default/${ item.slug }` } key={ 'recent-' + index }>
                                        <figure>
                                            <LazyLoadImage
                                                src={ process.env.NEXT_PUBLIC_ASSET_URI + item.pictures[ 0 ].url }
                                                alt="Product"
                                                width="155"
                                                height="174"
                                            />
                                        </figure>
                                    </ALink>
                                )
                            }
                        </OwlCarousel>
                }
            </div>
        </section>
    )
}

export default React.memo( BrandSection );