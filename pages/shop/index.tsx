import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ALink from '~/components/features/custom-link';
import ShopBanner from '~/components/partials/shop/shop-banner';
import ToolBox from '~/components/partials/shop/toolbox';
import ProductListOne from '~/components/partials/shop/product-list/product-list-one';
import filterData from '~/utils/data/shop';

import { useCategories } from 'hooks/useCategories';
import { useItems } from '../../reducers/useItems';
import useLogs from '~/hooks/useLogs';
import { useAuth } from '~/hooks';
import { LogType } from '~/utils/types/logType';

function ShopHorizontalFilter() {
  const { categories } = useCategories({
    take: 7,
    random: true,
  });
  const {
    items,
    loading,
    handleFiltersChange,
    cleanFilters,
    meta,
    handlePageChange,
  } = useItems();
  const { dispatchLog } = useLogs();
  const { participant } = useAuth();
  const router = useRouter();
  const query = router.query;

  const prices = [
    { min: '0', max: '50' },
    { min: '50', max: '100' },
    { min: '100', max: '200' },
    { min: '200', max: '' },
  ];

  const containsAttrInUrl = (type, value) => {
    // @ts-ignore
    const currentQueries = query[type] ? query[type].split(',') : [];
    return (
      currentQueries &&
      (currentQueries.includes(value) ||
        (type === 'max_price' && value === '') ||
        (type === 'min_price' && value === ''))
    );
  };

  const getUrlForAttrs = (type, value) => {
    // @ts-ignore
    let currentQueries = query[type] ? query[type].split(',') : [];
    currentQueries = containsAttrInUrl(type, value)
      ? currentQueries.filter((item) => item !== value)
      : type === 'min_price' || type === 'max_price'
      ? [value]
      : [...currentQueries, value];
    return currentQueries.join(',');
  };

  const selectFilterHandler = () => {
    if (document.querySelectorAll('.select-items .select-item').length === 1) {
      document.querySelector('.select-items').removeAttribute('style');
    }
  };

  const cleanAllHandler = () => {
    document.querySelector('.select-items').removeAttribute('style');
  };

  useEffect(() => {
    console.log(query);
    if (query.category) {
      dispatchLog(LogType.OPEN_CATEGORY, {
        categoryId: parseInt(query.category.toString()),
      });
    } else if (query.subcategory) {
      dispatchLog(LogType.OPEN_SUBCATEGORY, {
        subcategoryId: parseInt(query.subcategory.toString()),
      });
    }
  }, [query]);

  return (
    <main className="main">
      <Helmet>
        <title>Tienda</title>
      </Helmet>

      <h1 className="d-none">Tienda Global</h1>

      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <ALink href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>Tienda</li>
          </ul>
        </div>
      </nav>

      <div className="page-content mb-10 pb-2">
        <div className="container">
          <ShopBanner />

          <div className="row cols-xl-8 cols-lg-6 cols-md-4 cols-sm-3 cols-2">
            <div className="category-wrap mb-4">
              <div
                className={`category category-icon ${
                  query.category === '' || !query.category ? 'active' : ''
                }`}
              >
                <ALink
                  href={{
                    pathname: '/shop',
                    query: {
                      ...query,
                      // Remove category from query
                      category: null,
                    },
                  }}
                  scroll={false}
                  onClick={() => handleFiltersChange('categoriesIds', null)}
                >
                  <figure className="categroy-media">
                    <i className={'fas fa-award'}></i>
                  </figure>
                  <div className="category-content">
                    <h4 className="category-name">Todas</h4>
                  </div>
                </ALink>
              </div>
            </div>
            {categories.map((category) => (
              <div className="category-wrap mb-4" key={category.id}>
                <div
                  className={`category category-icon ${
                    query.category === category.id.toString() ? 'active' : ''
                  }`}
                >
                  <ALink
                    href={{
                      pathname: '/shop',
                      query: { category: category.id },
                    }}
                    scroll={false}
                  >
                    <figure className="categroy-media">
                      <i
                        className={
                          category.icon ? category.icon : 'fas fa-award'
                        }
                      ></i>
                    </figure>
                    <div className="category-content">
                      <h4 className="category-name">{category.name}</h4>
                    </div>
                  </ALink>
                </div>
              </div>
            ))}
          </div>

          <ToolBox
            type="horizontal"
            handleFiltersChange={handleFiltersChange}
            cleanFilters={cleanFilters}
          />

          <div className="select-items">
            {filterData.sizes.map((item, index) =>
              containsAttrInUrl('sizes', item.slug) ? (
                <ALink
                  className="select-item"
                  href={{
                    pathname: router.pathname,
                    query: {
                      ...query,
                      page: 1,
                      sizes: getUrlForAttrs('sizes', item.slug),
                      type: router.query.type ? router.query.type : null,
                    },
                  }}
                  key={item + ' - ' + index}
                  onClick={selectFilterHandler}
                  scroll={false}
                >
                  {item.name}
                  <i className="d-icon-times"></i>
                </ALink>
              ) : (
                ''
              )
            )}
            {filterData.colors.map((item, index) =>
              containsAttrInUrl('colors', item.slug) ? (
                <ALink
                  className="select-item"
                  href={{
                    pathname: router.pathname,
                    query: {
                      ...query,
                      page: 1,
                      sizes: getUrlForAttrs('colors', item.slug),
                    },
                  }}
                  key={item + ' - ' + index}
                  onClick={selectFilterHandler}
                  scroll={false}
                >
                  {item.name}
                  <i className="d-icon-times"></i>
                </ALink>
              ) : (
                ''
              )
            )}
            {prices.map((price, index) =>
              containsAttrInUrl('min_price', price.min) &&
              containsAttrInUrl('max_price', price.max) ? (
                <ALink
                  className="select-item"
                  href={{
                    pathname: router.pathname,
                    query: {
                      ...query,
                      page: 1,
                      min_price: getUrlForAttrs('min_price', price.min),
                      max_price: getUrlForAttrs('max_price', price.max),
                      type: router.query.type ? router.query.type : null,
                    },
                  }}
                  key={price + ' - ' + index}
                  onClick={selectFilterHandler}
                  scroll={false}
                >
                  {price.max === ''
                    ? `$${price.min}.00 +`
                    : `$${price.min}.00 - $${price.max}.00`}
                  <i className="d-icon-times"></i>
                </ALink>
              ) : (
                ''
              )
            )}
            <ALink
              href={{
                pathname: router.pathname,
                query: { type: router.query.type ? router.query.type : null },
              }}
              className="filter-clean text-primary"
              onClick={cleanAllHandler}
              scroll={false}
            >
              Clean All
            </ALink>
          </div>

          <div className="row main-content-wrap gutter-lg">
            <div className="main-content">
              <ProductListOne
                items={items}
                meta={meta}
                handlePageChange={handlePageChange}
                loading={loading}
                isToolbox={false}
                itemsPerRow={5}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default React.memo(ShopHorizontalFilter);
