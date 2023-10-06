import { useEffect } from 'react';

import ALink from '~/components/features/custom-link';

import FooterSearchBox from '~/components/common/partials/footer-search-box';
import FooterAccountBox from '~/components/common/partials/footer-account-box';
import { useAuth, useLogs } from '~/hooks';

export default function StickyFooter() {
  let tmp = 0;
  const { logOut } = useAuth();
  const { dispatchLog } = useLogs();

  useEffect(() => {
    window.addEventListener('scroll', stickyFooterHandler);

    return () => {
      window.removeEventListener('scroll', stickyFooterHandler);
    };
  }, []);

  // this function is used to handle sticky footer i changed it to always show the footer
  const stickyFooterHandler = (e) => {
    let top = document.querySelector('.page-content')
      ? // @ts-ignore
        document.querySelector('.page-content').offsetTop +
        document.querySelector('header').offsetHeight +
        100
      : 600;
    let stickyFooter = document.querySelector('.sticky-footer.sticky-content');
    let height = 0;

    if (stickyFooter) {
      // @ts-ignore
      height = stickyFooter.offsetHeight;
    }

    if (stickyFooter) {
      stickyFooter.classList.add('fixed');
      stickyFooter.setAttribute('style', 'margin-bottom: 0');
      if (!document.querySelector('.sticky-content-wrapper')) {
        let newNode = document.createElement('div');
        newNode.className = 'sticky-content-wrapper';
        stickyFooter.parentNode.insertBefore(newNode, stickyFooter);
        document
          .querySelector('.sticky-content-wrapper')
          .insertAdjacentElement('beforeend', stickyFooter);
        document
          .querySelector('.sticky-content-wrapper')
          .setAttribute('style', 'height: ' + height + 'px');
      }

      if (
        !document.querySelector('.sticky-content-wrapper').getAttribute('style')
      ) {
        document
          .querySelector('.sticky-content-wrapper')
          .setAttribute('style', 'height: ' + height + 'px');
      }
    }

    if (
      window.outerWidth > 767 &&
      document.querySelector('.sticky-content-wrapper')
    ) {
      // @ts-ignore
      document.querySelector('.sticky-content-wrapper').style.height = 'auto';
    }

    tmp = e.currentTarget.scrollY;
  };

  return (
    <div className="sticky-footer sticky-content fix-bottom fixed">
      <ALink href="/" className="sticky-link active">
        <i className="d-icon-home"></i>
        <span>Inicio</span>
      </ALink>

      <ALink href="/shop" className="sticky-link">
        <i className="d-icon-shoppingbag"></i>
        <span>Premios</span>
      </ALink>

      <FooterSearchBox />

      <FooterAccountBox />
    </div>
  );
}
