import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';

import withApollo from '~/server/apollo';
import { GET_POSTS } from '~/server/queries';

import ALink from '~/components/features/custom-link';
import Pagination from '~/components/features/pagination';
import PostNine from '~/components/features/post/post-nine';

import { scrollTopHandler } from '~/utils';

function PostGrid({ router }) {
  const column = router.query.column;
  if (!column) return '';
  const [isFirst, setFirst] = useState(true);

  const query = router.query;

  const currentCategory = router.query.category ? router.query.category : null;
  const showingCount = 8;
  const [getPosts, { data, loading, error }] = useLazyQuery(GET_POSTS);
  const [perPage, setPerPage] = useState(showingCount);
  const posts = data && data.posts.data;
  const totalPage = data
    ? parseInt(data.posts.total / perPage) +
      (data.posts.total % perPage ? 1 : 0)
    : 1;
  let page = query.page ? query.page : 1;

  let categories = [
    '',
    'fashion',
    'lifestyle',
    'shopping',
    'sport',
    'summer-sale',
    'travel',
    'winter-sale',
  ];

  useEffect(() => {
    getPosts({
      variables: {
        category: query.category,
        from: perPage * (page - 1),
        to: perPage * page,
      },
    });

    if (isFirst) {
      setFirst(false);
    } else {
      scrollTopHandler();
    }
  }, [query]);

  return (
    <main className="main skeleton-body">
      <Helmet>
        <title>Tienda | Blog Grid {column}</title>
      </Helmet>

      <h1 className="d-none">Tienda - Blog Grid {column}</h1>

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
            <li>Grid {column[0]} Columns</li>
          </ul>
        </div>
      </nav>

      <div className="page-content pb-10 mb-10">
        <div className="container">
          <ul className="nav-filters filter-underline blog-filters justify-content-center">
            <li>
              <ALink
                href={{
                  pathname: `/blog/grid/${column}`,
                  query: { category: '' },
                }}
                className={`nav-filter ${
                  currentCategory === '' || currentCategory === null
                    ? 'active'
                    : ''
                }`}
                scroll={false}
              >
                All
              </ALink>
              <span>18</span>
            </li>
            <li>
              <ALink
                href={{
                  pathname: `/blog/grid/${column}`,
                  query: { category: 'fashion' },
                }}
                className={`nav-filter ${
                  currentCategory === 'fashion' ? 'active' : ''
                }`}
                scroll={false}
              >
                Fashion
              </ALink>
              <span>11</span>
            </li>
            <li>
              <ALink
                href={{
                  pathname: `/blog/grid/${column}`,
                  query: { category: 'lifestyle' },
                }}
                className={`nav-filter ${
                  currentCategory === 'lifestyle' ? 'active' : ''
                }`}
                scroll={false}
              >
                Lifestyle
              </ALink>
              <span>11</span>
            </li>
            <li>
              <ALink
                href={{
                  pathname: `/blog/grid/${column}`,
                  query: { category: 'shopping' },
                }}
                className={`nav-filter ${
                  currentCategory === 'shopping' ? 'active' : ''
                }`}
                scroll={false}
              >
                Shopping
              </ALink>
              <span>2</span>
            </li>
            <li>
              <ALink
                href={{
                  pathname: `/blog/grid/${column}`,
                  query: { category: 'sport' },
                }}
                className={`nav-filter ${
                  currentCategory === 'sport' ? 'active' : ''
                }`}
                scroll={false}
              >
                Sport
              </ALink>
              <span>5</span>
            </li>
            <li>
              <ALink
                href={{
                  pathname: `/blog/grid/${column}`,
                  query: { category: 'summer-sale' },
                }}
                className={`nav-filter ${
                  currentCategory === 'summer-sale' ? 'active' : ''
                }`}
                scroll={false}
              >
                Summer Sale
              </ALink>
              <span>1</span>
            </li>
            <li>
              <ALink
                href={{
                  pathname: `/blog/grid/${column}`,
                  query: { category: 'travel' },
                }}
                className={`nav-filter ${
                  currentCategory === 'travel' ? 'active' : ''
                }`}
                scroll={false}
              >
                Travel
              </ALink>
              <span>4</span>
            </li>
            <li>
              <ALink
                href={{
                  pathname: `/blog/grid/${column}`,
                  query: { category: 'winter-sale' },
                }}
                className={`nav-filter ${
                  currentCategory === 'winter-sale' ? 'active' : ''
                }`}
                scroll={false}
              >
                Winter Sale
              </ALink>
              <span>1</span>
            </li>
          </ul>

          <div className={`posts grid row grid grid-${column}`}>
            {loading ? (
              new Array(parseInt(perPage)).fill(1).map((item, index) => (
                <div key={'Skeleton:' + index}>
                  <div className="skel-post"></div>
                </div>
              ))
            ) : posts ? (
              posts.length ? (
                posts.slice(0, posts.length).map((post, index) => (
                  <React.Fragment key={'post-nine' + index}>
                    <div className="grid-item">
                      <PostNine post={post} />
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
      </div>
    </main>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(
  withRouter(PostGrid)
);
