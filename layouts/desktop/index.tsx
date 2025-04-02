import { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-image-lightbox/style.css';
import 'react-input-range/lib/css/index.css';
import HeaderDesktop from '~/layouts/desktop/header/header';
import Footer from '~/components/common/footer';
import Quickview from '~/components/features/product/common/quickview-modal';
import VideoModal from '~/components/features/modals/video-modal';
import { modalActions } from '~/store/modal';
import {
  showScrollTopHandler,
  stickyHeaderHandler,
  stickyFooterHandler,
} from '~/utils';

import { useProgram, useAuth } from 'hooks';
import { Modal } from '@mui/material';
import MyBirthDateForm from '~/components/partials/modals/dateOfBirthModal';
import Trivias from '~/components/partials/trivias';

function LayoutDesktop({ children, closeQuickview }) {
  const { program } = useProgram();
  const { isLoggedIn, participant } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(true);

  useLayoutEffect(() => {
    document.querySelector('body').classList.remove('loaded');
  }, [router.pathname]);

  useEffect(() => {
    window.addEventListener('scroll', showScrollTopHandler, true);
    window.addEventListener('scroll', stickyHeaderHandler, true);
    window.addEventListener('scroll', stickyFooterHandler, true);
    window.addEventListener('resize', stickyHeaderHandler, true);
    window.addEventListener('resize', stickyFooterHandler, true);

    return () => {
      window.removeEventListener('scroll', showScrollTopHandler, true);
      window.removeEventListener('scroll', stickyHeaderHandler, true);
      window.removeEventListener('scroll', stickyFooterHandler, true);
      window.removeEventListener('resize', stickyHeaderHandler, true);
      window.removeEventListener('resize', stickyFooterHandler, true);
    };
  }, []);

  useEffect(() => {
    closeQuickview();

    // @ts-ignore
    let bodyClasses = [...document.querySelector('body').classList];
    for (let i = 0; i < bodyClasses.length; i++) {
      document.querySelector('body').classList.remove(bodyClasses[i]);
    }

    setTimeout(() => {
      document.querySelector('body').classList.add('loaded');
    }, 50);
  }, [router.pathname]);

  useEffect(() => {
    if (
      isLoggedIn &&
      !participant.approvedPolicy &&
      !participant.approvedTermsAndConditions
    ) {
      router.push('/pages/privacy-policy');
    }
  }, [isLoggedIn, participant]);

  useEffect(() => {
    if (program?.id === 26) {
      if (
        isLoggedIn &&
        participant?.passwordUpdatedAt &&
        participant.approvedPolicy &&
        participant.approvedTermsAndConditions
      ) {
        // Definir la fecha actual
        const currentDate = new Date();

        // Crear una nueva instancia de la fecha de actualización de la contraseña
        const passwordUpdatedDate = new Date(participant.passwordUpdatedAt);

        // Restar los días a la fecha actual para obtener la fecha de comparación
        const comparisonDate = new Date();
        comparisonDate.setDate(currentDate.getDate() - 365);

        // Comparar las fechas
        if (passwordUpdatedDate <= comparisonDate) {
          router.push('/pages/change-my-password');
        }
      }
    }
  }, [
    isLoggedIn,
    participant?.passwordUpdatedAt,
    participant?.approvedPolicy,
    participant?.approvedTermsAndConditions,
    program?.id,
  ]);

  useEffect(() => {
    if (isLoggedIn && !program?.isStoreActive) {
      router.push('/');
    }
  }, [isLoggedIn, program?.isStoreActive]);

  if (!program) {
    return (
      <>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></div>
      </>
    );
  }
  return (
    <div>
      <div className='page-wrapper' style={{ position: 'relative' }}>
        {isLoggedIn && <HeaderDesktop />}

        {children}

        {isLoggedIn && <Footer />}
      </div>

      <ToastContainer
        autoClose={3000}
        // @ts-ignore
        duration={300}
        newestOnTo={true}
        className='toast-container'
        position='bottom-left'
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={true}
      />

      <Quickview />
      {program && program.id === 26 && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1300,
            }}
          >
            <div
              style={{
                position: 'relative',
                backgroundColor: 'transparent',
                borderRadius: '10px',
                width: '35%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <button
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: 'none',
                  padding: '5px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
                onClick={() => setOpen(false)}
              >
                Acceder
              </button>
              <img
                src='https://storage.googleapis.com/lala4/store/images/6904c42d-ed80-4638-97c3-2ee6435ec8c6-de8ff331-6554-4aac-b01f-1a7d04ec00ab.png'
                alt='image-modal'
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </Modal>
      )}

      {isLoggedIn && <Trivias />}
      {isLoggedIn &&
        program &&
        program.id === 28 &&
        participant.dateOfBirth === null && (
          <MyBirthDateForm open={open} onClose={() => setOpen(false)} />
        )}
      <VideoModal />
    </div>
  );
}

export default connect(null, { closeQuickview: modalActions.closeQuickview })(
  LayoutDesktop
);
