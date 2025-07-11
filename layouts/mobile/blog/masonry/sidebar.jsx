import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import imagesLoaded from 'imagesloaded';

import withApollo from '~/server/apollo';
import { GET_POSTS } from '~/server/queries';

import ALink from '~/components/features/custom-link';
import Pagination from '~/components/features/pagination';

import PostNine from '~/components/features/post/post-nine';
import BlogSidebar from '~/components/partials/post/blog-sidebar';

import { scrollTopHandler } from '~/utils';

function PostMasonrySidebar() {
  const router = useRouter();
  const [isFirst, setFirst] = useState(true);
  const query = router.query;
  const showingCount = 8;
  const [getPosts, { data, loading, error }] = useLazyQuery(GET_POSTS);
  const [perPage, setPerPage] = useState(showingCount);
  const posts = data && data.posts.data;
  const totalPage = data
    ? parseInt(data.posts.total / perPage) +
      (data.posts.total % perPage ? 1 : 0)
    : 1;
  let page = query.page ? query.page : 1;
  let from = perPage * (page - 1);
  let to = perPage * page;

  useEffect(() => {
    getPosts({
      variables: {
        category: query.category,
        from: from,
        to: to,
      },
    });

    if (isFirst) {
      setFirst(false);
    } else {
      scrollTopHandler();
    }
  }, [query]);

  const ref = useRef(null);

  useEffect(() => {
    if (!loading && posts) {
      let item = document.querySelector('.posts.grid');
      item &&
        imagesLoaded(item).on('done', function () {
          isotopeInit();
        });
    }
  }, [loading, posts]);

  async function isotopeInit() {
    const Isotope = (await import('isotope-layout')).default;

    let iso = new Isotope(ref.current, {
      itemSelector: '.grid-item',
    });
  }

  return (
    <main className="main skeleton-body">
      <Helmet>
        <title>Tienda | Blog Masonry With Sidebar</title>
      </Helmet>

      <h1 className="d-none">Tienda - Blog Masonry With Sidebar</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>
              <ALink href="/blog/classic" className="active">
                Blog
              </ALink>
            </li>
            <li>Masonry With Sidebar</li>
          </ul>
        </div>
      </nav>

      <div className="page-content with-sidebar">
        <div className="container">
          <div className="row gutter-lg">
            <div className="col-lg-9">
              {loading ? (
                <div className="posts grid row" style={{ display: 'flex' }}>
                  {new Array(parseInt(perPage)).fill(1).map((item, index) => (
                    <div className="col-sm-6" key={'skel-post' + index}>
                      <div className="skel-post"></div>
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )}

              <div className="posts grid row masonry" ref={ref}>
                {loading ? (
                  ''
                ) : posts ? (
                  posts.length ? (
                    posts.slice(0, posts.length).map((post, index) => (
                      <React.Fragment key={'post-nine' + index}>
                        <div className="grid-item col-sm-6">
                          <PostNine
                            post={post}
                            isOriginal={true}
                            type="masonry"
                          />
                        </div>
                      </React.Fragment>
                    ))
                  ) : (
                    <div className="info-box with-icon">
                      <p className="mt-4">
                        No blogs were found matching your selection.
                      </p>
                    </div>
                  )
                ) : (
                  ''
                )}
              </div>

              <Pagination totalPage={totalPage} />
            </div>
            <BlogSidebar />
          </div>
        </div>
      </div>
    </main>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(
  PostMasonrySidebar
);
