import { useEffect, useState, useLayoutEffect, use } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import InfiniteScroll from 'react-infinite-scroll-component';

import withApollo from '~/server/apollo';
import { GET_PRODUCTS } from '~/server/queries';
import ToolBox from '~/components/partials/shop/toolbox';
import ProductTwo from '~/components/features/product/product-two';
import ProductEight from '~/components/features/product/product-eight';

import { useItems } from 'hooks';

export function InfiniteScrollComponent(props) {
  const { items, meta, handleMetaChange, loading } = useItems({
    filterOptions: {
      random: true,
    },
    metaProps: {
      page: 1,
      take: 50,
    },
  });
  const router = useRouter();
  const query = router.query;
  const [localProducts, setProducts] = useState(items || []);
  const gridType = query.type ? query.type : 'grid';

  const loadMore = () => {
    handleMetaChange({
      page: meta.page + 1,
      take: 50,
    });
  };

  useEffect(() => {
    let newProducts = items ? items : [];
    setProducts([...localProducts, ...newProducts]);
  }, [items]);

  const productLoadHandler = () => {
    loadMore();
  };

  return (
    <>
      <InfiniteScroll
        dataLength={localProducts ? localProducts.length : 0}
        next={productLoadHandler}
        style={{ overflow: 'visible' }}
        hasMore={localProducts.length >= meta.itemCount ? false : true}
        loader={<div className="d-loading"></div>}
      >
        {loading ? (
          gridType === 'grid' ? (
            <div className={`row product-wrapper cols-2 cols-sm-3`}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <div
                  className="product-loading-overlay"
                  key={'popup-skel-' + item}
                ></div>
              ))}
            </div>
          ) : (
            <div className="row product-wrapper skeleton-body cols-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <div
                  className="skel-pro skel-pro-list mb-4"
                  key={'list-skel-' + item}
                ></div>
              ))}
            </div>
          )
        ) : (
          ''
        )}

        {gridType === 'grid' ? (
          <div className={`row product-wrapper cols-2 cols-sm-4 cols-lg-8`}>
            {localProducts.length > 0 &&
              localProducts.map((item) => (
                <div
                  className="product-wrap"
                  key={'shop-' + item.id + Math.random()}
                  //   key={'shop-' + item.id}
                >
                  <ProductTwo item={item} adClass="" />
                  {/* <h2>Producto</h2> */}
                </div>
              ))}
          </div>
        ) : (
          <div className="product-lists product-wrapper">
            {items.length > 0 &&
              items.map((item) => (
                <>
                  {/* <ProductEight product={item} key={'shop-list-' + item.id} /> */}
                </>
              ))}
          </div>
        )}

        {localProducts && localProducts.length === 0 ? (
          <p className="ml-1">
            No products were found matching your selection.
          </p>
        ) : (
          ''
        )}
      </InfiniteScroll>
    </>
  );
}

export default withApollo({ ssr: typeof window === 'undefined' })(
  InfiniteScrollComponent
);
