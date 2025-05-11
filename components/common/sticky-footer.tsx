import React, { useEffect } from 'react';

import ALink from '~/components/features/custom-link';

import FooterSearchBox from '~/components/common/partials/footer-search-box';
import FooterAccountBox from '~/components/common/partials/footer-account-box';
import { useAuth, useProgram } from '~/hooks';

export default function StickyFooter() {
  let tmp = 0;
  const { program } = useProgram();
  const { participant } = useAuth();
  useEffect(() => {
    window.addEventListener('scroll', stickyFooterHandler);

    return () => {
      window.removeEventListener('scroll', stickyFooterHandler);
    };
  }, []);

  const stickyFooterHandler = (e) => {
    let stickyFooter = document.querySelector('.sticky-footer.sticky-content');
    if (stickyFooter) {
      stickyFooter.classList.add('fixed');
    }
  };

  return (
    <div>
      <div className='sticky-footer sticky-content fix-bottom fixed flex justify-around items-center'>
        <ALink href='/' className='sticky-link active'>
          <i className='d-icon-home'></i>
          <span>Inicio</span>
        </ALink>

        <ALink href='/shop' className='sticky-link'>
          <i className='d-icon-shoppingbag'></i>
          <span>Premios</span>
        </ALink>
        {program.id !== 26 && program.supportPhone.length > 1 && (
          <a
            href={`https://api.whatsapp.com/send?phone=593${program.supportPhone}&text=Hola!%20Soy%20un%20participante%20del%20programa%20${program.name},%20mi%20usuario%20es%20${participant.fullName},%20y%20tengo%20una%20duda%20sobre...`}
            target='_blank'
            className='sticky-link flex flex-col items-center'
          >
            <i className='fab fa-whatsapp'></i>
            <span>Contacto</span>
          </a>
        )}

        <FooterAccountBox />
      </div>
    </div>
  );
}
