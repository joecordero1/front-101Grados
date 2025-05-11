import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';
import Card from '~/components/features/accordion/card';

import { mainMenu } from '~/utils/data/menu';

function MobileMenu(props) {
  const [search, setSearch] = useState('');
  const [timer, setTimer] = useState(null);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener('resize', hideMobileMenuHandler);
    document.querySelector('body').addEventListener('click', onBodyClick);

    return () => {
      window.removeEventListener('resize', hideMobileMenuHandler);
      document.querySelector('body').removeEventListener('click', onBodyClick);
    };
  }, []);

  useEffect(() => {
    setSearch('');
  }, [router.query.slug]);

  const hideMobileMenuHandler = () => {
    if (window.innerWidth > 991) {
      document.querySelector('body').classList.remove('mmenu-active');
    }
  };

  const hideMobileMenu = () => {
    document.querySelector('body').classList.remove('mmenu-active');
  };

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onBodyClick(e) {
    if (e.target.closest('.header-search'))
      return (
        e.target.closest('.header-search').classList.contains('show-results') ||
        e.target.closest('.header-search').classList.add('show-results')
      );

    document.querySelector('.header-search.show') &&
      document.querySelector('.header-search.show').classList.remove('show');
    document.querySelector('.header-search.show-results') &&
      document
        .querySelector('.header-search.show-results')
        .classList.remove('show-results');
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: '/shop',
      query: {
        search: search,
      },
    });
  }

  return (
    <div className="mobile-menu-wrapper">
      <div className="mobile-menu-overlay" onClick={hideMobileMenu}></div>

      <ALink className="mobile-menu-close" href="#" onClick={hideMobileMenu}>
        <i className="d-icon-times"></i>
      </ALink>

      <div className="mobile-menu-container scrollable">
        <form
          action="#"
          className="input-wrapper"
          onSubmit={onSubmitSearchForm}
        >
          <input
            type="text"
            className="form-control"
            name="search"
            autoComplete="off"
            value={search}
            onChange={onSearchChange}
            placeholder="Search your keyword..."
            required
          />
          <button className="btn btn-search" type="submit">
            <i className="d-icon-search"></i>
          </button>
        </form>

        <ul className="mobile-menu mmenu-anim">
          <li>
            <ALink
              href={{
                pathname: '/shop',
                query: { category: 'office-computers' },
              }}
              scroll={false}
            >
              <i className="d-icon-desktop"></i> Office Computers
            </ALink>
          </li>
          <li>
            <ALink
              href={{ pathname: '/shop', query: { category: 'women-s-bag' } }}
              scroll={false}
            >
              <i className="d-icon-handbag"></i> Women's Bag
            </ALink>
          </li>
          <li>
            <ALink
              href={{ pathname: '/shop', query: { category: 'electronics' } }}
              scroll={false}
            >
              <i className="d-icon-camera2"></i> Electronics
            </ALink>
          </li>
          <li>
            <ALink
              href={{ pathname: '/shop', query: { category: 'game-consoles' } }}
              scroll={false}
            >
              <i className="d-icon-gamepad2"></i> Game Consoles
            </ALink>
          </li>
          <li>
            <ALink
              href={{
                pathname: '/shop',
                query: { category: 'office-solution' },
              }}
              scroll={false}
            >
              <i className="d-icon-officebag"></i> Office Solution
            </ALink>
          </li>
          <li>
            <ALink
              href={{ pathname: '/shop', query: { category: 'smartphone' } }}
              scroll={false}
            >
              <i className="d-icon-mobile"></i> SmartPhone
            </ALink>
          </li>
          <li>
            <ALink
              href={{ pathname: '/shop', query: { category: 'industrial' } }}
              scroll={false}
            >
              <i className="d-icon-bridge-lamp"></i> Industrial
            </ALink>
          </li>
          <li>
            <ALink
              href={{ pathname: '/shop', query: { category: 'headphone' } }}
              scroll={false}
            >
              <i className="d-icon-headphone"></i> Headphones
            </ALink>
          </li>
          <li>
            <ALink
              href={{ pathname: '/shop', query: { category: 'accessories' } }}
              scroll={false}
            >
              <i className="d-icon-memory"></i> Accessories
            </ALink>
          </li>
          <li>
            <ALink
              href={{ pathname: '/shop', query: { category: 'rice-cooker' } }}
              scroll={false}
            >
              <i className="d-icon-cook"></i> Rice Cooker
            </ALink>
          </li>
          <li>
            <ALink href="/shop">
              <i className="d-icon-category"></i> Todas las Categorías
            </ALink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default React.memo(MobileMenu);
