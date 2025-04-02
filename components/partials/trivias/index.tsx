import { Box, IconButton, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RenderTriviaForm from './renderTriviaForm';
import { useAuth, useConfig, useProgram, useTrivias } from '~/hooks';
import CloseIcon from '@mui/icons-material/Close';
import { withAuth } from '~/components/AuthGuard';

const TriviaModal = () => {
  const { participant, isLoggedIn } = useAuth();
  const { program } = useProgram();
  const [openTriviaModal, setOpenTriviaModal] = useState(false);
  const {
    getConfig,
    data: participantConfig,
    loading: loadingParticipantConfig,
  } = useConfig();
  const {
    getMatchPredictedTrivia,
    predictedTrivia,
    getAnsweredForm,
    isAnswered,
  } = useTrivias();

  useEffect(() => {
    if (isLoggedIn && participant) {
      getConfig();
    }
  }, [isLoggedIn, participant]);

  // Cargar respuestas previas
  useEffect(() => {
    if (participantConfig?.forms?.length > 0) {
      const lastForm = participantConfig.forms.at(-1);
      if (lastForm?.type === 'MATCH_TRIVIA') {
        getMatchPredictedTrivia(lastForm.id);
      } else if (lastForm?.type === 'FORM') {
        getAnsweredForm(lastForm.id);
      }
    }
  }, [participantConfig]);

  // Abrir el modal solo cuando ya se tiene info actualizada
  useEffect(() => {
    const lastForm = participantConfig?.forms?.at(-1);
    if (!lastForm || !isLoggedIn || !participant) return;

    const shouldOpen =
      (lastForm.type === 'MATCH_TRIVIA' && !predictedTrivia) ||
      (lastForm.type === 'FORM' && !isAnswered);

    setOpenTriviaModal(shouldOpen);
  }, [isLoggedIn, participant, participantConfig, predictedTrivia, isAnswered]);

  return (
    (!loadingParticipantConfig &&
      participantConfig?.forms.length > 0 &&
      program.id !== 28) ||
    (program.id !== 39 && (
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
              maxWidth: 400,
              borderRadius: 4,
              boxShadow: 10,
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
                participantConfig?.forms[participantConfig.forms.length - 1].id
              }
              type={
                participantConfig?.forms[participantConfig.forms.length - 1]
                  .type
              }
            />
          </Box>
        </div>
      </Modal>
    ))
  );
};

export default withAuth(TriviaModal);
