'use client';

import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Container,
  Grid,
  TextField,
} from '@mui/material';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useTrivias } from 'hooks/useTrivias';
import { useSearchParams } from 'next/navigation';
import { Formik } from 'formik';

interface RenderTriviaFormProps {
  formId?: string;
  type?: string;
}

const RenderTriviaForm = (props: RenderTriviaFormProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const params = useSearchParams();

  const paramFormId = params.get('formId');
  const paramRawType = params.get('type');
  const finalFormId = props.formId || paramFormId || '';
  const finalType =
    props.type ||
    (paramRawType === 'FORM' || paramRawType === 'MATCH_TRIVIA'
      ? paramRawType
      : null);

  const {
    getForm,
    getMatchTrivia,
    getMatchPredictedTrivia,
    createMatchPrediction,
    updatePrediction,
    sendForm,
    form,
    trivia,
    predictedTrivia,
    loading,
    loadingPrediction,
  } = useTrivias();

  const predictionSchema = Yup.object().shape({
    homeScore: Yup.number()
      .required('Requerido')
      .min(0, 'Debe ser mayor o igual a 0'),
    awayScore: Yup.number()
      .required('Requerido')
      .min(0, 'Debe ser mayor o igual a 0'),
  });

  useEffect(() => {
    if (!finalFormId || !finalType) return;
    if (finalType === 'FORM') getForm(finalFormId);
    if (finalType === 'MATCH_TRIVIA') {
      getMatchTrivia(finalFormId);
      getMatchPredictedTrivia(finalFormId);
    }
  }, [finalFormId, finalType]);

  if (!finalFormId || !finalType) return null;
  if (
    loading ||
    (finalType === 'FORM' && !form) ||
    (finalType === 'MATCH_TRIVIA' && !trivia)
  ) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='50vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth='xs' sx={{ py: 6 }}>
      {finalType === 'MATCH_TRIVIA' && trivia && (
        <Box
          sx={{
            backgroundImage: `url(${trivia.style?.background?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 4,
            overflow: 'hidden',
            p: 2,
          }}
        >
          {/* Capa tipo blur de fondo */}
          <Box
            sx={{
              backdropFilter: 'blur(20px)',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 4,
              px: 2,
              py: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Imagen principal de los equipos */}
            <Box
              component='img'
              src={trivia.style?.background?.image}
              alt='main'
              sx={{
                width: '100%',
                borderRadius: 3,
                mb: 2,
              }}
            />

            <Typography
              variant='subtitle1'
              fontWeight='bold'
              color='white'
              mb={3}
              textAlign='center'
              sx={{
                textShadow: '0px 0px 4px rgba(0,0,0,0.5)',
                fontSize: 17,
              }}
            >
              Ingresa tu predicción
            </Typography>

            <Formik
              initialValues={{
                homeScore:
                  predictedTrivia?.predictedHomeScore?.toString() || '',
                awayScore:
                  predictedTrivia?.predictedAwayScore?.toString() || '',
              }}
              validationSchema={predictionSchema}
              onSubmit={(values) => {
                const payload = {
                  triviaId: trivia.id,
                  homeScore: parseInt(values.homeScore),
                  awayScore: parseInt(values.awayScore),
                };
                if (predictedTrivia) {
                  updatePrediction(payload);
                } else {
                  createMatchPrediction(payload);
                }
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    mb={3}
                  >
                    {/* HOME TEAM */}
                    <Box
                      sx={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.3)',
                        borderRadius: 3,
                        p: 2,
                        textAlign: 'center',
                        mx: 1,
                      }}
                    >
                      <img
                        src={trivia.teams?.home.logo}
                        alt='Home Logo'
                        style={{
                          height: 40,
                          marginBottom: 8,
                          objectFit: 'contain',
                        }}
                      />
                      <Typography fontSize={14} fontWeight='bold' color='white'>
                        {trivia.teams?.home.name}
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        name='homeScore'
                        value={values.homeScore}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.homeScore && Boolean(errors.homeScore)}
                        helperText={touched.homeScore && errors.homeScore}
                        size='small'
                        InputProps={{
                          sx: {
                            backgroundColor: 'white',
                            borderRadius: 2,
                            mt: 1,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 14,
                          },
                        }}
                      />
                    </Box>

                    {/* VS */}
                    <Typography
                      variant='h5'
                      color='white'
                      fontWeight='bold'
                      sx={{
                        px: 1,
                        textShadow: '0px 0px 4px rgba(0,0,0,0.5)',
                      }}
                    >
                      VS
                    </Typography>

                    {/* AWAY TEAM */}
                    <Box
                      sx={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.3)',
                        borderRadius: 3,
                        p: 2,
                        textAlign: 'center',
                        mx: 1,
                      }}
                    >
                      <img
                        src={trivia.teams?.away.logo}
                        alt='Away Logo'
                        style={{
                          height: 40,
                          marginBottom: 8,
                          objectFit: 'contain',
                        }}
                      />
                      <Typography fontSize={14} fontWeight='bold' color='white'>
                        {trivia.teams?.away.name}
                      </Typography>
                      <TextField
                        fullWidth
                        type='number'
                        name='awayScore'
                        value={values.awayScore}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.awayScore && Boolean(errors.awayScore)}
                        helperText={touched.awayScore && errors.awayScore}
                        size='small'
                        InputProps={{
                          sx: {
                            backgroundColor: 'white',
                            borderRadius: 2,
                            mt: 1,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 15,
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    disabled={loadingPrediction}
                    fullWidth
                    sx={{
                      backgroundColor: '#333',
                      borderRadius: 4,
                      py: 1.5,
                      fontWeight: 'bold',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#111',
                      },
                      fontSize: 12,
                    }}
                  >
                    {loadingPrediction
                      ? 'Enviando...'
                      : predictedTrivia
                      ? 'Actualizar predicción'
                      : 'Enviar predicción'}
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      )}
      {finalType === 'FORM' && form && (
        <Formik
          initialValues={{
            selectedOptions: form.questions.reduce((acc, q) => {
              acc[q.id] = [];
              return acc;
            }, {} as Record<string, string[]>),
          }}
          onSubmit={(values) => {
            const payload = {
              answers: form.questions.map((q) => ({
                id: q.id,
                selectedOptions: values.selectedOptions[q.id],
              })),
            };
            sendForm({ id: form.id, questions: payload.answers });
          }}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <Box
              sx={{
                backgroundImage: `url(${form.questions[currentQuestionIndex].style.background?.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 4,
                p: 3,
                backdropFilter: 'blur(30px)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
            >
              <Box
                sx={{
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 4,
                  px: 2,
                  py: 3,
                }}
              >
                {/* Dots de navegación */}
                <Box mb={2} display='flex' justifyContent='center' gap={1}>
                  {form.questions.map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor:
                          i === currentQuestionIndex
                            ? 'white'
                            : 'rgba(255,255,255,0.4)',
                      }}
                    />
                  ))}
                </Box>

                {/* Imagen */}
                <Box mb={3}>
                  <img
                    src={
                      form.questions[currentQuestionIndex].style.background
                        ?.image || ''
                    }
                    alt='Question visual'
                    style={{
                      width: '100%',
                      borderRadius: 16,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                    }}
                  />
                </Box>

                {/* Opciones */}
                {form.questions[currentQuestionIndex].options.map((option) => {
                  const selected = values.selectedOptions[
                    form.questions[currentQuestionIndex].id
                  ]?.includes(option.id);
                  return (
                    <Box
                      key={option.id}
                      onClick={() =>
                        setFieldValue(
                          `selectedOptions.${form.questions[currentQuestionIndex].id}`,
                          [option.id]
                        )
                      }
                      sx={{
                        cursor: 'pointer',
                        px: 3,
                        py: 1.5,
                        my: 1,
                        borderRadius: 10,
                        backgroundColor: selected
                          ? '#333'
                          : 'rgba(255, 255, 255, 0.94)',
                        color: selected ? 'white' : 'black',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontSize: 16,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: selected
                            ? '#222'
                            : 'rgba(255, 255, 255, 1)',
                        },
                      }}
                    >
                      {option.name}
                    </Box>
                  );
                })}

                {/* Botón continuar */}
                <Button
                  fullWidth
                  variant='contained'
                  sx={{
                    mt: 3,
                    borderRadius: 4,
                    backgroundColor: '#222',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 14,
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: '#000',
                    },
                  }}
                  onClick={() => {
                    const currentAnswers =
                      values.selectedOptions[
                        form.questions[currentQuestionIndex].id
                      ];
                    if (!currentAnswers || currentAnswers.length === 0) return;

                    if (currentQuestionIndex < form.questions.length - 1) {
                      setCurrentQuestionIndex((prev) => prev + 1);
                    } else {
                      handleSubmit();
                    }
                  }}
                  disabled={
                    !values.selectedOptions[
                      form.questions[currentQuestionIndex].id
                    ] ||
                    values.selectedOptions[
                      form.questions[currentQuestionIndex].id
                    ].length === 0
                  }
                >
                  {currentQuestionIndex === form.questions.length - 1
                    ? 'Guardar mi respuesta'
                    : 'Continuar'}
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      )}
    </Container>
  );
};

export default RenderTriviaForm;
