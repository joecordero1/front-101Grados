import { useState } from 'react';

import {
  Form,
  FormWithAnswers,
  PredictedTrivia,
  Prediction,
  Trivia,
} from 'utils/types';
import { useSnackbar } from 'notistack';
import { useApiAuth } from './useApiAuth';

export const useTrivias = () => {
  const { get, put } = useApiAuth();
  const [loadingIsAnswered, setLoadingIsAnswered] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [isAnswered, setAnswered] = useState(false);
  const [trivia, setTrivia] = useState<Trivia | null>(null);
  const [predictedTrivia, setPredictedTrivia] =
    useState<PredictedTrivia | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const getMatchTrivia = async (id: string) => {
    try {
      setLoading(true);
      const response = await get<Trivia>(`/forms/app/match-trivias/${id}`);

      setTrivia(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const getAnsweredForm = async (id: string) => {
    try {
      setLoadingIsAnswered(true);
      const { answered } = await get<{ answered: boolean }>(
        `/forms/app/forms/${id}/answered`
      );
      setAnswered(answered);
      setLoadingIsAnswered(false);
    } catch (error) {
      setLoadingIsAnswered(false);
      console.error(error);
    }
  };

  const getMatchPredictedTrivia = async (id: string) => {
    try {
      setLoading(true);
      const response = await get<PredictedTrivia>(
        `/forms/app/match-trivias/${id}/prediction`
      );
      setPredictedTrivia(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const getForm = async (id: string) => {
    try {
      setLoading(true);
      const response = await get<Form>(`/forms/app/forms/${id}`);
      setForm(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const sendForm = async (form: FormWithAnswers) => {
    try {
      setLoadingForm(true);
      await put<FormWithAnswers>(`/forms/app/forms/${form.id}/respond`, {
        answers: form.questions.map((question) => ({
          questionId: question.id,
          selectedOptions: question.selectedOptions,
        })),
      });
      enqueueSnackbar('Tu respuesta ha sido enviada', {
        variant: 'success',
      });
      setForm(null);
      setPredictedTrivia(null);
      setTrivia(null);
      setLoadingForm(false);
    } catch (error) {
      setLoadingForm(false);
      enqueueSnackbar('Ha ocurrido un error al guardar tu respuesta.', {
        variant: 'error',
      });
      console.error(error);
    }
  };

  const createMatchPrediction = async (prediction: Prediction) => {
    try {
      setLoadingPrediction(true);
      await put<Prediction>(`/forms/app/match-trivias/predict`, {
        ...prediction,
      });
      setLoadingPrediction(false);
      enqueueSnackbar('Tu predicción ha sido enviada', {
        variant: 'success',
      });
      setPredictedTrivia({
        ...predictedTrivia,
        predictedHomeScore: prediction.homeScore,
        predictedAwayScore: prediction.awayScore,
      });
    } catch (error) {
      setLoadingPrediction(false);
      enqueueSnackbar('Ha ocurrido un error al guardar tu respuesta.', {
        variant: 'error',
      });
      console.error(error);
    }
  };

  const updatePrediction = async (prediction: Prediction) => {
    try {
      setLoadingPrediction(true);
      await put<Prediction>(`/forms/app/match-trivias/prediction/update`, {
        triviaId: prediction.triviaId,
        homeScore: prediction.homeScore,
        awayScore: prediction.awayScore,
      });
      setLoadingPrediction(false);
      enqueueSnackbar('Tu predicción ha sido actualizada', {
        variant: 'success',
      });
      setPredictedTrivia({
        ...predictedTrivia,
        predictedHomeScore: prediction.homeScore,
        predictedAwayScore: prediction.awayScore,
      });
    } catch (error) {
      setLoadingPrediction(false);
      enqueueSnackbar('Ha ocurrido un error al guardar tu respuesta.', {
        variant: 'error',
      });
      console.error(error);
    }
  };

  return {
    getMatchTrivia,
    getForm,
    form,
    createMatchPrediction,
    getMatchPredictedTrivia,
    updatePrediction,
    sendForm,
    loadingIsAnswered,
    loading,
    loadingForm,
    loadingPrediction,
    trivia,
    predictedTrivia,
    getAnsweredForm,
    isAnswered,
  };
};
