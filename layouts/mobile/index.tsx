import { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-image-lightbox/style.css';
import 'react-input-range/lib/css/index.css';
import Footer from '~/components/common/footer';
import StickyFooter from '~/components/common/sticky-footer';
import Quickview from '~/components/features/product/common/quickview-modal';
import VideoModal from '~/components/features/modals/video-modal';
import { modalActions } from '~/store/modal';
import {
  showScrollTopHandler,
  stickyHeaderHandler,
  stickyFooterHandler,
} from '~/utils';

import { useProgram, useAuth, useConfig } from 'hooks';
import HeaderMobile from './header/header';
import { Box, Modal } from '@mui/material';
import MyBirthDateForm from '~/components/partials/modals/dateOfBirthModal';
import RenderTriviaForm from '~/components/partials/trivias/renderTriviaForm';

function LayoutMobile({ children, closeQuickview }) {
  const { program } = useProgram();
  const { isLoggedIn, participant } = useAuth();
  const router = useRouter();
  const {
    getConfig,
    data: participantConfig,
    loading: loadingParticipantConfig,
  } = useConfig();
  const [open, setOpen] = useState(true);
  const [openTriviaModal, setOpenTriviaModal] = useState(false);
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

  useEffect(() => {
    if (isLoggedIn) {
      getConfig();
    }
  }, [participant, isLoggedIn, participantConfig]);

  useEffect(() => {
    if (participantConfig?.forms?.length > 0) {
      setOpenTriviaModal(true);
    }
  }, [participant, isLoggedIn, participantConfig]);

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
        {isLoggedIn && <HeaderMobile />}

        {children}

        {isLoggedIn && <Footer />}

        {isLoggedIn ? <StickyFooter /> : <div></div>}
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
      {program && program.id === 26 && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1300,
            }}
          >
            <div
              style={{
                position: 'relative',
                backgroundColor: 'white',
                borderRadius: '10px',
                overflow: 'hidden',
                width: '65%',
                maxWidth: '800px',
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
                  fontSize: '15px',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
                onClick={() => setOpen(false)}
              >
                Acceder
              </button>
              <img
                src='https://storage.googleapis.com/lala4/store/images/36f64d11-008d-498c-b3b3-1eb635890a1f-55c32420-f2c3-41f9-a9e8-9cd2288973fb.png'
                alt='image-modal'
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </Modal>
      )}
      {!loadingParticipantConfig && participantConfig?.forms.length > 0 && (
        <Modal open={openTriviaModal} onClose={() => setOpenTriviaModal(false)}>
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
            <Box
              sx={{
                position: 'relative',
                width: '100%',

                borderRadius: 4,
              }}
            >
              {/* Botón de cerrar */}
              <IconButton
                onClick={() => setOpenTriviaModal(false)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'white',
                }}
              >
                <CloseIcon fontSize='large' />
              </IconButton>

              <RenderTriviaForm
                formId={
                  participantConfig.forms[participantConfig.forms.length - 1].id
                }
                type={
                  participantConfig.forms[participantConfig.forms.length - 1]
                    .type
                }
              />
            </Box>
          </div>
        </Modal>
      )}
      <Quickview />
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
  LayoutMobile
);
