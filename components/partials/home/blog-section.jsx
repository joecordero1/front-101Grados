import React from 'react';

import OwlCarousel from '~/components/features/owl-carousel';

import PostSix from '~/components/features/post/post-six';

import { mainSlider12 } from '~/utils/data/carousel';

function BlogSection ( props ) {
    const { posts } = props;

    return (
        <section className="mb-10 pb-2">
            <div className="container">
                <h2 className="title title-line title-underline">From Our Blog</h2>

                <OwlCarousel adClass="owl-theme" options={ mainSlider12 }>
                    {
                        posts && posts.length ?
                            posts.slice( 15 ).map( ( post, index ) => (
                                <PostSix isDate={ false } post={ post } adClass="post-sm text-center" key={ "post-six" + index } btnAdClass="btn-primary font-weight-semi-bold" />
                            ) ) : ''
                    }
                </OwlCarousel>
            </div>
        </section>
    )
}

export default React.memo( BlogSection );