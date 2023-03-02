import { useEffect } from 'react';
import { useRouter } from 'next/router';

import ALink from '~/components/features/custom-link';

import CartMenu from '~/components/common/partials/cart-menu';
import MainMenu from '~/components/common/partials/main-menu';
import SearchBox from '~/components/common/partials/search-box';
import LoginModal from '~/components/features/modals/login-modal';

import { headerBorderRemoveList } from '~/utils/data/menu';

export default function Header(props) {
  const router = useRouter();

  useEffect(() => {
    let header = document.querySelector('header');
    if (header) {
      if (
        headerBorderRemoveList.includes(router.pathname) &&
        header.classList.contains('header-border')
      )
        header.classList.remove('header-border');
      else if (!headerBorderRemoveList.includes(router.pathname))
        document.querySelector('header').classList.add('header-border');
    }
  }, [router.pathname]);

  const showMobileMenu = () => {
    document.querySelector('body').classList.add('mmenu-active');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <p className="welcome-msg ls-normal">
              Welcome to Riode store message or remove it!
            </p>
          </div>
          <div className="header-right">
            <div className="dropdown">
              <ALink href="#">USD</ALink>
              <ul className="dropdown-box">
                <li>
                  <ALink href="#">USD</ALink>
                </li>
                <li>
                  <ALink href="#">EUR</ALink>
                </li>
              </ul>
            </div>

            <div className="dropdown ml-5">
              <ALink href="#">ENG</ALink>
              <ul className="dropdown-box">
                <li>
                  <ALink href="#">ENG</ALink>
                </li>
                <li>
                  <ALink href="#">FRH</ALink>
                </li>
              </ul>
            </div>

            <span className="divider"></span>
            <ALink href="/vendor" className="contact d-lg-show">
              <i className="d-icon-map"></i>Vendors
            </ALink>
            <ALink href="/pages/account" className="help d-lg-show">
              <i className="d-icon-info"></i> My Account
            </ALink>
            <LoginModal />
          </div>
        </div>
      </div>

      <div className="header-middle sticky-header fix-top sticky-content">
        <div className="container">
          <div className="header-left mr-4">
            <ALink
              href="#"
              className="mobile-menu-toggle"
              onClick={showMobileMenu}
            >
              <i className="d-icon-bars2"></i>
            </ALink>

            <ALink href="/" className="logo">
              <img
                src="./images/home/logo.png"
                alt="logo"
                width="153"
                height="44"
              />
            </ALink>

            <SearchBox />
          </div>

          <div className="header-right">
            <div className="icon-box icon-box-side">
              <div className="icon-box-icon mr-0 mr-lg-2">
                <i className="fab fa-whatsapp"></i>
              </div>
              <div className="icon-box-content d-lg-show">
                <h4 className="icon-box-title text-dark text-normal">
                  <ALink
                    href="mailto:riode@mail.com"
                    className="text-primary d-inline-block"
                  >
                    Soporte:
                  </ALink>{' '}
                </h4>
                <p>
                  <ALink href="tel:#">099 935 1235</ALink>
                </p>
              </div>
            </div>
            <span className="divider mr-4"></span>
            {/* <ALink href="/pages/wishlist" className="wishlist">
              <i className="d-icon-heart"></i>
            </ALink> */}
            {/* <span className="divider"></span> */}

            <CartMenu />
          </div>
        </div>
      </div>

      <div>
        <h2
          style={{
            textAlign: 'center',
            margin: '0 auto',
          }}
        >
          Tienes 0 Puntos
        </h2>
      </div>

      <div className={`header-bottom ${router.pathname === '/' ? '' : 'pb-0'}`}>
        <div className="container">
          <MainMenu />
        </div>
      </div>
    </header>
  );
}
