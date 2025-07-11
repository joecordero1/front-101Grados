import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import ALink from '~/components/features/custom-link';
import SidebarFilterThree from '~/components/partials/shop/sidebar/sidebar-filter-three';
import { FilterOptionsToString } from '../../../reducers/useItems';
import { useSpecialCatalogues } from 'hooks';

type Props = {
  type?: string;
};

const ToolBox: FC<Props> = (props) => {
  const { type = 'left' } = props;
  const router = useRouter();
  const query = router.query;
  const { myCatalogues } = useSpecialCatalogues();
  const gridType = query.type ? query.type : 'grid';
  const sortBy = query.sortby ? query.sortby : 'default';
  const perPage = query.per_page ? query.per_page : 15;
  let tmp = 0;

  useEffect(() => {
    window.addEventListener('scroll', stickyToolboxHandler);
    return () => {
      window.removeEventListener('scroll', stickyToolboxHandler);
    };
  }, []);

  const onChangeAttri = (e, attri) => {
    e.preventDefault();
    // @ts-ignore
    // let url = router.pathname.replace('[grid]', query.grid);
    if (e.target.value !== 'Todos') {
      let url = router.pathname;
      let arr = [`${attri}=${e.target.value}`, 'page=1'];
      for (let key in query) {
        if (key !== attri && key !== 'page' && key !== 'grid')
          arr.push(key + '=' + query[key]);
      }
      url = url + '?' + arr.join('&');

      router.push(url);
    } else {
      router.push('/shop');
    }
  };

  const showSidebar = () => {
    if (type === 'navigation' && window.innerWidth > 991) {
      // @ts-ignore
      document.querySelector('.navigation-toggle-btn').click();
    } else {
      document
        .querySelector('body')
        .classList.add(
          `${
            type === 'left' ||
            type === 'off-canvas' ||
            type === 'navigation' ||
            type === 'horizontal'
              ? 'sidebar-active'
              : 'right-sidebar-active'
          }`
        );
    }
  };

  const stickyToolboxHandler = (e) => {
    let stickyToolbox = document.querySelector('.sticky-toolbox');
    let top = document.querySelector('.sticky-toolbox-wrapper')
      ? // @ts-ignore
        document.querySelector('.sticky-toolbox-wrapper').offsetTop +
        // @ts-ignore
        document.querySelector('.sticky-toolbox-wrapper').offsetHeight +
        200
      : 600;
    let height = 0;

    if (stickyToolbox) {
      // @ts-ignore
      height = stickyToolbox.offsetHeight;
    }

    if (
      window.pageYOffset >= top &&
      window.innerWidth < 768 &&
      e.currentTarget.scrollY < tmp
    ) {
      if (stickyToolbox) {
        stickyToolbox.classList.add('fixed');
        if (!document.querySelector('.sticky-toolbox-wrapper')) {
          let newNode = document.createElement('div');
          newNode.className = 'sticky-toolbox-wrapper';
          stickyToolbox.parentNode.insertBefore(newNode, stickyToolbox);
          document
            .querySelector('.sticky-toolbox-wrapper')
            .insertAdjacentElement('beforeend', stickyToolbox);
          document
            .querySelector('.sticky-toolbox-wrapper')
            .setAttribute('style', 'height: ' + height + 'px');
        }

        if (
          !document
            .querySelector('.sticky-toolbox-wrapper')
            .getAttribute('style')
        ) {
          document
            .querySelector('.sticky-toolbox-wrapper')
            .setAttribute('style', 'height: ' + height + 'px');
        }
      }
    } else {
      if (stickyToolbox) {
        stickyToolbox.classList.remove('fixed');
      }

      if (document.querySelector('.sticky-toolbox-wrapper')) {
        document
          .querySelector('.sticky-toolbox-wrapper')
          .removeAttribute('style');
      }
    }

    if (
      window.outerWidth > 767 &&
      document.querySelector('.sticky-toolbox-wrapper')
    ) {
      // @ts-ignore
      document.querySelector('.sticky-toolbox-wrapper').style.height = 'auto';
    }

    tmp = e.currentTarget.scrollY;
  };

  // const localHandleFiltersChange = () => {
  //   if (Object.keys(query).length > 0) {
  //     // if (query.brand) handleFiltersChange('brandId', query.brand);
  //     if (query.category) {
  //       handleFiltersChange('categoriesIds', [query.category]);
  //     }
  //     // if (query.justOnSale) handleFiltersChange('justOnSale', query.justOnSale);
  //   } else {
  //     cleanFilters();
  //   }
  // };

  // useEffect(() => {
  //   localHandleFiltersChange();
  // }, [query]);

  return (
    <nav
      className={`toolbox sticky-toolbox sticky-content fix-top pt-2 ${
        type === 'horizontal' ? 'toolbox-horizontal' : ''
      }`}
    >
      {/* {type === 'horizontal' ? <SidebarFilterThree /> : ''} */}
      <SidebarFilterThree />

      <div className="toolbox-left">
        {type === 'left' ||
        type === 'off-canvas' ||
        type === 'navigation' ||
        type === 'horizontal' ? (
          <ALink
            href="#"
            className={`toolbox-item left-sidebar-toggle btn btn-outline btn-primary btn-rounded ${
              type === 'navigation'
                ? 'btn-icon-left btn-sm'
                : 'btn-sm btn-icon-right'
            } ${
              type === 'off-canvas' || type === 'navigation' ? '' : 'd-lg-none'
            }`}
            onClick={showSidebar}
          >
            {type === 'navigation' ? <i className="d-icon-filter-2"></i> : ''}
            Filtros
            {type === 'navigation' ? (
              ''
            ) : (
              <i className="d-icon-arrow-right"></i>
            )}
          </ALink>
        ) : (
          ''
        )}

        <div
          className={`toolbox-item toolbox-sort ${
            type === 'boxed' || type === 'banner'
              ? 'select-box text-dark'
              : 'select-menu'
          }`}
        >
          {type === 'boxed' || type === 'banner' ? (
            <label>Ordernar por:</label>
          ) : (
            ''
          )}
          <select
            name="orderby"
            className="form-control"
            value={query.orderPoints ? query.orderPoints : ''}
            onChange={(e) => onChangeAttri(e, 'orderPoints')}
          >
            <option value="">Por defecto</option>
            <option value="ASC">Más baratos primero</option>
            <option value="DESC">Más caros primero</option>
          </select>
        </div>
      </div>
      {myCatalogues.length > 0 && (
        <div className="toolbox-right">
          <div className="toolbox-item toolbox-show select-box text-dark">
            <label>Catalogos:</label>
            <select
              name="catalogueId"
              className="form-control"
              defaultValue={null}
              onChange={(e) => onChangeAttri(e, 'catalogueId')}
            >
              <option value={null}>Todos</option>
              {myCatalogues.map((catalogue) => (
                <>
                  <option value={catalogue.id}>{catalogue.name}</option>
                </>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* <div
          className={`toolbox-item toolbox-layout ${
            type === 'right' ? 'mr-lg-0' : ''
          }`}
        >
          <ALink
            href={{
              pathname: router.pathname,
              query: { ...query, type: 'list' },
            }}
            scroll={false}
            className={`d-icon-mode-list btn-layout ${
              gridType === 'list' ? 'active' : ''
            }`}
          ></ALink>
          <ALink
            href={{
              pathname: router.pathname,
              query: { ...query, type: 'grid' },
            }}
            scroll={false}
            className={`d-icon-mode-grid btn-layout ${
              gridType !== 'list' ? 'active' : ''
            }`}
          ></ALink>
        </div> */}

      {/* {type === 'right' ? (
          <ALink
            href="#"
            className="toolbox-item right-sidebar-toggle btn btn-sm btn-outline btn-primary btn-rounded btn-icon-right d-lg-none"
            onClick={showSidebar}
          >
            Filter<i className="d-icon-arrow-left"></i>
          </ALink>
        ) : (
          ''
        )} */}
    </nav>
  );
};

export default ToolBox;
